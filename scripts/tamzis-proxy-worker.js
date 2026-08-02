export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const targetPath = url.pathname;
    const queryString = url.searchParams.toString();

    const hmacSecret = env.HMAC_SECRET || '5!mul@SIp3mbiAy@an';
    const apiUrl = env.API_URL || 'http://103.52.147.11:10505';

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const message = `GET:${targetPath}:${queryString}:${timestamp}`;
    const signature = await hmacSha256(message, hmacSecret);

    const apiResponse = await fetch(`${apiUrl}${targetPath}${url.search}`, {
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
    });

    const body = await apiResponse.text();

    return new Response(body, {
      status: apiResponse.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  },
};

async function hmacSha256(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
