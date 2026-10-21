'use client';

import { useId } from 'react';

// 16-unit grid silhouettes with stepped corners, drawn for Credo's products.
const PATHS = {
  id: 'M1 3h14v10H1Z M3 5v5h4V5Z M9 6v1h5V6Z M9 8v1h5V8Z M9 10v1h3v-1Z',
  face: 'M1 1h4v1H2v3H1Z M11 1h4v4h-1V2h-3Z M1 11h1v3h3v1H1Z M14 11h1v4h-4v-1h3Z M5 4h6v1h1v5h-1v1h-1v1H6v-1H5v-1H4V5h1Z M6 6v2h1V6Z M9 6v2h1V6Z M6 9v1h4V9Z',
  search: 'M4 1h5v1h2v2h1v5h-1v2H9v1H4v-1H2V9H1V4h1V2h2Z M4 4v1H3v3h1v1h1v1h3V9h1V8h1V5H9V4H8V3H5v1Z M11 11h2v1h1v1h1v2h-2v-1h-1v-1h-1Z',
  pen: 'M12 1h2v1h1v2h-1v1h-1v1h-1v1h-1v1h-1v1H9v1H8v1H7v1H6v1H2v-4h1V9h1V8h1V7h1V6h1V5h1V4h1V3h1V2h1Z M3 14h12v1H3Z',
  shield: 'M7 1h2v1h2v1h3v6h-1v2h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4v-1H3V9H2V3h3V2h2Z M10 5v1H9v1H8v1H7V7H6v1H5v1h1v1h1v1h1v-1h1V9h1V8h1V7h1V5Z',
  lock: 'M5 1h6v1h1v4h1v9H3V6h1V2h1Z M6 3v3h4V3Z M7 9v3h2V9Z',
  code: 'M5 3h2v1H6v1H5v2H4v2h1v2h1v1h1v1H5v-1H4v-1H3V9H2V7h1V5h1V4h1Z M9 3h2v1h1v1h1v2h1v2h-1v2h-1v1h-1v1H9v-1h1v-1h1V9h1V7h-1V5h-1V4H9Z',
  stack: 'M2 2h12v3H2Z M2 7h12v3H2Z M2 12h12v3H2Z',
  clock: 'M5 1h6v1h2v2h1v2h1v4h-1v2h-1v2h-2v1H5v-1H3v-2H2v-2H1V6h1V4h1V2h2Z M5 3v1H4v2H3v4h1v2h1v1h6v-1h1v-2h1V6h-1V4h-1V3Z M7 5h2v3h3v2H7Z',
  globe: 'M5 1h6v1h2v2h1v2h1v4h-1v2h-1v2h-2v1H5v-1H3v-2H2v-2H1V6h1V4h1V2h2Z M7 3v2H4v1H3v1h4v2H3v1h1v1h3v2h2v-2h3v-1h1V9H9V7h4V6h-1V5H9V3Z',
  link: 'M2 5h6v2H4v2h4v2H2v-1H1V6h1Z M8 5h6v1h1v4h-1v1H8V9h4V7H8Z M5 7h6v2H5Z',
  doc: 'M3 1h7v1h1v1h1v1h1v11H3Z M5 3v10h6V5H9V3Z M6 7v1h4V7Z M6 9v1h4V9Z M6 11v1h3v-1Z',
  pulse: 'M1 7h3V5h1V3h2v4h1v4h1V9h1V7h5v2h-4v2H9v2H7v-2H6V7H5v2H1Z',
} as const;

export type PixelIconName = keyof typeof PATHS;

export function PixelIcon({ name, size = 32, className = '' }: { name: PixelIconName; size?: number; className?: string }) {
  const id = useId();
  const grain = `${id}-grain`;
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <filter id={grain} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="7" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0.45 0.65 0.85 1" />
            <feFuncG type="discrete" tableValues="0.45 0.65 0.85 1" />
            <feFuncB type="discrete" tableValues="0.45 0.65 0.85 1" />
            <feFuncA type="linear" slope="0.4" />
          </feComponentTransfer>
          <feBlend in2="SourceGraphic" mode="multiply" />
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${grain})`}>
        <path d={PATHS[name]} transform="scale(4)" fill="var(--teal)" fillRule="evenodd" />
      </g>
    </svg>
  );
}
