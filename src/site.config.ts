import type { SiteConfig } from "@/types";
import type { CollectionEntry } from 'astro:content';
import { getEntry } from 'astro:content';

// Create an async function to get the config
export async function getSiteConfig(): Promise<SiteConfig> {
  const pwaSettings = await getEntry('pwaSettings', 'index');
  const siteSettings = await getEntry('siteSettings', 'main');
  
  if (!pwaSettings || !siteSettings) {
    throw new Error('Required content collections are missing');
  }

  // Get dynamic site URL based on environment
  const getSiteUrl = () => {
    if (pwaSettings.data.siteUrl) {
      return pwaSettings.data.siteUrl;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NETLIFY_URL) {
      return process.env.NETLIFY_URL;
    }
    return 'https://yourdomain.com'; // Your actual domain
  };

  return {
    title: pwaSettings.data.title || 'PIRATE',
    description: pwaSettings.data.description || 'Thanks for being a pirate!',
    author: pwaSettings.data.name || 'PIRATE',
    siteUrl: getSiteUrl(),
    themeColor: pwaSettings.data.themeColor || '#000000',
    backgroundColor: pwaSettings.data.backgroundColor || '#000000',
    logoImage: siteSettings.data.logoImage || '/images/logo/logoImage.webp',
    showRobots: pwaSettings.data.showRobots || false,
    date: {
      locale: "en",
      options: {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    },
    lang: "en",
    ogLocale: "en",
    sortPostsByUpdatedDate: false,
  };
}

// Export a synchronous config for immediate use (with fallbacks)
export const siteConfig = {
  title: 'Your Site Title',
  description: 'Your site description goes here',
  author: 'User Name',
  siteUrl: 'https://yourdomain.com',
  themeColor: '#000000',
  backgroundColor: '#000000',
  logoImage: '/images/logo/logoImage.svg',
  showRobots: false,
  themeMode: 'user',
  date: {
    locale: "en",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  lang: "en",
  ogLocale: "en",
  sortPostsByUpdatedDate: false,
} as const;


export type Post = CollectionEntry<'post'>;
export type Page = CollectionEntry<'pages'>;
