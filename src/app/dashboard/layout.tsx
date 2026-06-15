import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Dashboard',
  description: 'Credo Screening partner dashboard.',
  path: '/dashboard',
  noindex: true,
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
