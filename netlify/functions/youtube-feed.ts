import type { Handler } from '@netlify/functions';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishDate: string;
  description: string;
  channelTitle?: string;
  channelId?: string;
  type?: 'video' | 'post';
  url?: string;
  tags?: string[];
}

// Simple fallback for testing
const specialFeeds: Record<string, string[]> = {
  fallback: [
    "UCBJycsmduvYEL83R_U4JriQ", // Marques Brownlee
    "UC6nSFpj9HTCZ5t-N3Rm3-HA"  // Vsauce
  ]
};

// Function to read all YouTube collection files from the content directory
async function readYoutubeCollectionsFiles(): Promise<Record<string, string[]>> {
  const collections: Record<string, string[]> = {};
  
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    // In Netlify functions, we need to resolve from the current working directory
    const collectionsDir = path.join(process.cwd(), 'src', 'content');
    
    // console.log(`Looking for collections in: ${collectionsDir}`);
    // console.log(`Current working directory: ${process.cwd()}`);
    
    // Check if directory exists
    if (!fs.existsSync(collectionsDir)) {
      // console.log('Collections directory does not exist');
      // Try alternative path
      const altPath = path.join(process.cwd(), '..', '..', 'src', 'content');
      // console.log(`Trying alternative path: ${altPath}`);
      if (fs.existsSync(altPath)) {
        return await readFromDirectory(altPath, fs, path);
      }
      return collections;
    }
    
    return await readFromDirectory(collectionsDir, fs, path);
    
  } catch (error) {
    console.error('Error reading collections directory:', error);
  }
  
  // console.log(`Total collections loaded:`, Object.keys(collections));
  return collections;
}

async function readFromDirectory(collectionsDir: string, fs: any, path: any): Promise<Record<string, string[]>> {
  const collections: Record<string, string[]> = {};
  
  // Read all .yaml files in the collections directory
  const files = fs.readdirSync(collectionsDir).filter((file: string) => file.endsWith('.yaml'));
  // console.log(`Found ${files.length} collection files:`, files);
  
  for (const file of files) {
    try {
      const filePath = path.join(collectionsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      // console.log(`Reading collection file: ${file}`);
      // console.log(`Content length: ${content.length}`);
      
      // Parse YAML manually for channel IDs
      const lines = content.split('\n');
      const channelIds: string[] = [];
      
      let inChannelsSection = false;
      for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.startsWith('channels:')) {
          inChannelsSection = true;
          continue;
        }
        
        if (inChannelsSection) {
          // Stop if we hit another top-level field
          if (trimmed && !trimmed.startsWith('-') && !trimmed.startsWith(' ') && trimmed.includes(':') && !trimmed.includes('channelId:') && !trimmed.includes('channelName:')) {
            break;
          }
          
          // Extract channel ID from channelId property
          if (trimmed.includes('channelId:')) {
            const match = trimmed.match(/channelId:\s*([A-Za-z0-9_-]+)/);
            if (match && match[1]) {
              channelIds.push(match[1]);
            }
          }
        }
      }
      
      // Use filename without extension as collection name
      const collectionName = path.basename(file, '.yaml');
      collections[collectionName] = channelIds;
      // console.log(`Loaded collection "${collectionName}" with ${channelIds.length} channels`);
      
    } catch (error) {
      console.error(`Error reading collection file ${file}:`, error);
    }
  }
  
  return collections;
}

