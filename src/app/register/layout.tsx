import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Create Account',
  description: 'Create a free Credo Screening account for AML and sanctions screening.',
  path: '/register',
  noindex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
