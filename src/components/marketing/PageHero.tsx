import Link from 'next/link';
import type { ReactNode } from 'react';
import { Action, Container } from '../site/Canvas';
import { AsciiField } from '../site/AsciiField';

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: ReactNode;
  primaryCta?: { label: string; href: string } | null;
  secondaryCta?: { label: string; href: string } | null;
  /** Optional figure shown beside the copy on wide screens. */
  aside?: ReactNode;
  note?: ReactNode;
}

export function PageHero({
  badge,
  title,
  subtitle,
  primaryCta = { label: 'Try Free', href: '/register' },
  secondaryCta = { label: 'Contact Sales', href: '/contact' },
  aside,
  note,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-0 md:px-12">
      {!aside ? (
        <div className="absolute inset-0 opacity-25 sm:opacity-70" aria-hidden="true">
          <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
        </div>
      ) : null}
      <Container className="relative">
        <div className={aside ? 'grid grid-cols-[minmax(0,1fr)] items-center gap-12 px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-40 lg:grid-cols-12' : 'px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-44'}>
          <div className={aside ? 'lg:col-span-6' : 'max-w-2xl'}>
            <p className="mb-6 text-sm text-tertiary">
              <Link href="/" className="hover:text-foreground">Credo</Link>
              <span className="mx-2 text-border-hover">/</span>
              <span className="text-muted">{badge}</span>
            </p>
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">{title}</h1>
            <div className="mt-6 max-w-xl space-y-4 text-[1.0625rem] leading-[1.7] text-muted">
              {typeof subtitle === 'string' ? <p>{subtitle}</p> : subtitle}
            </div>
            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta ? <Action href={primaryCta.href}>{primaryCta.label}</Action> : null}
                {secondaryCta ? <Action href={secondaryCta.href} variant="secondary">{secondaryCta.label}</Action> : null}
              </div>
            ) : null}
            {note ? <div className="mt-5 text-sm text-tertiary">{note}</div> : null}
          </div>
          {aside ? <div className="lg:col-span-5 lg:col-start-8">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
