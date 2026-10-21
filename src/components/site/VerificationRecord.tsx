/* eslint-disable @next/next/no-img-element */
import { cx } from './Canvas';
import { Reveal } from './motion';

const CHECKS = [
  { k: 'Document authenticity', d: 'Ontario driver’s licence template and security features', v: 'Pass' },
  { k: 'Data extraction', d: 'OCR and barcode read, front matches back', v: 'Pass' },
  { k: 'Expiry', d: 'Expires April 12, 2027', v: 'Valid' },
  { k: 'Face match', d: 'Selfie against ID photo, threshold 80%', v: '97%' },
  { k: 'Liveness', d: 'Live person, no screen or print', v: '99%' },
  { k: 'Watchlist screening', d: 'Sanctions, PEP and criminal lists', v: 'No match' },
];

const TRAIL: Array<[string, string]> = [
  ['09:29:51', 'Session opened from secure link'],
  ['09:29:56', 'Licence front and back captured'],
  ['09:30:17', 'Selfie captured'],
  ['09:30:22', 'Checks complete, result issued'],
];

/* Sequence timing (ms): rows scan from ROW_START, values tick in STEP apart, the verdict lands last. */
const ROW_START = 300;
const STEP = 140;
const VALUE_LAG = 120;
const VERDICT_AT = ROW_START + VALUE_LAG + CHECKS.length * STEP + 160;

const FIGURE_CLASS =
  'm-0 min-w-0 overflow-hidden rounded-xl border border-border-emphasized bg-background text-[0.875rem] shadow-[0_1px_2px_rgba(11,17,16,0.05),0_24px_48px_-28px_rgba(11,17,16,0.35)]';
const FIGURE_LABEL = 'Example verification record with specimen data';

/**
 * The verification result as staff see it, rebuilt with specimen data
 * (a fictional person and a SPECIMEN-marked licence). With `animate`, the
 * checks tick and resolve in sequence, then the verdict is issued; the
 * sequence waits until the card is in view.
 */
export function VerificationRecord({
  animate = false,
  showTrail = false,
  className,
}: {
  animate?: boolean;
  showTrail?: boolean;
  className?: string;
}) {
  const at = (ms: number) => (animate ? { animationDelay: `${ms}ms` } : undefined);
  const body = (
    <>
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="font-medium text-foreground-highlight">Verification record</p>
          <p className="mt-0.5 truncate font-mono text-[0.6875rem] text-tertiary">CR-IDV-2026-226628 · Oct 21, 9:30 a.m. · 31 s</p>
        </div>
        <div className={cx('flex shrink-0 items-center gap-3', animate && 'resolve-verdict')} style={at(VERDICT_AT)}>
          <span className="rounded-full bg-teal-ink px-2.5 py-1 text-[0.6875rem] font-medium text-white">Verified</span>
          <span className="text-lg font-medium tracking-[-0.03em] text-foreground-highlight tabular-nums">
            96<span className="text-xs font-normal text-tertiary">/100</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border px-5 py-4 sm:max-w-[22rem]">
        <div className="grid justify-items-center gap-1.5">
          <img src="/specimen/id-photo.jpg" alt="Photo cropped from the specimen ID" width={240} height={275} className="aspect-[24/27] w-full rounded-md border border-border object-cover" />
          <span className="text-[0.6875rem] text-tertiary">ID photo</span>
        </div>
        <div className="grid justify-items-center leading-tight">
          <span className="text-lg font-medium text-teal-ink tabular-nums">97%</span>
          <span className="text-[0.6875rem] text-tertiary">match</span>
        </div>
        <div className="grid justify-items-center gap-1.5">
          <img src="/specimen/selfie-crop.jpg" alt="Specimen selfie" width={240} height={275} className="aspect-[24/27] w-full rounded-md border border-border object-cover" />
          <span className="text-[0.6875rem] text-tertiary">Selfie</span>
        </div>
      </div>

      <ol className="px-5">
        {CHECKS.map((c, i) => (
          <li
            key={c.k}
            className={cx('flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-b-0', animate && 'resolve-row')}
            style={at(ROW_START + i * STEP)}
          >
            <span className="min-w-0">
              <span className="block font-medium text-foreground">{c.k}</span>
              <span className="block text-xs text-tertiary">{c.d}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 font-medium text-teal-ink tabular-nums">
              {animate ? (
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" className="resolve-tick shrink-0">
                  <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" style={at(ROW_START + VALUE_LAG + i * STEP)} />
                </svg>
              ) : null}
              <span className={cx(animate && 'resolve-value')} style={at(ROW_START + VALUE_LAG + i * STEP)}>
                {c.v}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {showTrail ? (
        <div className="border-t border-border px-5 py-4">
          <p className="mb-2 font-medium text-foreground">Audit trail</p>
          <ol className="space-y-1.5">
            {TRAIL.map(([t, e]) => (
              <li key={t} className="grid grid-cols-[4.5rem_1fr] gap-2 text-xs text-muted">
                <span className="font-mono text-tertiary">{t}</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <figcaption className="border-t border-border bg-surface-elevated px-5 py-2.5 text-[0.6875rem] text-tertiary">
        Specimen record. Fictional person and document.
      </figcaption>
    </>
  );

  return animate ? (
    <Reveal as="figure" className={cx(FIGURE_CLASS, className)} aria-label={FIGURE_LABEL}>
      {body}
    </Reveal>
  ) : (
    <figure className={cx(FIGURE_CLASS, className)} aria-label={FIGURE_LABEL}>
      {body}
    </figure>
  );
}
