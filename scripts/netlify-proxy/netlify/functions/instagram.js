exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const response = await fetch('https://rsshub.app/instagram/user/tamzisbinautama/json');
    if (!response.ok) {
      throw new Error(`Failed to fetch from RSSHub: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the RSSHub JSON payload to match the expected HighlightFeedItem structure:
    const items = (data.items || []).slice(0, 12).map(item => {
      const caption = item.title || item.summary || '';
      
      // Parse RSSHub media attachments or fallback to custom parsing
      let image = '';
      if (item.image) {
        image = item.image;
      } else if (item.banner) {
        image = item.banner;
      } else if (item.attachments && item.attachments.length > 0) {
        image = item.attachments[0].url;
      } else {
        // Try to extract image from content_html
        const content = item.content_html || '';
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          image = imgMatch[1];
        }
      }

      const permalink = item.url || '#';
      const timestamp = item.date_published || '';
      const isReel = permalink.includes('/reel/') || permalink.includes('/reels/');

      return {
        id: item.id || permalink,
        caption: caption,
        excerpt: caption.substring(0, 120),
        media_type: isReel ? 'REELS' : 'IMAGE',
        image: image,
        permalink: permalink,
        timestamp: timestamp,
      };
    });

    return {
      statusCode: 200,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800' // cache for 30 minutes on Netlify CDN
      },
      body: JSON.stringify(items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message || 'Gagal memuat feed Instagram.' }),
    };
  }
};
