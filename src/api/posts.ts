// API endpoint to get site posts for YouTube feed integration
import type { APIRoute } from 'astro';
import { getAllPosts } from '@/data/post';

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const maxPosts = parseInt(searchParams.get('maxPosts') || '3', 10);
    
    // Get all posts
    const allPosts = await getAllPosts();
    
    // Convert posts to a format compatible with YouTube videos
    const posts = allPosts
      .slice(0, maxPosts)
      .map(post => ({
        id: `post-${post.slug}`,
        title: post.data.title,
        thumbnail: post.data.coverImage?.src || '/images/default-post-thumbnail.jpg',
        publishDate: post.data.publishDate.toISOString(),
        description: post.data.description,
        channelTitle: 'Site Posts',
        type: 'post',
        url: `/posts/${post.slug}/`,
        tags: post.data.tags || []
      }));

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
