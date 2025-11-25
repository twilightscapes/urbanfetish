import { getEntry } from 'astro:content';

export async function getPwaSettings() {
  const pwaSettings = await getEntry('pwaSettings', 'index');
  if (!pwaSettings) {
    throw new Error('PWA settings not found');
  }
  return pwaSettings.data;
}
