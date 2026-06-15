import type { Metadata } from 'next';
import { BRAND } from './brand';
import { INDUSTRIES_LIST } from './industries';
import { JOBS } from './jobs';
import { SOLUTIONS_LIST } from './solutions';

/** Marketing pages that should be indexed. */
export const INDEXABLE_PATHS = [
  '/',
  '/products',
  '/screening',
  '/credo-onboarding',
  '/credo-id-verification',
  '/credit-report',
  '/credo-trusted-signatures',
  '/fintech-kyc-verification',
  '/staffing-identity-check',
  '/docs',
  '/about',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
  ...SOLUTIONS_LIST.map((s) => `/solutions/${s.slug}`),
  ...INDUSTRIES_LIST.map((i) => `/industries/${i.slug}`),
  ...JOBS.map((j) => `/careers/${j.slug}`),
] as const;

/** App/auth pages — noindex in robots + page metadata. */
export const NOINDEX_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/dashboard',
] as const;

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BRAND.website}${normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${BRAND.name}`,
      description,
      url,
      siteName: BRAND.name,
      type: 'website',
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
  };
}

export const NOINDEX_METADATA = pageMetadata({
  title: 'Account',
  description: 'Credo Screening account access.',
  path: '/login',
  noindex: true,
});
