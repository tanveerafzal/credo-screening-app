import { BRAND } from '@/lib/brand';

interface LogoProps {
  /** Rendered wordmark width in px. */
  size?: number;
  className?: string;
  showText?: boolean;
  tone?: 'teal' | 'white';
}

const RATIO = 1331 / 4667;

export function Logo({ size = 92, className = '', tone = 'teal' }: LogoProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={tone === 'white' ? '/brand/credo-wordmark-white.svg' : '/brand/credo-wordmark.svg'}
      alt={`${BRAND.name}: AML & sanctions screening`}
      width={size}
      height={Math.round(size * RATIO)}
      className={`block h-auto ${className}`}
    />
  );
}

export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src="/brand/credo-wordmark.svg" alt="Credo" width={size * 2.6} height={size} className={className} />
  );
}
