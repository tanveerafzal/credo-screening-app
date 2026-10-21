import Link from 'next/link';
import type { ReactNode } from 'react';

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** The ruled canvas: one centred column with 1px side rails. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx('mx-auto w-full max-w-[84rem] border-x border-border', className)}>
      {children}
    </div>
  );
}

/** A full-width band that owns its top rule. */
export function Section({
  id,
  children,
  className,
  innerClassName,
  tone = 'plain',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tone?: 'plain' | 'tint';
}) {
  return (
    <section
      id={id}
      className={cx(
        'scroll-mt-16 border-t border-border px-0 md:px-12',
        tone === 'tint' && 'bg-surface-elevated',
        className,
      )}
    >
      <Container className={cx('py-20 md:py-28', innerClassName)}>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  title,
  body,
  action,
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('mb-12 max-w-2xl px-6 md:mb-16 md:px-8', className)}>
      <h2 className="text-2xl leading-tight sm:text-[2rem]">{title}</h2>
      {body ? <div className="mt-5 max-w-xl text-base leading-[1.75] text-muted">{body}</div> : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}

const ACTION_STYLES = {
  primary:
    'bg-ink text-white hover:bg-[var(--ink-hover)] active:translate-y-px',
  secondary:
    'border border-border-emphasized bg-background text-foreground hover:border-border-hover hover:bg-foreground/[0.03] active:translate-y-px',
  inverse: 'bg-white text-night hover:bg-teal-wash active:translate-y-px',
  'inverse-secondary':
    'border border-white/25 text-white hover:border-white/60 hover:bg-white/[0.06] active:translate-y-px',
} as const;

export function Action({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof ACTION_STYLES;
  size?: 'sm' | 'md';
  className?: string;
  arrow?: boolean;
}) {
  const classes = cx(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out',
    size === 'sm' ? 'h-9 px-4 text-sm' : 'h-11 px-5 text-[0.9375rem]',
    ACTION_STYLES[variant],
    className,
  );
  const content = (
    <>
      {children}
      {arrow ? <ArrowGlyph /> : null}
    </>
  );
  const external = href.startsWith('http') || href.startsWith('mailto:');
  return external ? (
    <a href={href} className={classes}>{content}</a>
  ) : (
    <Link href={href} className={classes}>{content}</Link>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className={cx('shrink-0', className)}>
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className={cx('shrink-0 text-teal-ink', className)}>
      <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
    </svg>
  );
}

/** Zero-padded mono index used for steps and ordered rows. */
export function Index({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cx('font-mono text-xs text-tertiary tabular-nums', className)}>
      {String(n).padStart(2, '0')}
    </span>
  );
}

/** Small mono label for tags such as "Limited time". Not an eyebrow. */
export function Tag({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'teal' }) {
  return (
    <span
      className={cx(
        'inline-flex h-6 items-center rounded-full border px-2.5 font-mono text-[0.6875rem] tracking-normal',
        tone === 'teal' ? 'border-teal/30 bg-teal-wash text-teal-ink' : 'border-border-emphasized text-muted',
      )}
    >
      {children}
    </span>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const classes = cx(
    'inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/70',
    className,
  );
  return href.startsWith('http') || href.startsWith('mailto:') ? (
    <a href={href} className={classes}>{children}</a>
  ) : (
    <Link href={href} className={classes}>{children}</Link>
  );
}
