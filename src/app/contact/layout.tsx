import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Sales & Support',
  description:
    'Contact Credo Screening for AML screening demos, API access, enterprise pricing, and compliance questions. Response within one business day.',
  path: '/contact',
  keywords: ['contact Credo Screening', 'AML screening demo', 'sanctions screening sales'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
