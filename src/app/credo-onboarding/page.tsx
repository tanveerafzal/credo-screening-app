import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import { PageHero } from '@/components/marketing/PageHero';
import Link from 'next/link';
import { Action, ArrowGlyph, CheckGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
import { PixelIcon, type PixelIconName } from '@/components/site/PixelIcon';
import { VerificationRecord } from '@/components/site/VerificationRecord';
import { TrustSection } from '@/components/site/TrustSection';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';
import { PRICING_FAQ } from '@/lib/pricing';

export const metadata: Metadata = pageMetadata({
  title: 'Digital Onboarding — KYC & AML',
  description:
    'Remote digital onboarding with ID verification, selfie liveness, AML screening, and identity-verified signatures. Complete KYC in under 30 seconds.',
  path: '/credo-onboarding',
  keywords: ['digital onboarding', 'KYC onboarding', 'remote identity verification', 'AML onboarding'],
});

const FLOW = [
  { label: 'ID Document Scan', detail: 'OCR + MRZ extraction', done: true },
  { label: 'Selfie + Liveness', detail: 'Facial match in real time', done: true },
  { label: 'Watchlist Screening', detail: 'OFAC, PEP, sanctions', done: true },
  { label: 'Trusted Signatures', detail: 'Optional e-sign step', done: false },
];

const BENEFITS = [
  {
    title: 'Onboarding in Under 30 Seconds',
    desc: 'Verify customer identity remotely — ID scan, selfie, and compliance checks without slowing down signup.',
    stat: '<30s',
    statLabel: 'Average completion time',
  },
  {
    title: 'Lower Operational Costs',
    desc: 'Replace manual KYC reviews and paper-based checks with automated verification and screening.',
    stat: '60%',
    statLabel: 'Typical cost reduction',
  },
  {
    title: 'Fraud & Spoofing Prevention',
    desc: 'Liveness detection, document tampering checks, and watchlist screening catch fraud before account opening.',
    stat: '99.9%',
    statLabel: 'Platform uptime SLA',
  },
  {
    title: 'Faster Time to Revenue',
    desc: 'Approve compliant customers in minutes instead of days. Reduce drop-off during signup flows.',
    stat: '40%',
    statLabel: 'Faster onboarding cycles',
  },
  {
    title: 'Higher Pass Rates',
    desc: 'Optimized capture flows and smart matching reduce false rejects while maintaining compliance rigor.',
    stat: '200+',
    statLabel: 'Countries supported',
  },
  {
    title: 'Flexible Deployment',
    desc: 'Embed via SDK, REST API, or partner dashboard. Works in web, mobile browser, and native apps.',
    stat: 'API',
    statLabel: 'SDK & REST integration',
  },
  {
    title: 'Multi-Platform Ready',
    desc: 'No app download required. Users complete onboarding on any device with a camera.',
    stat: '0',
    statLabel: 'App installs required',
  },
  {
    title: 'Regulatory Compliance',
    desc: 'Screen against OFAC, EU, UN, PEP, and criminal lists. Build audit-ready onboarding workflows.',
    stat: '1.2M+',
    statLabel: 'Entities screened against',
  },
];

const STEPS = [
  {
    title: 'Receive Secure Link',
    desc: 'The business sends the customer a secure onboarding link by email or SMS. They open it in any browser — no app download, no account setup.',
  },
  {
    title: 'Document Capture',
    desc: 'The user scans a government ID, passport, or driver\'s license. OCR and MRZ extraction pull data in real time — no manual entry.',
  },
  {
    title: 'Identity Verification',
    desc: 'A quick selfie is matched against the ID photo with passive liveness detection. Confirm the person is real and present.',
  },
  {
    title: 'Compliance & Fraud Checks',
    desc: 'Automatically screen against sanctions, PEP, and criminal watchlists. Catch deepfakes, document tampering, and high-risk matches.',
  },
  {
    title: 'Verified Data Delivered',
    desc: 'Once every check passes, clean, structured, verified customer data — identity, document, and screening results — is delivered back to the business instantly via dashboard, API, and webhook.',
  },
];

const DIFFERENTIATORS = [
  { title: 'Passive Liveness Detection', desc: 'Confirm a live person without intrusive challenges.' },
  { title: 'AML & Watchlist Screening', desc: 'OFAC, EU, UN, PEP, and 80+ global sources in one flow.' },
  { title: 'Real-Time OCR & MRZ', desc: 'Instant data extraction from IDs and passports.' },
  { title: 'Auto Document Capture', desc: 'Guided capture with quality checks before submission.' },
  { title: 'Fraud & Tamper Detection', desc: 'Catch spoofing, expired IDs, and altered documents.' },
  { title: 'Trusted Signatures', desc: 'Identity-verified e-signatures built into the same workflow.' },
  { title: 'API & Webhook Integration', desc: 'Embed onboarding into any product with REST API and callbacks.' },
  { title: '200+ Countries', desc: 'Support global customer bases without regional silos.' },
];

const PRODUCTS: Array<{ icon: PixelIconName; label: string; href: string }> = [
  { icon: 'id', label: 'ID Verification', href: '/credo-id-verification' },
  { icon: 'search', label: 'Screening', href: '/screening' },
  { icon: 'pen', label: 'Trusted Signatures', href: '/credo-trusted-signatures' },
];

const INDUSTRIES = [
  {
    title: 'Banking',
    desc: 'Verify new account holders remotely while meeting KYC and AML requirements.',
    href: '/industries/financial-institutions',
  },
  {
    title: 'Fintech',
    desc: 'Onboard users in seconds with API-first identity and compliance checks.',
    href: '/industries/fintech',
  },
  {
    title: 'Crypto',
    desc: 'Verify wallet holders and exchange users before enabling transactions.',
    href: '/industries/crypto',
  },
  {
    title: 'Insurance',
    desc: 'Confirm policyholder identity and screen beneficiaries at issuance.',
    href: '/industries/insurance',
  },
  {
    title: 'Gaming & Gambling',
    desc: 'Age-verify players and prevent fraudulent account creation.',
    href: '/industries/gaming-gambling',
  },
  {
    title: 'Professional Services',
    desc: 'Onboard clients and contractors with verified identity before engagement.',
    href: '/industries/professional-services',
  },
  {
    title: 'Real Estate',
    desc: 'Verify tenants, buyers, and sellers before lease or closing.',
    href: '/industries/real-estate',
  },
  {
    title: 'Healthcare',
    desc: 'Secure patient onboarding with identity verification and consent capture.',
    href: '/industries/insurtech',
  },
];

const FAQS = [
  { q: 'What is digital onboarding?', a: 'Digital onboarding lets you verify a customer\'s identity remotely — typically with an ID scan, selfie, and automated compliance checks — without in-person visits or manual document review.' },
  { q: 'How long does onboarding take?', a: 'Most users complete ID verification in under 30 seconds. Combined with watchlist screening, the full compliance flow typically finishes in under a minute.' },
  { q: 'Can I combine ID verification and AML screening?', a: 'Yes. Run identity verification and sanctions/PEP screening in a single API workflow. Verify who someone is and whether they appear on watchlists at the same time.' },
  { q: 'Do users need to download an app?', a: 'No. Onboarding works in any modern web browser on desktop or mobile. Embed it in your signup flow via our SDK or API.' },
  { q: 'Is there a free trial?', a: `${PRICING_FAQ.freeTier} No credit card required to get started.` },
  { q: 'How do I integrate onboarding into my product?', a: 'Sign up for a free account, get your API key, and integrate via REST API or embed our verification SDK. Webhook callbacks deliver results asynchronously.' },
];

function OnboardingFlow() {
  return (
    <figure className="m-0 mx-auto max-w-[30rem] border border-border-emphasized bg-background lg:mx-0 lg:ml-auto">
      <figcaption className="border-b border-border px-5 py-4 font-mono text-xs text-tertiary">Complete Onboarding Flow</figcaption>
      <ol>
        {FLOW.map((item, i) => (
          <li key={item.label} className="flex items-center gap-4 border-b border-border px-5 py-4">
            <Index n={i + 1} />
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-tertiary">{item.detail}</p>
            </div>
            {item.done ? <CheckGlyph /> : null}
          </li>
        ))}
      </ol>
      <dl className="flex flex-col bg-surface-elevated px-5 py-6">
        <dt className="order-2 mt-2 font-mono text-xs text-tertiary">End-to-end verification time</dt>
        <dd className="order-1 text-4xl font-medium tracking-[-0.045em] text-foreground-highlight">&lt;30s</dd>
      </dl>
    </figure>
  );
}

export default function OnboardingPage() {
  return (
    <>
      <Navbar />

      <PageHero
        badge="Digital Onboarding"
        title={`What is ${BRAND.name} Digital Onboarding?`}
        subtitle={
          <>
            <p>Our solution lets you verify customer identity remotely — capturing document data automatically, matching a selfie with passive liveness, and screening against AML, PEP, and sanctions lists in real time.</p>
            <p className="text-foreground">No app downloads. No manual review queues. Onboard compliant customers in seconds, not days.</p>
          </>
        }
        primaryCta={{ label: 'Start Free', href: '/register' }}
        secondaryCta={{ label: 'Contact Sales', href: '/contact?plan=corporate' }}
        aside={<OnboardingFlow />}
      />

      {/* Benefits */}
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <div className="mb-12 max-w-2xl px-6 md:mb-16 md:px-8">
          <p className="text-sm text-tertiary">Benefits of Digital Onboarding</p>
          <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Maximize Results with {BRAND.name}</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
            Faster signups, lower costs, and stronger compliance — without adding friction to your customer journey.
          </p>
        </div>
        <div className="cells-clip border-t border-border bg-background">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <li key={b.title} className="flex flex-col px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{b.title}</h3>
                <p className="mt-2.5 flex-1 text-[0.9375rem] leading-[1.7] text-muted">{b.desc}</p>
                <dl className="mt-8 flex flex-col border-t border-border pt-6">
                  <dt className="order-2 mt-2 font-mono text-xs text-tertiary">{b.statLabel}</dt>
                  <dd className="order-1 text-4xl font-medium tracking-[-0.045em] text-foreground-highlight">{b.stat}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Step Process */}
      <section id="how-it-works" className="scroll-mt-16 border-t border-border px-0 md:px-12">
        <Container className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">Onboarding in {STEPS.length} Simple Steps</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              From the invite link to verified data in your systems — a frictionless flow your
              users complete in the browser, with no app install and no paperwork.
            </p>
            <ol className="mt-10 max-w-xl border-y border-border">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-border py-5 last:border-b-0">
                  <Index n={i + 1} className="mt-1" />
                  <div>
                    <h3 className="text-base leading-snug tracking-[-0.015em]">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.65] text-muted">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t border-border bg-surface-elevated px-6 py-16 md:px-8 md:py-20 lg:col-span-5 lg:border-t-0">
            <div className="lg:sticky lg:top-28">
              <VerificationRecord showTrail className="mx-auto max-w-[30rem]" />
            </div>
          </div>
        </Container>
      </section>

      {/* Differentiating Features */}
      <Section innerClassName="pb-0 md:pb-0">
        <div className="mb-12 max-w-2xl px-6 md:mb-16 md:px-8">
          <p className="text-sm text-tertiary">Why Choose Us</p>
          <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Differentiating Features</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
            Everything you need for secure, compliant digital onboarding in one platform.
          </p>
        </div>
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((f, i) => (
              <li key={f.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{f.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{f.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Full Workflow CTA */}
      <section className="border-t border-border bg-surface-elevated px-0 md:px-12">
        <Container className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">One Platform for Complete Onboarding</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              Verify identity, screen against watchlists, and collect trusted signatures —
              all through a single API. Build the onboarding flow your compliance team and users will love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Action href="/register" arrow>Get Started Free</Action>
              <Action href="/docs" variant="secondary">View API Docs</Action>
            </div>
          </div>
          <ul className="border-t border-border lg:col-span-5 lg:border-l lg:border-t-0">
            {PRODUCTS.map((item) => (
              <li key={item.label} className="border-b border-border last:border-b-0 lg:h-1/3">
                <Link
                  href={item.href}
                  className="group flex h-full items-center gap-4 bg-background px-6 py-7 transition-colors hover:bg-foreground/[0.02] md:px-8"
                >
                  <PixelIcon name={item.icon} size={28} />
                  <span className="flex-1 font-medium tracking-[-0.015em] text-foreground-highlight group-hover:underline group-hover:underline-offset-4">{item.label}</span>
                  <ArrowGlyph className="text-tertiary transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Industries */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Sectors & Use Cases"
          body={<p>Digital onboarding for regulated industries and high-growth platforms worldwide.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind) => (
              <li key={ind.title}>
                <Link href={ind.href} className="group flex h-full flex-col px-6 py-8 transition-colors hover:bg-foreground/[0.02] md:px-8">
                  <h3 className="text-base leading-snug tracking-[-0.015em] group-hover:underline group-hover:underline-offset-4">{ind.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{ind.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-ink">
                    Learn more <ArrowGlyph className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <TrustSection />
      <FAQ items={FAQS} compactTop />
      <CTABanner title="Ready to streamline onboarding?" />

      <Footer />
    </>
  );
}
