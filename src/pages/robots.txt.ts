import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const GET: APIRoute = async () => {
  // Get PWA settings for dynamic site URL
  const pwaSettings = await getEntry('pwaSettings', 'index');
  const siteUrl = pwaSettings?.data?.siteUrl || 'https://privacyvideo.org';

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
