const https = require('https');
const http = require('http');

/**
 * Helper: HTTP GET dengan Promise + redirect support
 */
function httpGet(url, headers = {}, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    let reqUrl;
    try {
      reqUrl = new URL(url);
    } catch (e) {
      return reject(new Error('Invalid URL: ' + url));
    }

    const lib = reqUrl.protocol === 'https:' ? https : http;

    const options = {
      hostname: reqUrl.hostname,
      port: reqUrl.port || (reqUrl.protocol === 'https:' ? 443 : 80),
      path: reqUrl.pathname + reqUrl.search,
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Accept: 'application/json, text/html, */*',
        ...headers,
      },
    };

    const req = lib.request(options, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location &&
        maxRedirects > 0
      ) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : reqUrl.origin + res.headers.location;
        return httpGet(redirectUrl, headers, maxRedirects - 1).then(resolve).catch(reject);
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const bodyText = Buffer.concat(chunks).toString('utf8');
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          contentType: res.headers['content-type'] || '',
          buffer: () => Promise.resolve(Buffer.concat(chunks)),
          json: () => {
            try {
              return Promise.resolve(JSON.parse(bodyText));
            } catch (e) {
              return Promise.reject(new Error('Invalid JSON: ' + bodyText.substring(0, 200)));
            }
          },
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timeout for ' + url));
    });

    req.end();
  });
}

/**
 * Coba beberapa RSSHub public instance sebagai fallback
 */
const RSSHUB_INSTANCES = [
  'https://rsshub.rssforever.com',
  'https://rss.shab.fun',
  'https://rsshub.fly.dev',
  'https://hub.slarky.me',
];

async function fetchFromRSSHub(username) {
  for (const instance of RSSHUB_INSTANCES) {
    const url = `${instance}/instagram/user/${username}?format=json`;
    try {
      console.log(`[instagram] trying RSSHub instance: ${instance}`);
      const res = await httpGet(url, {}, 3);
      if (res.ok) {
        const data = await res.json();
        if (data && (Array.isArray(data.items) || Array.isArray(data.data))) {
          console.log(`[instagram] success with ${instance}`);
          return data;
        }
      }
      console.log(`[instagram] ${instance} returned status ${res.status}, skipping`);
    } catch (err) {
      console.log(`[instagram] ${instance} failed: ${err.message}`);
    }
  }
  return null;
}

/**
 * Parse Picuki RSS (HTML scraper web) sebagai alternatif terakhir
 * https://picuki.com/profile/tamzisbinautama
 */
async function fetchFromPicuki(username) {
  try {
    const res = await httpGet(`https://www.picuki.com/profile/${username}`, {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    });
    if (!res.ok) return [];

    const buf = await res.buffer();
    const html = buf.toString('utf8');

    // Extract post data dari HTML Picuki
    const items = [];
    const postRegex =
      /<div class="photo"[^>]*>[\s\S]*?<a href="(https:\/\/www\.picuki\.com\/media\/[^"]+)"[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<\/div>/gi;

    let match;
    let idx = 0;
    while ((match = postRegex.exec(html)) !== null && idx < 12) {
      const permalink = match[1].replace('picuki.com/media', 'instagram.com/p');
      const image = match[2];
      items.push({
        id: `picuki-${idx}`,
        caption: '',
        excerpt: 'Lihat postingan terbaru TAMZIS di Instagram.',
        media_type: 'IMAGE',
        image,
        permalink,
        timestamp: '',
      });
      idx++;
    }

    return items;
  } catch (err) {
    console.log('[instagram] Picuki failed:', err.message);
    return [];
  }
}

/**
 * Fallback terakhir: ambil instagram.json statis dari GitHub raw
 * Path gambar lokal (uploads/images/...) dikonversi ke GitHub raw CDN URL.
 */
async function fetchFromGitHub(baseUrl) {
  const GITHUB_RAW = 'https://raw.githubusercontent.com/pokerbiru10/Tamzis-Server-SSR/main/public';

  try {
    const res = await httpGet(
      `${GITHUB_RAW}/instagram.json`,
      { Accept: 'application/json' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    // Konversi path lokal ke GitHub raw CDN URL (bebas hotlink block!)
    return data.map((item) => {
      let image = item.image || '';

      if (image && !image.startsWith('http')) {
        // Path lokal seperti "uploads/images/instagram-feed/xxx.jpg"
        image = `${GITHUB_RAW}/${image.replace(/^\//, '')}`;
      } else if (image && image.startsWith('http') && image.includes('fbcdn.net')) {
        // Masih URL Instagram CDN lama → proxy lewat imgproxy
        image = `${baseUrl}/.netlify/functions/imgproxy?url=${encodeURIComponent(image)}`;
      }

      return { ...item, image };
    });
  } catch (err) {
    console.log('[instagram] GitHub raw failed:', err.message);
    return [];
  }
}



exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const baseUrl = `https://${event.headers.host}`;
  const username = 'tamzisbinautama';

  try {
    // Coba RSSHub instances
    const data = await fetchFromRSSHub(username);

    if (data) {
      const rawItems = Array.isArray(data.items) ? data.items : [];

      const items = rawItems.slice(0, 12).map((item) => {
        const caption = (item.title || item.summary || '').trim();

        let rawImage = '';
        if (item.image && typeof item.image === 'string') {
          rawImage = item.image;
        } else if (item.banner && typeof item.banner === 'string') {
          rawImage = item.banner;
        } else if (Array.isArray(item.attachments) && item.attachments.length > 0) {
          const imgAtt =
            item.attachments.find((a) => a.mime_type && a.mime_type.startsWith('image/')) ||
            item.attachments[0];
          rawImage = (imgAtt && imgAtt.url) || '';
        }

        if (!rawImage && item.content_html) {
          const m = item.content_html.match(/<img[^>]+src="([^"]+)"/i);
          if (m) rawImage = m[1];
        }

        const permalink = item.url || '#';
        const timestamp = item.date_published || '';
        const isReel = permalink.includes('/reel/') || permalink.includes('/reels/');

        const proxyImage = rawImage
          ? `${baseUrl}/.netlify/functions/imgproxy?url=${encodeURIComponent(rawImage)}`
          : '';

        return {
          id: item.id || permalink,
          caption,
          excerpt: caption.substring(0, 120) || 'Kegiatan terbaru TAMZIS di Instagram.',
          media_type: isReel ? 'REELS' : 'IMAGE',
          image: proxyImage,
          permalink,
          timestamp,
        };
      });

      return {
        statusCode: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=1800',
        },
        body: JSON.stringify(items),
      };
    }

    // Fallback 2: coba Picuki
    const picukiItems = await fetchFromPicuki(username);
    if (picukiItems.length > 0) {
      return {
        statusCode: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=900',
        },
        body: JSON.stringify(picukiItems),
      };
    }

    // Fallback 3: ambil dari GitHub raw (instagram.json statis yang di-commit)
    console.log('[instagram] all live sources failed, using GitHub raw fallback');
    const githubItems = await fetchFromGitHub(baseUrl);

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify(githubItems),
    };
  } catch (err) {
    console.error('[instagram function] fatal error:', err.message);
    // Terakhir: coba GitHub raw meski ada error
    const githubItems = await fetchFromGitHub(baseUrl);
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(githubItems),
    };
  }
};

