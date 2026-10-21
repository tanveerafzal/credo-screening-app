import { BRAND } from '@/lib/brand';

interface LogoProps {
  /** Rendered wordmark width in px. */
  size?: number;
  className?: string;
  showText?: boolean;
  tone?: 'ink' | 'white';
}

// Outfit wordmark, viewBox 264.91 x 73.6.
const RATIO = 73.6 / 264.91;

export function Logo({ size = 96, className = '', tone = 'ink' }: LogoProps) {
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

/** The C mark on its own, for square spaces. */
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
