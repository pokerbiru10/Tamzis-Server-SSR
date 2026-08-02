const https = require('https');
const http = require('http');

/**
 * Helper: HTTP GET dengan Promise + redirect support
 */
function httpGet(url, headers = {}, maxRedirects = 3) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
        return httpGet(res.headers.location, headers, maxRedirects - 1).then(resolve).catch(reject);
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          contentType: res.headers['content-type'] || 'image/jpeg',
          buffer: () => Promise.resolve(Buffer.concat(chunks)),
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Netlify Function: imgproxy
 * Proxy gambar Instagram CDN agar tidak terblokir hotlink protection.
 * URL: /.netlify/functions/imgproxy?url=<encoded-instagram-cdn-url>
 */
exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const rawUrl = event.queryStringParameters && event.queryStringParameters.url;

  if (!rawUrl) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing url parameter' }),
    };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(decodeURIComponent(rawUrl));
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid URL' }),
    };
  }

  // Hanya izinkan domain CDN Instagram/Facebook
  const allowedHosts = ['instagram.com', 'cdninstagram.com', 'fbcdn.net'];
  const isAllowed = allowedHosts.some(
    (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith('.' + host)
  );

  if (!isAllowed) {
    return {
      statusCode: 403,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Domain not allowed: ' + parsedUrl.hostname }),
    };
  }

  try {
    const response = await httpGet(parsedUrl.toString(), {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: 'https://www.instagram.com/',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders,
        body: JSON.stringify({ error: `Upstream error: ${response.status}` }),
      };
    }

    const buffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': response.contentType,
        'Cache-Control': 'public, max-age=86400',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('[imgproxy] error:', err.message);
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to fetch image: ' + err.message }),
    };
  }
};
