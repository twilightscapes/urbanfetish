import { getCollection } from 'astro:content';

export async function getMenuLinks() {
  try {
    const menuItems = await getCollection('menuItems');
    return menuItems
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map(item => ({
        title: item.data.title || '',
        path: item.data.path || ''
      }));
  } catch (error) {
    console.warn('Error loading menu items:', error);
    return [];
  }
}