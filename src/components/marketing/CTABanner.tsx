import { FREE_TRIAL } from '@/lib/pricing';
import { Action, Container } from '../site/Canvas';
import { AsciiField } from '../site/AsciiField';

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
  subtitle = FREE_TRIAL.cta,
  primaryLabel = 'Try Free',
  primaryHref = '/register',
  secondaryLabel = 'Contact Sales',
  secondaryHref = '/contact',
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden border-t border-border px-0 md:px-12">
      <div className="absolute inset-0 opacity-30 sm:opacity-80" aria-hidden="true">
        <AsciiField focus={[0.8, 0.55]} fadeLeft={0.38} />
      </div>
      <Container className="relative">
        <div className="max-w-2xl px-6 py-24 md:px-8 md:py-32">
          <h2 className="text-[1.75rem] leading-tight sm:text-[2.5rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href={primaryHref}>{primaryLabel}</Action>
            <Action href={secondaryHref} variant="secondary">{secondaryLabel}</Action>
          </div>
        </div>
      </Container>
    </section>
  );
}
