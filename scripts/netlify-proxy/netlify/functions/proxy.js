exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  const hmacSecret = '5!mul@SIp3mbiAy@an';
  const apiUrl = 'http://103.52.147.11:10505';

  const targetPath = event.path.replace('/.netlify/functions/proxy', '') || '/';
  const rawQuery = event.queryStringParameters ? new URLSearchParams(event.queryStringParameters).toString() : '';
  const queryString = rawQuery ? '?' + rawQuery : '';
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const message = `GET:${targetPath}:${rawQuery}:${timestamp}`;

  const crypto = require('crypto');
  const signature = crypto.createHmac('sha256', hmacSecret).update(message).digest('hex');

  try {
    const apiRes = await fetch(`${apiUrl}${targetPath}${queryString}`, {
      method: 'GET',
      headers: {
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
    });

    const body = await apiRes.text();

    return {
      statusCode: apiRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ status: false, status_code: 502, message: 'Gagal menghubungi server simulasi.' }),
    };
  }
};
