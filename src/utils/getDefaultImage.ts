import { getEntry } from 'astro:content';

/**
 * Get the default image for the site from Keystatic socialCard singleton,
 * falling back to /socialCard.webp if not configured
 */
export async function getDefaultImage(): Promise<string> {
  try {
    // The socialCard singleton is stored in the photoUpload collection as index.yaml
    const socialCardEntry = await getEntry('photoUpload', 'index');
    if (socialCardEntry?.data?.socialCard) {
      // console.log('Using dynamic socialCard from Keystatic:', socialCardEntry.data.socialCard);
      return socialCardEntry.data.socialCard;
    }
  } catch (error) {
    // Entry doesn't exist yet or error reading, fall back to default
    console.log('Using default socialCard.webp (socialCard singleton not configured yet)');
  }
  
  // Fallback to the original hardcoded image
  return '/socialCard.webp';
}

/**
 * Sync version for client-side use - returns the fallback
 * Client-side should use the meta tag or get it from server-rendered data
 */
export function getDefaultImageSync(): string {
  return '/socialCard.webp';
}
