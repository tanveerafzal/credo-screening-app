'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/*
 * Scroll motion primitives. Markup is fully visible before hydration; the
 * "pending" state is only applied by script, only to elements that are still
 * below the fold, and only when the visitor has not asked for reduced motion.
 * Styles live in globals.css under "Motion".
 */

const REDUCED = '(prefers-reduced-motion: reduce)';

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED).matches;
}

/** True when the element is already within the visible viewport (plus a small margin). */
function inView(el: Element) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight * 0.92 && r.bottom > 0;
}

type RevealTag = 'div' | 'ul' | 'ol' | 'dl' | 'figure' | 'section';

/**
 * Sets data-reveal="pending" then "in" (once) when the element scrolls into
 * view. Pair with a motion class: `reveal` (self), `reveal-cells` (children
 * stagger) or a component's own `[data-reveal]` rules.
 */
export function Reveal({
  as = 'div',
  children,
  className,
  ...rest
}: {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) {
  // Every tag here takes the same props and the ref is only read in the effect.
  const Tag = as as 'div';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || inView(el)) return;
    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = 'in';
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

const NUMBER = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/;

/**
 * Counts a stat such as "1.2M+", "200+" or "99.9%" up from zero the first time
 * it is at least half visible. Server output is the final value, so the number
 * is correct without script and never shifts layout (tabular figures).
 */
export function CountUp({ value, className, duration = 900 }: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(NUMBER);
    if (!el || !m || reducedMotion()) return;
    const [, prefix, digits, suffix] = m;
    const target = parseFloat(digits.replace(/,/g, ''));
    if (!Number.isFinite(target) || target < 10) return;
    const decimals = (digits.split('.')[1] ?? '').length;
    const grouped = digits.includes(',');
    const format = (n: number) =>
      n.toLocaleString('en-CA', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: grouped });

    let frame = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = p < 1 ? `${prefix}${format(target * eased)}${suffix}` : value;
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
