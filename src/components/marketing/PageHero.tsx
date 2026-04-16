import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function PageHero({
  badge,
  title,
  subtitle,
  primaryCta = { label: 'Try Free', href: '/register' },
  secondaryCta = { label: 'Contact Sales', href: '/contact' },
}: PageHeroProps) {
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-6">
          {badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight max-w-3xl mx-auto">
          {title}
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
          >
            {primaryCta.label} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 transition"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
