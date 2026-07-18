/**
 * Canonical pricing & trial copy for Credo Screening marketing.
 * Keep website pages, CTAs, outreach, and legal text aligned with this file.
 *
 * Product billing (API): 1 credit = 1 ID verification or 1 Trusted Signatures
 * envelope. A background screening costs 1/10 of a credit, so 1 credit = 10
 * screenings. New partners receive 10 credits on signup (up to 100 screenings).
 */

export const FREE_CREDITS = 10;

/** Background screenings covered by one credit (a screening costs 0.1 credit). */
export const SCREENINGS_PER_CREDIT = 10;

/** Free background screenings included on signup (FREE_CREDITS × SCREENINGS_PER_CREDIT). */
export const FREE_SCREENINGS = FREE_CREDITS * SCREENINGS_PER_CREDIT;

export const PRODUCT_PRICES = {
  idVerification: { amount: 0.99, unit: 'per check', label: 'ID Verification' },
  screening: { amount: 0.49, unit: 'per check', label: 'Background Screening' },
  creditReport: { amount: 5.99, unit: 'per soft pull', label: 'Credit Report' },
  trustedSignatures: { amount: 1.99, unit: 'per envelope', label: 'Trusted Signatures' },
} as const;

export const BUNDLE_PRICES = {
  idAndScreening: {
    amount: 1.29,
    label: 'ID Verification + Screening',
    savings: 0.19,
    separateTotal: 1.48,
  },
  full: {
    amount: 6.49,
    label: 'ID Verification + Screening + Credit Report',
    savingsPercent: 13,
    separateTotal: 7.47,
  },
} as const;

export const FREE_TRIAL = {
  headline: `First month free — ${FREE_CREDITS} credits included`,
  short: `First month free — ${FREE_CREDITS} credits`,
  description:
    `New accounts receive ${FREE_CREDITS} free credits during the first month — ` +
    `enough for up to ${FREE_SCREENINGS} background screenings, ${FREE_CREDITS} ID verifications, or ${FREE_CREDITS} Trusted Signatures envelopes. ` +
    `Each credit covers one ID verification or one Trusted Signatures envelope, or ${SCREENINGS_PER_CREDIT} background screenings.`,
  cta: `First month free — ${FREE_CREDITS} credits (up to ${FREE_SCREENINGS} screenings). No credit card required.`,
  /** @deprecated Use credit-based copy; kept for gradual migration */
  legacyDual: `First month free — up to ${FREE_CREDITS} verifications & ${FREE_SCREENINGS} screenings`,
} as const;

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/** Shared FAQ answers — import in product/solution pages */
export const PRICING_FAQ = {
  freeTier: `${FREE_TRIAL.description} After that, pay per use.`,
  noMinimum:
    'No monthly minimums. Pay per use — 1 credit = 1 ID verification or Trusted Signatures envelope, or 10 background screenings. Buy credit packs when you need more.',
  bundle:
    `When you run both ID Verification and Background Screening on the same person in a single request, you pay ${formatUsd(BUNDLE_PRICES.idAndScreening.amount)} instead of ${formatUsd(BUNDLE_PRICES.idAndScreening.separateTotal)} — saving you ${formatUsd(BUNDLE_PRICES.idAndScreening.savings)} per check.`,
} as const;

export const OUTREACH_TRIAL = {
  subject: `Identity-verified signatures for {{firmName}} — free to try (${FREE_CREDITS} credits)`,
  bodyLine:
    `**Free to try:** New accounts receive ${FREE_CREDITS} free credits during the first month — enough for real retainer letters, closings, or release agreements with your team.`,
} as const;