async function fetchYouTubeRSS(identifier: string, dynamicCollections: Record<string, string[]> = {}): Promise<YouTubeVideo[]> {
  try {
    // console.log(`=== fetchYouTubeRSS called with identifier: ${identifier} ===`);
    let rssUrl: string;
    
    // Check if it's a dynamic collection from Keystatic first
    if (dynamicCollections[identifier]) {
      const channels = dynamicCollections[identifier];
      // console.log(`Found dynamic collection: ${identifier} with ${channels.length} channels:`, channels);
      const channelPromises = channels.map(channelId => fetchYouTubeRSS(channelId, dynamicCollections));
      const channelResults = await Promise.all(channelPromises);
      return channelResults.flat().slice(0, 50); // Limit to 50 videos total
    }
    
    // Handle individual channel ID
    if (identifier.startsWith('UC') || identifier.startsWith('@')) {
      // Convert @username to channel ID if needed
      if (identifier.startsWith('@')) {
        rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${identifier.substring(1)}`;
      } else {
        rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${identifier}`;
      }
    } else {
      // console.log(`Unknown identifier format: ${identifier}, treating as playlist`);
      // Assume it's a playlist ID
      rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${identifier}`;
    }

    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`404 ERROR - RSS feed not found for identifier: ${identifier}, URL: ${rssUrl}`);
      }
      return [];
    }

    const xmlText = await response.text();
    // console.log(`RSS XML length: ${xmlText.length}`);
    // console.log(`RSS XML preview: ${xmlText.substring(0, 200)}...`);
    
    const videos: YouTubeVideo[] = [];

    // Basic XML parsing for YouTube RSS feeds
    const entryRegex = /<entry[^>]*>(.*?)<\/entry>/gs;
    let match;
    let entryCount = 0;

    while ((match = entryRegex.exec(xmlText)) !== null) {
      entryCount++;
      const entryContent = match[1];
      
      // Extract video details - Updated to match actual YouTube RSS structure
      const titleMatch = entryContent.match(/<title[^>]*>(.*?)<\/title>/) || entryContent.match(/<media:title[^>]*>(.*?)<\/media:title>/);
      const linkMatch = entryContent.match(/<link[^>]*href="([^"]*)"[^>]*\/>/) || entryContent.match(/<link[^>]*href="([^"]*)"[^>]*>/);
      const publishedMatch = entryContent.match(/<published[^>]*>(.*?)<\/published>/);
      const thumbnailMatch = entryContent.match(/<media:thumbnail[^>]*url="([^"]*)"[^>]*\/?>/) || entryContent.match(/<media:thumbnail[^>]*url="([^"]*)"[^>]*>/);
      const descriptionMatch = entryContent.match(/<media:description[^>]*>(.*?)<\/media:description>/);
      const channelMatch = entryContent.match(/<n[^>]*>(.*?)<\/n>/) || entryContent.match(/<name[^>]*>(.*?)<\/name>/);
      
      // console.log(`Entry ${entryCount} - Title: ${titleMatch?.[1]}, Link: ${linkMatch?.[1]}`);
      
      if (titleMatch && linkMatch) {
        // Extract video ID from various YouTube URL formats
        const url = linkMatch[1];
        let videoId = '';
        
        // Handle different YouTube URL formats
        if (url.includes('/watch?v=')) {
          videoId = url.match(/v=([^&]*)/)?.[1] || '';
        } else if (url.includes('/shorts/')) {
          videoId = url.match(/\/shorts\/([^?&]*)/)?.[1] || '';
        } else if (url.includes('youtu.be/')) {
          videoId = url.match(/youtu\.be\/([^?&]*)/)?.[1] || '';
        }
        
        const video = {
          id: videoId,
          title: titleMatch[1] || '',
          thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : (thumbnailMatch?.[1] || ''),
          publishDate: publishedMatch?.[1] || '',
          description: descriptionMatch?.[1] || '',
          channelTitle: channelMatch?.[1] || '',
          channelId: identifier, // Add the channelId to each video
          type: 'video' as const,
          url: linkMatch[1],
          tags: []
        };
        
        // console.log(`Extracted video: ${video.title} (${video.id})`);
        videos.push(video);
      } else {
        console.log(`Entry ${entryCount} - Missing title or link: title=${!!titleMatch}, link=${!!linkMatch}`);
      }
    }

    // console.log(`Found ${entryCount} entries, extracted ${videos.length} videos from ${identifier}`);
    return videos;

  } catch (error) {
    console.error(`Error fetching RSS for ${identifier}:`, error);
    return [];
  }
}

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Handle GET requests for channel handle resolution and single channel feeds
  if (event.httpMethod === 'GET') {
    const { handle, channelId, maxResults = 50 } = event.queryStringParameters || {};
    
    // Handle channel handle resolution
    if (handle) {
      try {
        // console.log(`Resolving channel handle: ${handle}`);
        
        // Try to resolve the handle by fetching a potential RSS feed
        let possibleChannelId = handle;
        
        // Remove @ if present
        if (handle.startsWith('@')) {
          possibleChannelId = handle.substring(1);
        }
        
        // First, try to get the actual channel ID from YouTube's RSS
        // We'll try common patterns for handle-to-ID resolution
        const testUrls = [
          `https://www.youtube.com/feeds/videos.xml?channel_id=${possibleChannelId}`,
          `https://www.youtube.com/@${possibleChannelId}`,
        ];
        
        // Try to fetch the channel page to extract the actual channel ID
        try {
          const channelPageUrl = `https://www.youtube.com/@${possibleChannelId}`;
          const pageResponse = await fetch(channelPageUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          if (pageResponse.ok) {
            const pageText = await pageResponse.text();
            
            // Extract channel ID from the page HTML
            const channelIdMatch = pageText.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/);
            if (channelIdMatch) {
              const actualChannelId = channelIdMatch[1];
              // console.log(`✅ Resolved handle ${handle} to channel ID: ${actualChannelId}`);
              
              return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                  channelId: actualChannelId,
                  handle: handle
                })
              };
            }
          }
        } catch (error) {
          console.error('Error resolving channel handle:', error);
        }
        
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Could not resolve channel handle' })
        };
        
      } catch (error) {
        console.error('Error in handle resolution:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to resolve channel handle' })
        };
      }
    }
    
    // Handle single channel feed requests
    if (channelId) {
      try {
        // console.log(`Fetching videos for channel ID: ${channelId}`);
        const dynamicCollections = await readYoutubeCollectionsFiles();
        const videos = await fetchYouTubeRSS(channelId, dynamicCollections);
        
        // Limit results
        const limitedVideos = videos.slice(0, parseInt(maxResults.toString()) || 50);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            videos: limitedVideos,
            count: limitedVideos.length,
            channelId: channelId
          })
        };
        
      } catch (error) {
        console.error('Error fetching channel videos:', error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Failed to fetch channel videos' })
        };
      }
    }
    
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Either handle or channelId parameter is required for GET requests' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { channelIds, feedName, maxVideos = 250 } = JSON.parse(event.body || '{}');
    
    // Load dynamic collections from Keystatic
    const dynamicCollections = await readYoutubeCollectionsFiles();
    // console.log('Loaded dynamic collections:', Object.keys(dynamicCollections));

    let allVideos: YouTubeVideo[] = [];

    if (feedName) {
      // Handle named feed (either from collections or special feeds)
      // console.log(`Processing named feed: ${feedName}`);
      allVideos = await fetchYouTubeRSS(feedName, dynamicCollections);
    } else if (channelIds && Array.isArray(channelIds)) {
      // Handle direct channel IDs
      // console.log(`Processing channel IDs: ${channelIds}`);
      const allVideosPromises = channelIds.map((id: string) => fetchYouTubeRSS(id, dynamicCollections));
      const allVideosArrays = await Promise.all(allVideosPromises);
      allVideos = allVideosArrays.flat();
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Either feedName or channelIds array is required' })
      };
    }

    // Sort by publish date and limit
    const sortedVideos = allVideos
      .filter(video => video.publishDate)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, maxVideos);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        videos: sortedVideos,
        count: sortedVideos.length,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('YouTube feed function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch YouTube videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
