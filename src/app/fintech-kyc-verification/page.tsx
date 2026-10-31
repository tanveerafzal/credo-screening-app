import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/marketing/PageHero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureCells } from '@/components/marketing/FeatureGrid';
import { CTABanner } from '@/components/marketing/CTABanner';
import { CheckGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
import { VerificationRecord } from '@/components/site/VerificationRecord';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Fintech KYC Verification',
  description:
    'Fast KYC and identity verification for fintech apps. Reduce drop-off with sub-30-second ID + selfie flows, liveness detection, and AML screening API.',
  path: '/fintech-kyc-verification',
  keywords: ['fintech KYC', 'fintech identity verification', 'KYC API fintech', 'AML fintech'],
});

const PAIN_POINTS = [
  {
    title: 'Slow Onboarding',
    desc: 'Manual identity checks take hours or days. Users abandon sign-up before they ever transact. Every minute of friction costs you revenue.',
  },
  {
    title: 'High Drop-Off Rates',
    desc: 'Complex verification flows kill conversion. Users expect instant onboarding — if your KYC takes too long, they go to a competitor.',
  },
  {
    title: 'Fraud Risk',
    desc: 'Synthetic identities, stolen documents, and deepfakes are on the rise. Basic document checks aren\'t enough to stop sophisticated fraud.',
  },
  {
    title: 'Compliance Challenges',
    desc: 'KYC/AML regulations vary by jurisdiction and change frequently. Staying compliant across markets is complex and resource-intensive.',
  },
];

const FEATURES = [
  {
    title: 'ID Verification — 200+ Countries',
    desc: 'Accept government IDs, passports, and driver\'s licenses from over 200 countries. OCR and MRZ scanning extract data instantly.',
  },
  {
    title: 'Facial Recognition + Selfie Matching',
    desc: 'AI-powered facial biometric matching compares the selfie to the ID photo in real-time with 99.9% accuracy.',
  },
  {
    title: 'Liveness Detection',
    desc: 'Confirms a live person is present — not a photo, video, or deepfake mask. Blocks spoofing attacks before they start.',
  },
  {
    title: 'Real-Time Results',
    desc: 'Verification completes in under 30 seconds. No manual review queues, no batch processing. Instant pass/fail decisions.',
  },
  {
    title: 'Simple API Integration',
    desc: 'RESTful API with webhook callbacks. Integrate into your onboarding flow in hours, not months. SDKs for web and mobile.',
  },
  {
    title: 'Background Screening Add-On',
    desc: 'Combine ID verification with sanctions, PEP, and criminal screening against 1.2M+ entities — all in one API call.',
  },
];

const BENEFITS = [
  'Verify users in under 30 seconds — no manual review',
  'Reduce fraud with AI-powered liveness detection and facial matching',
  'Global coverage — 200+ countries, all major ID document types',
  'Improve onboarding conversion by removing friction from KYC',
  'Stay compliant with KYC/AML regulations across jurisdictions',
  'Biometric data encrypted in transit, deleted after verification',
  'Catch deepfakes, synthetic IDs, and document tampering',
];

const STEPS = [
  {
    title: 'Upload ID',
    desc: 'User captures or uploads a photo of their government-issued ID, passport, or driver\'s license. OCR extracts data automatically.',
  },
  {
    title: 'Take a Selfie',
    desc: 'A quick selfie is captured with liveness detection running in real-time. No app download required — works in any browser.',
  },
  {
    title: 'Instant Verification',
    desc: 'AI matches the selfie to the ID photo, checks document authenticity, and returns a pass/fail result — all in under 30 seconds.',
  },
];

const USE_CASES = [
  { title: 'Digital Banks', desc: 'Onboard account holders instantly with compliant KYC that doesn\'t require branch visits.' },
  { title: 'Crypto Platforms', desc: 'Meet regulatory requirements for crypto exchanges while keeping sign-up fast and frictionless.' },
  { title: 'Lending Apps', desc: 'Verify borrower identity before disbursement to reduce fraud and meet KYC requirements.' },
  { title: 'Payment Platforms', desc: 'Verify merchants and high-value users to reduce chargebacks and payment fraud.' },
  { title: 'Investment Apps', desc: 'Comply with SEC and FINRA requirements for brokerage account opening and suitability.' },
];

const SECURITY = [
  { title: 'End-to-End Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). API communications secured with HMAC-signed webhooks.' },
  { title: 'Biometric Verification', desc: 'AI-powered facial matching with liveness detection prevents spoofing, deepfakes, and synthetic identity fraud.' },
  { title: 'Secure Data Handling', desc: 'Biometric data is encrypted during verification and deleted immediately after. We never store facial data on our servers.' },
  { title: 'Regulatory Compliance', desc: 'KYC/AML compliant across jurisdictions. GDPR-ready data handling with consent management and audit trails.' },
];

