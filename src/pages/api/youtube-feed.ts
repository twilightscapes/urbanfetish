import type { APIRoute } from 'astro';

interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  description?: string;
  dateAdded?: number;
}

export const POST: APIRoute = async ({ request }) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    const body = await request.json();
    const { action, input } = body;

    if (action === 'resolve' && input) {
      
      // Resolve handle to get full channel data
      const channelId = await resolveChannelHandle(input);
      if (channelId) {
        // Get channel info by fetching a video to extract channel details
        const videos = await fetchChannelVideos(channelId, 1);
        if (videos.length > 0) {
          // Extract handle from input
          let handle = input;
          if (input.startsWith('@')) {
            handle = input.substring(1);
          } else if (input.includes('/@')) {
            const match = input.match(/\/@([^\/\?]+)/);
            handle = match ? match[1] : input;
          } else if (input.includes('/channel/')) {
            handle = channelId; // Use channel ID as handle
          }

          return new Response(JSON.stringify({
            channelId,
            handle,
            name: videos[0].channelTitle,
            avatar: `https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj` // Default avatar
          }), {
            status: 200,
            headers
          });
        }
      }
      
      return new Response(JSON.stringify({ error: 'Could not resolve channel' }), {
        status: 404,
        headers
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action or missing input' }), {
      status: 400,
      headers
    });

  } catch (error) {
    console.error('Error in POST API:', error);
    return new Response(JSON.stringify({ 
      error: 'API error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers
    });
  }
};

export const GET: APIRoute = async ({ url }) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  try {
    const channelId = url.searchParams.get('channelId');
    const handle = url.searchParams.get('handle');
    const maxResults = parseInt(url.searchParams.get('maxResults') || '20');

    // Handle channel handle resolution
    if (handle) {
      try {
        
        // Resolve handle to channel ID
        const resolvedChannelId = await resolveChannelHandle(handle);
        if (resolvedChannelId) {
          return new Response(JSON.stringify({ 
            channelId: resolvedChannelId,
            handle: handle
          }), {
            status: 200,
            headers
          });
        } else {
          return new Response(JSON.stringify({ error: 'Could not resolve channel handle' }), {
            status: 404,
            headers
          });
        }
      } catch (error) {
        console.error('Error resolving handle:', error);
        return new Response(JSON.stringify({ error: 'Failed to resolve channel handle' }), {
          status: 500,
          headers
        });
      }
    }

    // Handle channel video fetching
    if (channelId) {
      
      // Fetch from YouTube RSS feed
      const videos = await fetchChannelVideos(channelId, maxResults);
      
      return new Response(JSON.stringify({ 
        videos,
        count: videos.length,
        channelId: channelId
      }), {
        status: 200,
        headers
      });
    }

    return new Response(JSON.stringify({ error: 'Either handle or channelId parameter is required' }), {
      status: 400,
      headers
    });

  } catch (error) {
    console.error('Error in API:', error);
    return new Response(JSON.stringify({ 
      error: 'API error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers
    });
  }
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response('', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
  });
};

