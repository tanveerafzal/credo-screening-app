import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import { BUNDLE_PRICES, ENTERPRISE_NOTE, FREE_CREDITS, PRODUCT_PRICES, formatUsd } from '@/lib/pricing';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Action, ArrowGlyph, CheckGlyph, Container, Index, Section, SectionHeader, TextLink } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import { VerificationRecord } from '@/components/site/VerificationRecord';
import { TrustSection, TrustedByRow } from '@/components/site/TrustSection';
import { LandscapeBand } from '@/components/site/LandscapeBand';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureCells } from '@/components/marketing/FeatureGrid';
import { CountUp, Reveal } from '@/components/site/motion';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'ID Verification & Compliance Screening',
    description: BRAND.description,
    path: '/',
    keywords: ['ID verification', 'identity verification', 'AML screening', 'sanctions screening', 'OFAC screening', 'PEP screening', 'watchlist screening'],
  }),
  title: {
    absolute: `${BRAND.name} — ID Verification & Compliance Screening`,
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
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Volume and deployment scoping',
      'Security review and SLA',
      'Dedicated support',
      'Custom integrations',
      'Continuous monitoring',
    ],
    cta: 'Talk to sales',
    href: '/contact?plan=corporate',
    primary: true,
  },
  {
    name: 'Usage',
    price: formatUsd(PRODUCT_PRICES.idVerification.amount),
    period: ' per ID check',
    features: [
      `Screening ${formatUsd(PRODUCT_PRICES.screening.amount)} per check`,
      `Signatures ${formatUsd(PRODUCT_PRICES.trustedSignatures.amount)} per envelope`,
      'REST API, webhooks, and dashboard',
      `${FREE_CREDITS} credits to evaluate a workflow`,
    ],
    cta: 'Create an account',
    href: '/register',
    primary: false,
  },
];

const PER_USE = [
  { label: 'ID Verification', price: formatUsd(PRODUCT_PRICES.idVerification.amount), unit: 'per check' },
  { label: 'Background Screening', price: formatUsd(PRODUCT_PRICES.screening.amount), unit: 'per check' },
  { label: 'Trusted Signatures', price: formatUsd(PRODUCT_PRICES.trustedSignatures.amount), unit: 'per envelope' },
  { label: 'ID + Screening', price: formatUsd(BUNDLE_PRICES.idAndScreening.amount), unit: 'per check' },
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
                ID verification and
                <br />
                compliance screening
                <br />
                you can trust
              </h1>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                Verify a government ID with a selfie in under 30 seconds, and screen against <strong className="font-medium text-foreground-highlight">1.2 million+ entities</strong> from OFAC, global sanctions, PEP databases, and 80+ watchlists.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Action href="/contact?plan=corporate" arrow>Talk to sales</Action>
                <Action href="/credo-id-verification" variant="secondary">See ID verification</Action>
              </div>
              <p className="mt-6 max-w-xl text-sm text-tertiary">{ENTERPRISE_NOTE}</p>
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
          body={<p>Built for teams that need to confirm who someone is, and screen them for compliance.</p>}
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
          title="Pricing"
          body={
            <p>
              ID verification is {formatUsd(PRODUCT_PRICES.idVerification.amount)} per check.
              Screening is {formatUsd(PRODUCT_PRICES.screening.amount)}.
              Signature envelopes are {formatUsd(PRODUCT_PRICES.trustedSignatures.amount)}.
              {' '}{ENTERPRISE_NOTE}
            </p>
          }
        />

        <div className="cells-clip border-y border-border">
        <Reveal className="reveal-cells cells md:grid-cols-2">
          {PLANS.map((plan) => (
            <div key={plan.name} className="flex flex-col px-6 py-10 md:px-8 md:py-12">
              <h3 className="text-lg leading-snug tracking-[-0.015em]">{plan.name}</h3>
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
                <Action href={plan.href} variant={plan.primary ? 'primary' : 'secondary'}>{plan.cta}</Action>
              </div>
            </div>
          ))}
        </Reveal>
        </div>

        <div className="px-6 pb-4 pt-16 md:px-8">
          <h3 className="text-xl leading-tight tracking-[-0.03em]">Pay Per Use</h3>
          <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted">
            1 credit = 1 ID verification or signature envelope, or 10 background screenings. ID and screening together are {formatUsd(BUNDLE_PRICES.idAndScreening.amount)} per check.
          </p>
        </div>
        <div className="cells-clip mt-8 border-y border-border">
        <Reveal as="ul" className="reveal-cells cells sm:grid-cols-2 lg:grid-cols-4">
          {PER_USE.map((p) => (
            <li key={p.label} className="flex flex-col px-6 py-8 md:px-8">
              <span className="text-sm font-medium text-foreground">{p.label}</span>
              <span className="mt-6 text-[2.5rem] font-medium leading-none tracking-[-0.05em] text-foreground-highlight">{p.price}</span>
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
            <h2 className="text-[1.75rem] leading-tight sm:text-[2.5rem]">Scope a deployment with your team</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">{ENTERPRISE_NOTE}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Action href="/contact?plan=corporate" arrow>Talk to sales</Action>
              <Action href="/products" variant="secondary">See pricing</Action>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
