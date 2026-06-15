import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { INDEXABLE_PATHS } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return INDEXABLE_PATHS.map((path) => ({
    url: path === '/' ? BRAND.website : `${BRAND.website}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/solutions') || path.startsWith('/industries') ? 0.7 : 0.8,
  }));
}