async function resolveChannelHandle(handle: string): Promise<string | null> {
  try {
    
    // If it's already a channel ID (UC followed by 22 characters), return it
    if (/^UC[a-zA-Z0-9_-]{22}$/.test(handle)) {
      return handle;
    }
    
    // Normalize the handle by removing spaces for better matching
    let normalizedHandle = handle;
    if (!handle.startsWith('http') && !handle.includes('/')) {
      // For simple text handles, remove spaces and normalize
      normalizedHandle = handle.replace(/\s+/g, '').toLowerCase();
    }
    
    // Let YouTube resolve the URL for us - works with ANY YouTube URL format
    let targetUrl = normalizedHandle;
    
    // If it doesn't look like a full URL, try common YouTube URL patterns
    if (!normalizedHandle.startsWith('http')) {
      if (normalizedHandle.startsWith('@')) {
        targetUrl = `https://www.youtube.com/${normalizedHandle}`;
      } else if (normalizedHandle.includes('/')) {
        targetUrl = `https://www.youtube.com/${normalizedHandle}`;
      } else {
        targetUrl = `https://www.youtube.com/@${normalizedHandle}`;
      }
    }
    
    
    // Follow redirects and let YouTube canonicalize the URL
    const response = await fetch(targetUrl, {
      method: 'GET', // Get full content to extract channel ID
      redirect: 'follow', // Follow all redirects
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch: ${response.status} ${response.statusText}`);
      return null;
    }
    
    // Get the final URL after all redirects
    const finalUrl = response.url;
    
    // Extract channel ID from the final canonical URL first
    const urlChannelIdMatch = finalUrl.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
    if (urlChannelIdMatch) {
      return urlChannelIdMatch[1];
    }
    
    // If URL doesn't contain channel ID, extract from page content
    const html = await response.text();
    
    // Simple patterns to find channel ID in HTML - minimal set that works
    const patterns = [
      /"browseId":"(UC[a-zA-Z0-9_-]{22})"/,
      /"channelId":"(UC[a-zA-Z0-9_-]{22})"/,
      /\/channel\/(UC[a-zA-Z0-9_-]{22})/
    ];
    
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    console.error(`❌ Could not resolve channel ID from: ${handle}`);
    return null;
  } catch (error) {
    console.error(`❌ Error resolving channel URL ${handle}:`, error);
    return null;
  }
}

async function fetchChannelVideos(channelId: string, maxResults: number): Promise<YouTubeVideo[]> {
  try {
    // Use YouTube RSS feed
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    const response = await fetch(rssUrl);
    if (!response.ok) {
      throw new Error(`YouTube RSS request failed: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    const videos = parseYouTubeRSS(xmlText, maxResults);
    
    return videos;

  } catch (error) {
    console.error(`Error fetching channel ${channelId}:`, error);
    throw error;
  }
}

function parseYouTubeRSS(xmlText: string, maxResults: number): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  
  try {
    // Parse XML entries manually (simple approach)
    const entryMatches = xmlText.match(/<entry>(.*?)<\/entry>/gs);
    
    if (!entryMatches) {
      return videos;
    }


    for (let i = 0; i < Math.min(entryMatches.length, maxResults); i++) {
      const entry = entryMatches[i];
      
      const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      // Enhanced channel name extraction with multiple patterns
      const authorMatch = entry.match(/<author[^>]*>.*?<name[^>]*>(.*?)<\/name>/s) || 
                          entry.match(/<name[^>]*>(.*?)<\/name>/) ||
                          entry.match(/<author[^>]*>(.*?)<\/author>/) ||
                          entry.match(/<media:credit[^>]*>(.*?)<\/media:credit>/);
      const descriptionMatch = entry.match(/<media:description>(.*?)<\/media:description>/);
      
      // Try to extract thumbnail URL from media:group or media:thumbnail
      const mediaThumbnailMatch = entry.match(/<media:thumbnail\s+url="([^"]+)"/);
      const mediaGroupMatch = entry.match(/<media:group>(.*?)<\/media:group>/s);
      let thumbnailUrl = '';
      
      if (mediaThumbnailMatch) {
        // Use the thumbnail URL from RSS if available
        thumbnailUrl = mediaThumbnailMatch[1];
      } else if (mediaGroupMatch) {
        // Look for thumbnail within media:group
        const groupThumbnailMatch = mediaGroupMatch[1].match(/<media:thumbnail\s+url="([^"]+)"/);
        if (groupThumbnailMatch) {
          thumbnailUrl = groupThumbnailMatch[1];
        }
      }
      
      // If no RSS thumbnail found, construct URL with smart fallback strategy
      if (!thumbnailUrl && videoIdMatch) {
        const videoId = videoIdMatch[1];
        // Always start with maxresdefault.jpg - the frontend will handle fallbacks
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      } else if (thumbnailUrl) {
        // If we got a thumbnail from RSS, enhance it to maxres if possible
        const videoIdFromUrl = thumbnailUrl.match(/\/vi\/([^\/]+)\//);
        if (videoIdFromUrl) {
          const videoId = videoIdFromUrl[1];
          // Replace any existing quality with maxres
          const enhancedUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          thumbnailUrl = enhancedUrl;
        }
      }
      
      if (videoIdMatch && titleMatch) {
        const videoId = videoIdMatch[1];
        const title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
        
        // Enhanced channel title extraction and cleaning
        let channelTitle = 'Unknown Channel';
        if (authorMatch && authorMatch[1]) {
          channelTitle = authorMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
        } else {
          console.warn(`⚠️ No channel name found for video: ${title}`);
        }
        
        const publishedAt = publishedMatch ? publishedMatch[1] : new Date().toISOString();
        const description = descriptionMatch ? descriptionMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
        
        videos.push({
          videoId,
          title,
          thumbnail: thumbnailUrl,
          channelTitle,
          publishedAt,
          description,
          dateAdded: Date.now()
        });
      }
    }

    return videos;

  } catch (error) {
    console.error('Error parsing RSS XML:', error);
    return videos;
  }
}
