import { BRAND } from '@/lib/brand';

interface LogoProps {
  /** Rendered lockup width in px. */
  size?: number;
  className?: string;
  showText?: boolean;
  tone?: 'ink' | 'white';
}

// Hallmark + wordmark lockup, viewBox 328.86 x 79.92.
const RATIO = 79.92 / 328.86;

export function Logo({ size = 120, className = '', tone = 'ink' }: LogoProps) {
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

/** The hallmark on its own, for square spaces. */
export function LogoIcon({ size = 32, className = '', tone = 'ink' }: { size?: number; className?: string; tone?: 'ink' | 'white' }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={tone === 'white' ? '/brand/credo-mark-white.svg' : '/brand/credo-mark.svg'}
      alt="Credo"
      width={size}
      height={size}
      className={className}
    />
  );
}
