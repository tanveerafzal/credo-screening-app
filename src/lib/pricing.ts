/**
 * Canonical pricing & trial copy for Credo Screening marketing.
 * Keep website pages, CTAs, outreach, and legal text aligned with this file.
 *
 * Product billing (API): 1 credit = 1 ID verification, screening, or signature envelope.
 * New partners receive 10 credits on signup.
 */

export const FREE_CREDITS = 10;

export const PRODUCT_PRICES = {
  idVerification: { amount: 0.99, unit: 'per check', label: 'ID Verification' },
  screening: { amount: 0.99, unit: 'per check', label: 'Background Screening' },
  creditReport: { amount: 5.99, unit: 'per soft pull', label: 'Credit Report' },
  trustedSignatures: { amount: 1.99, unit: 'per envelope', label: 'Trusted Signatures' },
} as const;

export const BUNDLE_PRICES = {
  idAndScreening: {
    amount: 1.59,
    label: 'ID Verification + Screening',
    savings: 0.39,
    separateTotal: 1.98,
  },
  full: {
    amount: 7.99,
    label: 'ID Verification + Screening + Credit Report',
    savingsPercent: 15,
    separateTotal: 7.97,
  },
} as const;

export const FREE_TRIAL = {
  headline: `First month free — ${FREE_CREDITS} credits included`,
  short: `First month free — ${FREE_CREDITS} credits`,
  description:
    `New accounts receive ${FREE_CREDITS} free credits during the first month. ` +
    'Each credit covers one ID verification, one background screening, or one Trusted Signatures envelope.',
  cta: `First month free — ${FREE_CREDITS} credits included. No credit card required.`,
  /** @deprecated Use credit-based copy; kept for gradual migration */
  legacyDual: `First month free — up to ${FREE_CREDITS} verifications & ${FREE_CREDITS} screenings`,
} as const;

export function formatUsd(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/** Shared FAQ answers — import in product/solution pages */
export const PRICING_FAQ = {
  freeTier: `${FREE_TRIAL.description} After that, pay per use.`,
  noMinimum:
    'No monthly minimums. Pay per use — 1 credit = 1 ID verification, screening, or Trusted Signatures envelope. Buy credit packs when you need more.',
  bundle:
    `When you run both ID Verification and Background Screening on the same person in a single request, you pay ${formatUsd(BUNDLE_PRICES.idAndScreening.amount)} instead of ${formatUsd(BUNDLE_PRICES.idAndScreening.separateTotal)} — saving you ${formatUsd(BUNDLE_PRICES.idAndScreening.savings)} per check.`,
} as const;

export const OUTREACH_TRIAL = {
  subject: `Identity-verified signatures for {{firmName}} — free to try (${FREE_CREDITS} credits)`,
  bodyLine:
    `**Free to try:** New accounts receive ${FREE_CREDITS} free credits during the first month — enough for real retainer letters, closings, or release agreements with your team.`,
} as const;
