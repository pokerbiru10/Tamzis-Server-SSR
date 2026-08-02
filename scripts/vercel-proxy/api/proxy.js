export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hmacSecret = '5!mul@SIp3mbiAy@an';
  const apiUrl = 'http://103.52.147.11:10505';

  const targetPath = req.url.replace('/api/proxy', '') || '/';
  const queryString = new URL(req.url, 'http://localhost').search || '';
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const message = `GET:${targetPath}:${queryString.slice(1)}:${timestamp}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(hmacSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  try {
    const apiRes = await fetch(`${apiUrl}${targetPath}${queryString}`, {
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
    });

    const body = await apiRes.text();
    res.setHeader('Content-Type', 'application/json');

    return res.status(apiRes.status).send(body);
  } catch (err) {
    return res.status(502).json({
      status: false,
      status_code: 502,
      message: 'Gagal menghubungi server simulasi.',
    });
  }
}
