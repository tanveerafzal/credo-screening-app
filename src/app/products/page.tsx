import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTABanner } from '@/components/marketing/CTABanner';
import { FAQ } from '@/components/marketing/FAQ';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';
import { pageMetadata } from '@/lib/seo';
import {
  Action,
  CheckGlyph,
  Container,
  Index,
  Section,
  SectionHeader,
  Tag,
} from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import {
  BUNDLE_PRICES,
  FREE_CREDITS,
  FREE_TRIAL,
  PRICING_FAQ,
  PRODUCT_PRICES,
  STARTING_FROM,
  formatUsd,
} from '@/lib/pricing';

export const metadata: Metadata = pageMetadata({
  title: 'Products & Pricing',
  description:
    'AML screening, ID verification, and identity-verified e-signatures. Pay per use with 10 free credits — no contracts or monthly minimums.',
  path: '/products',
  keywords: ['AML screening pricing', 'sanctions screening cost', 'KYC pricing', 'OFAC screening API'],
});

const PRODUCTS = [
  {
    name: 'Digital Onboarding',
    tagline: 'Verify + screen in one flow',
    price: formatUsd(PRODUCT_PRICES.idVerification.amount),
    unit: 'per check',
    description: 'Complete remote onboarding: ID verification, selfie liveness, and AML/watchlist screening in a single workflow.',
    features: [
      'ID scan + selfie verification',
      'Passive liveness detection',
      'OFAC, PEP & sanctions screening',
      'Trusted signatures integration',
      'SDK & REST API embedding',
      `First month free — ${FREE_CREDITS} credits included`,
    ],
    href: '/credo-onboarding',
  },
  {
    name: 'ID Verification',
    tagline: 'Verify real people in seconds',
    price: formatUsd(PRODUCT_PRICES.idVerification.amount),
    unit: PRODUCT_PRICES.idVerification.unit,
    description: 'Government ID scan + selfie facial matching with liveness detection. Verify identities from 200+ countries in under 30 seconds.',
    features: [
      'Government ID, passport & driver\'s license',
      'Facial matching + liveness detection',
      '200+ countries supported',
      'Results in under 30 seconds',
      'OCR & MRZ data extraction',
      'Biometric data deleted after verification',
    ],
    href: '/credo-id-verification',
  },
  {
    name: 'Background Screening',
    tagline: 'Screen against 1.2M+ entities',
    price: formatUsd(PRODUCT_PRICES.screening.amount),
    unit: PRODUCT_PRICES.screening.unit,
    description: 'Sanctions, PEP, criminal, and regulatory screening across 80+ global watchlists. Instant fuzzy name matching with composite scoring.',
    features: [
      'OFAC, EU, UN, UK & global sanctions',
      'PEP & politically exposed persons',
      'Interpol & law enforcement lists',
      'Regulatory & debarment databases',
      'Fuzzy name matching & phonetic search',
      'Adverse media monitoring',
    ],
    href: '/screening',
  },
  {
    name: 'Trusted Signatures',
    tagline: 'Verified People. Trusted Signatures.',
    price: formatUsd(PRODUCT_PRICES.trustedSignatures.amount),
    unit: PRODUCT_PRICES.trustedSignatures.unit,
    description: 'Identity-verified electronic signatures. Each signer proves who they are before signing.',
    features: [
      'Identity verification before signing',
      'Sequential multi-signer support',
      'Draw, type, or upload signatures',
      'Drag-and-drop field editor',
      'TrustCredo verification seal',
      'Detailed audit trail',
    ],
    href: '/credo-trusted-signatures',
  },
];

const WHY = [
  {
    title: 'No Monthly Minimums',
    desc: 'Pay per use with credit packs. No platform fee and no required monthly volume.',
  },
  {
    title: 'Instant Access',
    desc: 'Sign up, get your API key, and start running checks in minutes. No setup fees.',
  },
  {
    title: 'Scale Freely',
    desc: 'Same low price whether you run 10 checks a month or 10,000. Enterprise volume? Let\'s talk.',
  },
];

const COMPARISON: Array<{ feature: string; idv: string | boolean; screen: string | boolean; bundle: string | boolean }> = [
  { feature: `${STARTING_FROM} / check`, idv: formatUsd(PRODUCT_PRICES.idVerification.amount), screen: formatUsd(PRODUCT_PRICES.screening.amount), bundle: formatUsd(BUNDLE_PRICES.idAndScreening.amount) },
  { feature: 'REST API access', idv: true, screen: true, bundle: true },
  { feature: 'Webhook callbacks', idv: true, screen: true, bundle: true },
  { feature: 'ID document scanning', idv: true, screen: false, bundle: true },
  { feature: 'Facial matching', idv: true, screen: false, bundle: true },
  { feature: 'Liveness detection', idv: true, screen: false, bundle: true },
  { feature: 'Sanctions screening', idv: false, screen: true, bundle: true },
  { feature: 'PEP screening', idv: false, screen: true, bundle: true },
  { feature: 'Criminal watchlists', idv: false, screen: true, bundle: true },
];

