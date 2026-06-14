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
    <section className="py-14 sm:py-16 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mt-3 text-slate-300">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
          >
            {primaryLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
