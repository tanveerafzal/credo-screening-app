import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTABanner({
  title = 'Ready to start screening?',
  subtitle = 'First month free — up to 10 verifications & 10 screenings. No credit card required.',
  primaryLabel = 'Try Free',
  primaryHref = '/register',
  secondaryLabel = 'Contact Sales',
  secondaryHref = '/contact',
}: CTABannerProps) {
  return (
    <section className="py-16 bg-indigo-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-indigo-200">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 shadow-lg transition"
          >
            {primaryLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-indigo-700 text-white font-semibold rounded-xl border border-indigo-500 hover:bg-indigo-800 transition"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
