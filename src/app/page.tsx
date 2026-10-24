import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import { BUNDLE_PRICES, FREE_CREDITS, FREE_TRIAL, PRODUCT_PRICES, STARTING_FROM, formatUsd } from '@/lib/pricing';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Action, ArrowGlyph, CheckGlyph, Container, Index, Section, SectionHeader, Tag, TextLink } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import { VerificationRecord } from '@/components/site/VerificationRecord';
import { TrustSection, TrustedByRow } from '@/components/site/TrustSection';
import { LandscapeBand } from '@/components/site/LandscapeBand';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureCells } from '@/components/marketing/FeatureGrid';
import { CountUp, Reveal } from '@/components/site/motion';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'AML & Sanctions Screening Platform',
    description: BRAND.description,
    path: '/',
    keywords: ['AML screening', 'sanctions screening', 'OFAC screening', 'PEP screening', 'watchlist screening'],
  }),
  title: {
    absolute: `${BRAND.name} — AML & Sanctions Screening Platform`,
  },
};

const SOURCES = [
  { category: 'Sanctions', items: ['OFAC SDN', 'OFAC Consolidated', 'EU Consolidated Sanctions', 'UN Security Council', 'UK OFSI', 'Australia DFAT', 'Canada SEMA', 'Switzerland SECO', 'Japan MOF', 'Singapore MAS', 'Hong Kong MAS'] },
  { category: 'PEP (Politically Exposed Persons)', items: ['OpenSanctions PEP', 'Wikidata Politicians', 'US Congress', 'UK Parliament', 'EU Parliament', 'EveryPolitician'] },
  { category: 'Criminal / Law Enforcement', items: ['Interpol Red & Yellow Notices', 'FBI Most Wanted', 'DEA Most Wanted', 'US Marshals', 'Europol Most Wanted'] },
  { category: 'Regulatory / Debarment', items: ['SEC Enforcement', 'SAM.gov Exclusions', 'OIG Exclusion List', 'BIS Entity List', 'World Bank Debarment', 'FCA Warnings (UK)', 'BaFin (Germany)', 'FINMA (Switzerland)', 'ASIC (Australia)'] },
  { category: 'Country Risk', items: ['FATF High-Risk Lists', 'Basel AML Index', 'Transparency International CPI'] },
  { category: 'Adverse Media', items: ['GDELT Project', 'Global news monitoring'] },
];

const FEATURES = [
  { title: 'Instant Results', desc: 'Screen against 1.2M+ entities in under 3 seconds with fuzzy name matching and phonetic algorithms.' },
  { title: '80+ Global Sources', desc: 'OFAC, EU, UN, UK, PEP databases, Interpol, and regulatory lists from jurisdictions worldwide.' },
  { title: 'Bank-Grade Security', desc: 'All data encrypted in transit and at rest. HMAC-signed webhooks for tamper-proof delivery.' },
  { title: 'Smart Matching', desc: 'Name variant detection (Muhammad/Mohammed/Mohamed), phonetic matching, and composite scoring.' },
  { title: 'Always Current', desc: 'Critical sanctions lists updated hourly. Full dataset refreshed every 4 hours automatically.' },
  { title: 'Easy Integration', desc: 'Simple REST API. Send a name, get results. Webhook callbacks for async workflows.' },
  { title: 'ID Verification', desc: 'Verify real people with ID scan + selfie. Facial matching, liveness detection, 200+ countries.' },
];

const ONBOARDING_STEPS = [
  { title: 'Document Capture', desc: 'OCR and MRZ extraction from IDs and passports.' },
  { title: 'Identity Verification', desc: 'Facial matching with passive liveness detection.' },
  { title: 'Compliance Screening', desc: 'OFAC, PEP, sanctions, and criminal watchlists.' },
];

const PLANS = [
  {
    name: 'Pay as you go',
    price: '$0',
    period: ' platform fee',
    features: [
      `${FREE_CREDITS} free credits on signup`,
      'Per-check pricing — no commitments',
      'REST API, webhooks & dashboard included',
      'Buy more credits anytime in your account',
    ],
    cta: 'Get Started',
    href: '/register',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Volume pricing & credit packs', 'Continuous monitoring', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
    cta: 'Contact Us',
    href: '/contact?plan=corporate',
    popular: false,
  },
];