export default function FintechKycPage() {
  return (
    <>
      <Navbar />

      <PageHero
        badge="Fintech KYC"
        title="Fast, Compliant KYC Verification for Fintech Companies"
        subtitle="Verify customer identities in under 30 seconds using ID + selfie — reduce fraud, meet compliance, and onboard users faster."
        primaryCta={{ label: 'Book a Demo', href: '/contact?source=fintech-kyc&action=demo' }}
        secondaryCta={{ label: 'See ID verification', href: '/credo-id-verification' }}
        aside={<VerificationRecord animate className="mx-auto max-w-[30rem] lg:mx-0 lg:ml-auto" />}
      />

      <StatsBar
        stats={[
          { value: '<30s', label: 'Verification Time' },
          { value: '200+', label: 'Countries Supported' },
          { value: '99.9%', label: 'Matching Accuracy' },
          { value: 'API', label: 'REST and webhooks' },
        ]}
      />

      {/* Problem Section */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="KYC Is Slowing You Down — and Letting Fraud In"
          body={<p>Traditional KYC processes weren&apos;t built for modern fintech. Here&apos;s what&apos;s holding your growth back.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-4">
            {PAIN_POINTS.map((p, i) => (
              <li key={p.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Solution Section */}
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <div className="mb-12 max-w-2xl px-6 md:mb-16 md:px-8">
          <p className="text-sm text-tertiary">The Solution</p>
          <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">All-in-One Identity Verification Built for Fintech</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
            Everything you need to verify customers, prevent fraud, and stay compliant — through a single API.
          </p>
        </div>
        <FeatureCells features={FEATURES} />
      </Section>

      {/* Benefits Section */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title={`Why Fintech Teams Choose ${BRAND.name}`}
          body={<p>Purpose-built for high-growth fintech companies that need speed, accuracy, and compliance.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2">
            {BENEFITS.map((text) => (
              <li key={text} className="flex items-start gap-3 px-6 py-6 md:px-8">
                <CheckGlyph className="mt-1" />
                <span className="text-[0.9375rem] leading-[1.65] text-foreground">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How It Works */}
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <SectionHeader title="How It Works" body={<p>Three steps. Under 30 seconds. No app download required.</p>} />
        <div className="cells-clip border-t border-border">
          <ol className="cells md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Use Cases */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Built for Every Fintech Vertical"
          body={<p>From neobanks to crypto exchanges, our KYC verification adapts to your compliance requirements.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc) => (
              <li key={uc.title} className="px-6 py-8 md:px-8 md:py-10">
                <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em]">{uc.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{uc.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Trust & Security */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <p className="text-sm text-tertiary">Security & Compliance</p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Built with Security and Compliance in Mind</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              When you handle identity data, security isn&apos;t a feature — it&apos;s a requirement. {BRAND.registeredName}{' '}is designed from the ground up to protect your users&apos; most sensitive information.
            </p>
            <ul className="mt-10 max-w-xl border-y border-border">
              {SECURITY.map((item) => (
                <li key={item.title} className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <CheckGlyph className="mt-0.5" />
                  <div>
                    <h3 className="text-base leading-snug tracking-[-0.015em]">{item.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.65] text-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center border-t border-border bg-surface-elevated px-6 py-16 md:px-8 md:py-20 lg:col-span-5 lg:border-t-0">
            <h3 className="text-xl leading-tight tracking-[-0.03em]">Enterprise-Grade Security</h3>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">
              Bank-level encryption. Zero biometric data retention. Audit-ready compliance controls.
            </p>
            <dl className="mt-8 border-y border-border">
              {[
                { k: 'AES-256', v: 'Encryption at Rest' },
                { k: 'SOC 2', v: 'Type II Compliant' },
                { k: 'GDPR', v: 'Ready' },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-border py-4 last:border-b-0">
                  <dt className="font-mono text-sm text-foreground-highlight">{row.k}</dt>
                  <dd className="text-right text-sm text-tertiary">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Start Verifying Your Users Today"
        subtitle="ID scan, selfie, and watchlist screening in one workflow. Volume and a security review are scoped with your team."
        primaryLabel="Book a Demo"
        primaryHref="/contact?source=fintech-kyc&action=demo"
        secondaryLabel="See pricing"
        secondaryHref="/products"
      />

      <Footer />
    </>
  );
}
