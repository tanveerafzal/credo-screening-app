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
    <section className="pt-28 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
          {badge}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight max-w-3xl mx-auto tracking-tight">
          {title}
        </h1>
        <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
          >
            {primaryCta.label} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted transition-all"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
