import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export async function getMenuItems() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const menuItems = await reader.collections.menuItems.all();

  return menuItems
    .map(item => ({
      path: item.entry.path || `${item.slug}`,
      title: item.entry.title,
      order: item.entry.order
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}