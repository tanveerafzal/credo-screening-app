import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/register', '/forgot-password', '/reset-password', '/dashboard', '/api/'],
    },
    sitemap: `${BRAND.website}/sitemap.xml`,
    host: BRAND.website,
  };
}
