import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import AstroPWA from '@vite-pwa/astro';
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';
import netlify from "@astrojs/netlify";
import vercel from '@astrojs/vercel/serverless';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from './keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

const isVercel = !!process.env.VERCEL;
const adapter = isVercel ? vercel() : netlify();
const output = 'static'; // Use server mode for both platforms to enable dynamic OG images

const pwaSettings = await reader.singletons.pwaSettings.read();

// Get dynamic site URL based on environment
const getSiteUrl = () => {
  // First priority: Use siteUrl from Keystatic PWA settings
  if (pwaSettings?.siteUrl) {
    console.log('Using siteUrl from PWA settings:', pwaSettings.siteUrl);
    return pwaSettings.siteUrl;
  }
  // Fallback to environment variables
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NETLIFY_URL) {
    return process.env.NETLIFY_URL;
  }
  // Final fallback to actual domain
  return 'no site configured';
};

const siteUrl = getSiteUrl();

// Convert RGBA colors to hex format for PWA manifest
const rgbaToHex = (rgba: string | undefined): string => {
  if (!rgba) return '#000000';
  
  // If already hex, return as-is
  if (rgba.startsWith('#')) return rgba;
  
  // Parse rgba(r, g, b, a) format
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
  if (match) {
    const [, r, g, b] = match;
    return `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
  }
  
  return '#000000'; // fallback
};

// Map Keystatic pwaSettings to pwaConfig with proper fallbacks
const pwaConfig = {
  startUrl: pwaSettings?.startUrl || '/',
  name: pwaSettings?.name || 'Video Privacy',
  shortName: pwaSettings?.shortName || 'Video Privacy',
  description: pwaSettings?.description || 'Video Privacy is a free tool to remove profiling and tracking.',
  themeColor: rgbaToHex(pwaSettings?.themeColor),
  backgroundColor: rgbaToHex(pwaSettings?.backgroundColor),
  display: pwaSettings?.display || 'standalone',
  icon192: pwaSettings?.icon192 || '/images/pwa/icon192.png',
  icon512: pwaSettings?.icon512 || '/images/pwa/icon512.png',
  siteUrl: siteUrl,
  screenshot: pwaSettings?.screenshot || '/images/pwa/screenshot.png',
};

// Validate PNG format for PWA icons
if (pwaSettings?.icon192 && !pwaSettings.icon192.endsWith('.png')) {
  console.warn('⚠️  WARNING: PWA 192x192 icon should be PNG format for best compatibility. Current:', pwaSettings.icon192);
}
if (pwaSettings?.icon512 && !pwaSettings.icon512.endsWith('.png')) {
  console.warn('⚠️  WARNING: PWA 512x512 icon should be PNG format for best compatibility. Current:', pwaSettings.icon512);
}

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [react(), icon(), tailwind({
    applyBaseStyles: false
  }), sitemap(), keystatic(),
  AstroPWA({
    registerType: 'autoUpdate',
    includeAssets: ['robots.txt', 'manifest.webmanifest'],
    manifest: {
      id: pwaSettings?.siteUrl || '/',
      name: pwaConfig.name || 'PIRATE',
      short_name: pwaConfig.shortName || 'PIRATE',
      description: pwaConfig.description || '',
      theme_color: pwaConfig.themeColor || '#ffffff',
      start_url: pwaConfig.startUrl || '/',
      background_color: pwaConfig.backgroundColor || '#ffffff',
      display: (pwaConfig.display as 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser') || 'standalone',
      icons: [
        {
          src: pwaConfig.icon192 ?? '/images/pwa/icon192.webp',
          sizes: '192x192',
          type: 'image/webp'
        },
        {
          src: '/images/pwa/icon192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: pwaConfig.icon512 ?? '/images/pwa/icon512.webp',
          sizes: '512x512',
          type: 'image/webp'
        },
        {
          src: '/images/pwa/icon512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/images/pwa/icon512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      screenshots: pwaConfig.screenshot ? [
        {
          src: pwaConfig.screenshot,
          sizes: '320x640',
          type: 'image/png'
        }
      ] : [],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      globIgnores: [
        '**/keystatic-page.*', // Exclude large Keystatic bundle from cache
      ],
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB limit
    }
  }),  
  markdoc()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank"
    }]],
    remarkPlugins: [],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""]
      }
    },
    shikiConfig: {
      theme: 'dracula',
    },
  },
  output: output,
  prefetch: true,
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  site: pwaConfig.siteUrl ?? 'https://videoprivacy.org',
  redirects: {
    '/admin': '/keystatic'
  },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
    define: {
      'import.meta.env.VITE_KEYSTATIC_PROJECT': JSON.stringify(process.env.VITE_KEYSTATIC_PROJECT || 'placeholder/placeholder'),
    },
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  adapter: adapter,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
});

function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(code: string, id: string) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}