const FAQS = [
  { q: 'Is there a minimum monthly usage?', a: PRICING_FAQ.noMinimum },
  { q: 'How does the bundle pricing work?', a: PRICING_FAQ.bundle },
  { q: 'Is there a free tier?', a: PRICING_FAQ.freeTier },
  { q: 'Do I need to commit to a volume?', a: 'No commitments. Pay per use. Run 1 check or 10,000 — same price per check. For high-volume needs, contact us for enterprise pricing.' },
  { q: 'How do I get started?', a: 'Sign up for free, get your API key, and start running checks immediately. No credit card required for the free tier.' },
  { q: 'Can I use all products through the API?', a: 'Yes. ID Verification, Background Screening, and Trusted Signatures are available via our REST API. Run them individually or combine them for a complete onboarding flow.' },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-0 md:px-12">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
        </div>
        <Container className="relative">
          <div className="max-w-2xl px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
            <Breadcrumb items={[{ label: 'Products' }]} />
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">
              Simple Pricing.
              <br />
              Pay Per Use.
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
              ID Verification, Background Screening, and Trusted Signatures.
              Starting from {formatUsd(PRODUCT_PRICES.screening.amount)} per check.
              Pay per use. No contracts. No monthly minimums.
            </p>
            <div className="mt-7">
              <Tag tone="teal">{FREE_TRIAL.headline}</Tag>
            </div>
          </div>
        </Container>
      </section>

      {/* Product cells */}
      <section className="border-t border-border px-0 md:px-12">
        <Container>
          <div className="cells-clip">
            <ul className="cells md:grid-cols-2">
              {PRODUCTS.map((product, i) => (
                <li key={product.name} className="flex flex-col px-6 py-10 md:px-8 md:py-12">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-xl leading-snug tracking-[-0.02em]">{product.name}</h2>
                    <Index n={i + 1} />
                  </div>
                  <p className="mt-1 text-sm text-tertiary">{product.tagline}</p>
                  <p className="mt-7">
                    <span className="mb-2 block font-mono text-[0.6875rem] uppercase tracking-wide text-tertiary">{STARTING_FROM}</span>
                    <span className="text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-foreground-highlight">{product.price}</span>
                    <span className="ml-1.5 text-sm text-tertiary">/ {product.unit}</span>
                  </p>
                  <p className="mt-6 max-w-md text-[0.9375rem] leading-[1.7] text-muted">{product.description}</p>
                  <ul className="mt-7 flex-1 space-y-2.5">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                        <CheckGlyph className="mt-1" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Action href={product.href} variant="secondary" arrow>Learn More</Action>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Bundle */}
      <section className="border-t border-border bg-surface-elevated px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-6 lg:border-r lg:border-border">
            <Tag tone="teal">Best Value</Tag>
            <h2 className="mt-5 text-2xl leading-tight sm:text-[2rem]">Bundle & Save</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              Run ID Verification and Background Screening together {STARTING_FROM.toLowerCase()} <strong className="font-medium text-foreground-highlight">{formatUsd(BUNDLE_PRICES.idAndScreening.amount)} per check</strong>. Save {formatUsd(BUNDLE_PRICES.idAndScreening.savings)} compared to running them separately.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Action href="/register" arrow>Get Started Free</Action>
              <Action href="/contact?plan=corporate" variant="secondary">Contact Sales</Action>
            </div>
          </div>
          <div className="cells-clip border-t border-border lg:col-span-6 lg:border-t-0">
            <dl className="cells h-full sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: 'ID Verification', value: formatUsd(PRODUCT_PRICES.idVerification.amount), note: null },
                { label: 'Screening', value: formatUsd(PRODUCT_PRICES.screening.amount), note: null },
                { label: 'Together', value: formatUsd(BUNDLE_PRICES.idAndScreening.amount), note: `Save ${formatUsd(BUNDLE_PRICES.idAndScreening.savings)}` },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`flex flex-col justify-end px-6 py-8 md:px-8 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6 ${s.note ? 'bg-teal-wash/60' : ''}`}
                >
                  <dt className={`order-2 mt-2 font-mono text-xs lg:order-1 lg:mt-0 ${s.note ? 'text-teal-ink' : 'text-tertiary'}`}>{s.label}</dt>
                  <dd className="order-1 lg:order-2 lg:text-right">
                    <span className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-wide text-tertiary">{STARTING_FROM}</span>
                    <span className="block text-4xl font-medium tracking-[-0.045em] text-foreground-highlight">{s.value}</span>
                    {s.note ? <span className="mt-1 block text-sm text-teal-ink">{s.note}</span> : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Why Pay Per Use */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Why Pay Per Use?"
          body={<p>No monthly minimums. Buy credits when you need them — pay only when you run a check.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells md:grid-cols-3">
            {WHY.map((item, i) => (
              <li key={item.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-5 text-[1.0625rem] leading-snug tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Comparison Table */}
      <Section>
        <SectionHeader
          title="What's Included"
          body={<p>Every product includes full features. No hidden tiers.</p>}
        />
        <div className="overflow-x-auto px-6 md:px-8">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-sm text-tertiary">
                <th scope="col" className="py-3 pr-4 font-normal">Feature</th>
                <th scope="col" className="px-2 py-3 text-center font-normal sm:px-4">ID Verify</th>
                <th scope="col" className="px-2 py-3 text-center font-normal sm:px-4">Screening</th>
                <th scope="col" className="py-3 pl-2 text-center font-normal sm:pl-4">Bundle</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border">
                  <th scope="row" className="py-3.5 pr-2 text-[0.9375rem] sm:pr-4 font-normal text-muted">{row.feature}</th>
                  {[row.idv, row.screen, row.bundle].map((val, i) => (
                    <td key={i} className="px-2 py-3.5 text-center last:pr-0 sm:px-4">
                      {typeof val === 'boolean' ? (
                        val ? (
                          <>
                            <CheckGlyph className="inline-block" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <span className="text-tertiary" aria-hidden="true">–</span>
                            <span className="sr-only">Not included</span>
                          </>
                        )
                      ) : (
                        <span className="text-[0.9375rem] font-medium text-foreground-highlight tabular-nums">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <FAQ items={FAQS} />
      <CTABanner />
      <Footer />
    </>
  );
}