const PER_USE = [
  { label: 'ID Verification', price: formatUsd(PRODUCT_PRICES.idVerification.amount), unit: 'per check', tag: 'Limited Time' },
  { label: 'Background Screening', price: formatUsd(PRODUCT_PRICES.screening.amount), unit: 'per check', tag: 'Limited Time' },
  { label: 'Trusted Signatures', price: formatUsd(PRODUCT_PRICES.trustedSignatures.amount), unit: 'per envelope', tag: 'Limited Time' },
  {
    label: 'ID + Screening',
    price: formatUsd(BUNDLE_PRICES.idAndScreening.amount),
    unit: `per check · save ${formatUsd(BUNDLE_PRICES.idAndScreening.savings)}`,
    tag: null,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-0 md:px-12">
        <div className="absolute inset-0 opacity-25 sm:opacity-60" aria-hidden="true">
          <AsciiField focus={[0.74, 0.42]} fadeLeft={0.36} />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-40 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h1 className="text-[2.3rem] leading-[1.04] sm:text-[3.6rem] lg:text-[4rem]">
                Compliance screening
                <br />
                you can trust
              </h1>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                Screen against <strong className="font-medium text-foreground-highlight">1.2 million+ entities</strong> from OFAC, global sanctions, PEP databases, and 80+ watchlists. Verify identities with ID scan + selfie in under 30 seconds.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action href="/screening" arrow>Try Free Screening</Action>
                <Action href="#sources" variant="secondary">View Data Sources</Action>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-tertiary">
                <Tag tone="teal">{FREE_TRIAL.headline}</Tag>
                <span>No credit card required. Cancel anytime.</span>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <VerificationRecord animate className="mx-auto max-w-[30rem] lg:mx-0 lg:ml-auto" />
            </div>
          </div>
        </Container>
      </section>

      <TrustedByRow />
      <StatsBar
        stats={[
          { value: '1.2M+', label: 'Entities Screened Against' },
          { value: '200+', label: 'Countries Supported' },
          { value: '<3s', label: 'Average Response Time' },
          { value: '99.9%', label: 'Uptime SLA' },
        ]}
      />

      {/* Features */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title={`Why ${BRAND.name}?`}
          body={<p>Built for compliance teams, fintechs, and any business that needs reliable screening.</p>}
        />
        <FeatureCells
          features={FEATURES}
          filler={
            <>
              <AsciiField focus={[0.5, 0.5]} />
              <a
                href={BRAND.docsUrl}
                className="absolute inset-x-6 bottom-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-[0_0_0_1px_var(--border-emphasized)] md:inset-x-8"
              >
                API Docs <ArrowGlyph />
              </a>
            </>
          }
        />
      </Section>

      {/* Digital Onboarding */}
      <section className="border-t border-border bg-surface-elevated px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <p className="text-sm text-tertiary">Digital Onboarding</p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Frictionless Customer Onboarding</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              Verify identity remotely with ID scan, selfie liveness, and automated AML screening —
              all in under 30 seconds. No app downloads. No manual review queues.
            </p>
            <Reveal as="ol" className="reveal mt-10 max-w-xl border-y border-border">
              {ONBOARDING_STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-border py-5 last:border-b-0">
                  <Index n={i + 1} className="mt-1" />
                  <div>
                    <h3 className="text-base leading-snug tracking-[-0.015em]">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.65] text-muted">{step.desc}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <div className="mt-9">
              <Action href="/credo-onboarding" arrow>Explore Digital Onboarding</Action>
            </div>
          </div>
          <div className="cells-clip border-t border-border lg:col-span-5 lg:border-t-0">
          <Reveal as="dl" className="reveal-cells cells h-full grid-cols-2">
            {[
              { value: '<30s', label: 'Verification Time' },
              { value: '200+', label: 'Countries' },
              { value: '1.2M+', label: 'Watchlist Entities' },
              { value: String(FREE_CREDITS), label: 'Free Credits' },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-end px-6 py-10 md:px-8"
              >
                <dt className="order-2 mt-2 font-mono text-xs text-tertiary">{s.label}</dt>
                <dd className="order-1 text-4xl font-medium tracking-[-0.045em] text-foreground-highlight tabular-nums">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </Reveal>
          </div>
        </Container>
      </section>

      {/* Sources */}
      <Section id="sources" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Data Sources We Screen Against"
          body={<p>Comprehensive coverage across sanctions, PEP, criminal, and regulatory databases worldwide.</p>}
        />
        <div className="cells-clip border-t border-border">
        <Reveal className="reveal-cells cells md:grid-cols-2 lg:grid-cols-3">
          {SOURCES.map((group) => (
            <div key={group.category} className="px-6 py-8 md:px-8 md:py-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base leading-snug tracking-[-0.015em]">{group.category}</h3>
                <span className="font-mono text-xs text-tertiary">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <ul className="mt-5 space-y-1.5 text-[0.9375rem] text-muted">
                {group.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-[0.6875rem] text-teal" aria-hidden="true">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
        </div>
      </Section>

      <LandscapeBand />
      <TrustSection />

      {/* Pricing */}
      <Section id="pricing" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Simple, Transparent Pricing"
          body={
            <>
              <p>
                {STARTING_FROM} {formatUsd(PRODUCT_PRICES.screening.amount)} per check. Pay per use. No monthly minimums. Scale as you grow.
              </p>
              <p className="mt-4"><Tag tone="teal">{FREE_TRIAL.headline}</Tag></p>
            </>
          }
        />

        <div className="cells-clip border-y border-border">
        <Reveal className="reveal-cells cells md:grid-cols-2">
          {PLANS.map((plan) => (
            <div key={plan.name} className="flex flex-col px-6 py-10 md:px-8 md:py-12">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg leading-snug tracking-[-0.015em]">{plan.name}</h3>
                {plan.popular ? <Tag>Most Popular</Tag> : null}
              </div>
              <p className="mt-6">
                <span className="text-5xl font-medium tracking-[-0.05em] text-foreground-highlight">{plan.price}</span>
                <span className="text-sm text-tertiary">{plan.period}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.9375rem] text-muted">
                    <CheckGlyph className="mt-1" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Action href={plan.href} variant={plan.popular ? 'primary' : 'secondary'}>{plan.cta}</Action>
              </div>
            </div>
          ))}
        </Reveal>
        </div>

        <div className="px-6 pb-4 pt-16 md:px-8">
          <h3 className="text-xl leading-tight tracking-[-0.03em]">Pay Per Use</h3>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted">
            1 credit = 1 ID verification or signature — or 10 background screenings. Use credits on any product below. ID + Screening bundle {formatUsd(BUNDLE_PRICES.idAndScreening.amount)}.
          </p>
        </div>
        <div className="cells-clip mt-8 border-y border-border">
        <Reveal as="ul" className="reveal-cells cells sm:grid-cols-2 lg:grid-cols-4">
          {PER_USE.map((p) => (
            <li
              key={p.label}
              className={`flex flex-col px-6 py-8 md:px-8 ${p.tag ? '' : 'bg-teal-wash/60'}`}
            >
              <div className="flex min-h-6 items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">{p.label}</span>
                {p.tag ? <span className="font-mono text-[0.6875rem] text-tertiary">{p.tag}</span> : null}
              </div>
              <span className="mt-6 font-mono text-[0.6875rem] uppercase tracking-wide text-tertiary">{STARTING_FROM}</span>
              <span className="mt-2 text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-foreground-highlight">{p.price}</span>
              <span className="mt-2 text-sm text-tertiary">{p.unit}</span>
            </li>
          ))}
        </Reveal>
        </div>
        <div className="px-6 py-8 md:px-8">
          <TextLink href="/products">View full product details <ArrowGlyph /></TextLink>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border px-0 md:px-12">
        <div className="absolute inset-0 opacity-30 sm:opacity-80" aria-hidden="true">
          <AsciiField focus={[0.82, 0.6]} fadeLeft={0.4} />
        </div>
        <Container className="relative">
          <div className="max-w-2xl px-6 py-24 md:px-8 md:py-32">
            <h2 className="text-[1.75rem] leading-tight sm:text-[2.5rem]">Ready to strengthen your compliance?</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">{FREE_TRIAL.cta}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Action href="/screening" arrow>Start Screening</Action>
              <Action href="/contact" variant="secondary">Contact Sales</Action>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
