// API endpoint to get site posts for YouTube feed integration
import type { APIRoute } from 'astro';
import { getAllPosts } from '@/data/post';

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const maxPosts = parseInt(searchParams.get('maxPosts') || '3', 10);
    
    // Get all posts
    const allPosts = await getAllPosts();
    
    // Helper function to extract YouTube thumbnail
    function getYouTubeThumbnail(youtubeUrl: string): string {
      try {
        const videoId = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1];
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      } catch (error) {
        console.warn('Failed to extract YouTube thumbnail:', error);
      }
      return '/favicon.ico'; // Fallback to favicon if no thumbnail available
    }

    // Filter out posts with external URLs (they're meant for iframe display)
    const filteredPosts = allPosts.filter(post => !post.data.externalUrl);
    
    // Convert posts to a format compatible with YouTube videos
    const posts = filteredPosts
      .slice(0, maxPosts)
      .map(post => {
        let thumbnail = post.data.coverImage?.src || '';
        
        // If no cover image, try to extract from YouTube URL
        if (!thumbnail && post.data.youtube?.discriminant && post.data.youtube.value?.url) {
          thumbnail = getYouTubeThumbnail(post.data.youtube.value.url);
        }
        
        // Final fallback
        if (!thumbnail) {
          thumbnail = '/favicon.ico';
        }

        return {
          id: `post-${post.slug}`,
          title: post.data.title,
          thumbnail,
          publishDate: post.data.publishDate.toISOString(),
          description: post.data.description,
          channelTitle: 'Site Posts',
          type: 'post',
          url: `/posts/${post.slug}/`,
          tags: post.data.tags || []
        };
      });

    return new Response(
      JSON.stringify({
        posts,
        count: posts.length,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch posts',
        posts: [],
        count: 0
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

export const prerender = false;
