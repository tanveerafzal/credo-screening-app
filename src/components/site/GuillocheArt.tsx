'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { cx } from './Canvas';
import { buildEngraving, VIEW_H, VIEW_W, type Stroke } from './guilloche';

/*
 * Security-print engraving drawn from guilloche math (hypotrochoid, rose,
 * modulated rings and sine ribbons). Generated on the client from a seed, so
 * the page ships ~5 KB of code instead of ~350 KB of path data, and every line
 * stays continuous and crisp at any zoom. Static by design.
 */

const TONE: Record<Stroke['tone'], string> = { teal: 'var(--teal)', grey: 'var(--tertiary)' };

const noop = () => () => {};

function fadeIn(el: SVGSVGElement | null) {
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
}

/** `className` frames the art (size, position, mask); `svgClassName` sizes the drawing inside it, e.g. wider than the frame to crop in on small screens. */
export function GuillocheArt({
  seed = 7,
  className,
  svgClassName = 'absolute inset-0 h-full w-full',
}: {
  seed?: number;
  className?: string;
  svgClassName?: string;
}) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const art = useMemo(() => (mounted ? buildEngraving(seed) : null), [mounted, seed]);

  return (
    <div aria-hidden="true" className={cx('pointer-events-none overflow-hidden', className)}>
      {art ? (
        <svg
          ref={fadeIn}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMaxYMid slice"
          className={svgClassName}
          fill="none"
        >
          <defs>
            {art.strokes.map((s, i) =>
              s.fade ? (
                <linearGradient key={i} id={`gq-${seed}-${i}`} gradientUnits="userSpaceOnUse" x1={s.fade[0]} x2={s.fade[1]} y1={0} y2={0}>
                  <stop offset="0" style={{ stopColor: TONE[s.tone], stopOpacity: 0 }} />
                  <stop offset="1" style={{ stopColor: TONE[s.tone], stopOpacity: 1 }} />
                </linearGradient>
              ) : null,
            )}
          </defs>
          {art.strokes.map((s, i) => (
            <path
              key={i}
              d={s.d}
              vectorEffect="non-scaling-stroke"
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              style={{ stroke: s.fade ? `url(#gq-${seed}-${i})` : TONE[s.tone] }}
            />
          ))}
          {(['teal', 'grey'] as const).map((tone) => (
            <g key={tone} style={{ fill: TONE[tone] }}>
              {art.dots
                .filter((d) => d.tone === tone)
                .map((d, i) => (
                  <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r.toFixed(2)} fillOpacity={d.opacity.toFixed(2)} />
                ))}
            </g>
          ))}
        </svg>
      ) : null}
    </div>
  );
}
