import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Account Approval',
  description: 'Review a pending Credo Screening account request.',
  path: '/approve-account',
  noindex: true,
});

export default function ApproveAccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
