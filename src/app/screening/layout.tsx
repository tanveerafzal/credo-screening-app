import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Free AML & Sanctions Screening',
  description:
    'Screen names against OFAC, PEP, EU, UN, and UK sanctions lists for free. 1.2M+ entities, results in under 3 seconds. No credit card required.',
  path: '/screening',
  keywords: ['free OFAC screening', 'sanctions check', 'PEP screening', 'AML screening tool'],
});

export default function ScreeningLayout({ children }: { children: React.ReactNode }) {
  return children;
}
