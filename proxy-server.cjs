const crypto = require('crypto');
const http = require('http');
const https = require('https');

const HMAC_SECRET = '5!mul@SIp3mbiAy@an';
const TAMZIS_HOST = '103.52.147.11';
const TAMZIS_PORT = 10505;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();

    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const targetPath = url.pathname + url.search;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const path = url.pathname;
  const queryString = url.searchParams.toString();
  const message = `GET:${path}:${queryString}:${timestamp}`;
  const signature = crypto.createHmac('sha256', HMAC_SECRET).update(message).digest('hex');

  const options = {
    hostname: TAMZIS_HOST,
    port: TAMZIS_PORT,
    path: targetPath,
    method: 'GET',
    headers: {
      'X-Timestamp': timestamp,
      'X-Signature': signature
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: false, message: err.message }));
  });

  proxyReq.end();
});

server.listen(3456, () => {
  console.log('Proxy server running on http://localhost:3456');
  console.log('Test: http://localhost:3456/api/v1/simulasi/mudharabah?plafond=10000000&jangkaWaktu=4&nisbah=35&polaAngsur=H');
});