/* eslint-disable @next/next/no-img-element */
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import { PageHero } from '@/components/marketing/PageHero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { Action, CheckGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
import { VerificationRecord } from '@/components/site/VerificationRecord';
import { TrustSection } from '@/components/site/TrustSection';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'ID Verification — KYC in Under 30 Seconds',
  description:
    'Enterprise identity verification with government ID scan, selfie match, and liveness detection. 200+ countries, privacy-first, REST API integration.',
  path: '/credo-id-verification',
  keywords: ['ID verification', 'KYC verification', 'identity verification API', 'liveness detection'],
});

const STEPS = [
  {
    title: 'Scan Your ID',
    desc: 'Point your camera at any government-issued ID, driver\'s license, or passport. Our OCR and MRZ scanning extracts data instantly.',
  },
  {
    title: 'Take a Selfie',
    desc: 'Snap a quick selfie. Our facial matching technology compares it to your ID photo in real-time with liveness detection.',
  },
  {
    title: 'Verified',
    desc: 'Identity confirmed in seconds. No manual review, no waiting. Results delivered instantly to your application via API or webhook.',
  },
];

const DOCUMENTS = [
  {
    title: 'Government-Issued IDs',
    desc: 'State and national ID cards from 200+ countries.',
  },
  {
    title: 'Driver\'s License',
    desc: 'US, Canadian, and international licenses supported.',
  },
  {
    title: 'Passport',
    desc: 'MRZ scanning for instant data extraction from any passport.',
  },
];

const BENEFITS = [
  {
    title: 'Lightning Fast',
    desc: 'The whole process takes seconds. No waiting around for manual document checks or third-party verifications.',
    stat: '<30s',
    statLabel: 'Average verification time',
  },
  {
    title: 'Top-Notch Security',
    desc: 'Facial matching and liveness detection ensure the person behind the screen is who they say they are.',
    stat: '180+',
    statLabel: 'Countries covered',
  },
  {
    title: 'Simple Process',
    desc: 'Scan your ID and snap a selfie — that\'s it. No app downloads, no document uploads, no human review delays.',
    stat: '2',
    statLabel: 'Photos to verify',
  },
];

const SECURITY_POINTS = [
  { title: 'Facial Matching', desc: 'We match the selfie to the ID photo in real-time. Same face? You\'re in.' },
  { title: 'Liveness Detection', desc: 'AI confirms a live person is present — not a photo, video, or mask.' },
  { title: 'Encrypted & Deleted', desc: 'Biometric data is encrypted during verification and deleted immediately after. Never stored.' },
  { title: 'Fraud Detection', desc: 'Built-in fraud detection catches tampered documents, expired IDs, and spoofing attempts.' },
];

const TESTIMONIALS = [
  {
    quote: 'Screening used to take days. Now applicants verify in seconds and move straight to lease signing.',
    role: 'Property Management',
  },
  {
    quote: 'Verification is instant and completely frictionless. Our onboarding conversion jumped significantly.',
    role: 'Finance Platform',
  },
  {
    quote: 'We verify homeowners instantly without adding friction to the lending process.',
    role: 'Home Equity Lender',
  },
  {
    quote: 'Fraud attempts are down significantly since we added identity verification to our account opening flow.',
    role: 'Credit Union',
  },
  {
    quote: 'Made identity verification seamless without adding steps. Our users barely notice it\'s there.',
    role: 'Insurtech',
  },
  {
    quote: 'Verifying contractor identity used to be a nightmare. Now it\'s same-day onboarding.',
    role: 'Staffing Platform',
  },
];

const FAQS = [
  { q: 'What documents are supported?', a: 'Government-issued IDs, driver\'s licenses, and passports from 200+ countries. MRZ scanning for instant passport data extraction.' },
  { q: 'How fast is verification?', a: 'Most users complete the entire process in under 30 seconds. No waiting for manual review.' },
  { q: 'Is biometric data stored?', a: 'No. We encrypt biometric data during verification and delete it immediately after. Nothing is stored on our servers.' },
  { q: 'Do users need to download an app?', a: 'No. Verification works directly in any web browser on any device with a camera.' },
  { q: 'How does liveness detection work?', a: 'Our AI analyzes the selfie in real-time to confirm a live person is present — not a photo, video, or mask. This prevents spoofing and identity fraud.' },
  { q: 'Can I combine ID verification with screening?', a: 'Yes. Run ID verification and sanctions/PEP screening together in a single workflow via our API.' },
];

export default function IDVerificationPage() {
  return (
    <>
      <Navbar />

      <PageHero
        badge="Identity Verification"
        title="The Fastest Way to Verify Real People"
        subtitle={
          <p>
            ID scan. Selfie. Done. Enterprise-grade identity verification your users complete in{' '}
            <strong className="font-medium text-foreground-highlight">under 30 seconds</strong> — no app downloads, no manual review.
          </p>
        }
        primaryCta={{ label: 'Get Started', href: '/contact?plan=corporate' }}
        secondaryCta={{ label: 'See How It Works', href: '#how-it-works' }}
        aside={<VerificationRecord animate className="mx-auto max-w-[30rem] lg:mx-0 lg:ml-auto" />}
      />

      <StatsBar
        stats={[
          { value: '<30s', label: 'Verification Time' },
          { value: '200+', label: 'Countries Supported' },
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '0', label: 'Biometric Data Stored' },
        ]}
      />

      {/* Benefits */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Why Choose Credo for ID Verification?"
          body={<p>Verify identities without the friction. Your users won&apos;t hate it.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <li key={b.title} className="flex flex-col px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{b.title}</h3>
                <p className="mt-2.5 max-w-sm flex-1 text-[0.9375rem] leading-[1.7] text-muted">{b.desc}</p>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-4xl font-medium tracking-[-0.045em] text-foreground-highlight">{b.stat}</p>
                  <p className="mt-2 font-mono text-xs text-tertiary">{b.statLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" tone="tint" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="How It Works"
          body={<p>Three simple steps. No app downloads. No manual review.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ol className="cells md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{step.title}</h3>
                <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Supported Documents */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Supported Documents"
          body={<p>Accept identity documents from over 200 countries worldwide.</p>}
        />
        <div className="grid grid-cols-1 border-t border-border lg:grid-cols-12">
          <ul className="lg:col-span-5 lg:border-r lg:border-border">
            {DOCUMENTS.map((doc, i) => (
              <li key={doc.title} className="flex gap-5 border-b border-border px-6 py-7 md:px-8 lg:last:border-b-0">
                <Index n={i + 1} className="mt-1" />
                <div>
                  <h3 className="text-base leading-snug tracking-[-0.015em]">{doc.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-[1.65] text-muted">{doc.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <figure className="m-0 bg-surface-elevated px-6 py-10 md:px-8 md:py-12 lg:col-span-7">
            <img
              src="/specimen/on-licence-front.webp"
              alt="Specimen Ontario driver's licence, front"
              width={1400}
              height={883}
              loading="lazy"
              className="mx-auto w-full max-w-[34rem] rounded-lg border border-border"
            />
            <figcaption className="mx-auto mt-4 max-w-[34rem] text-sm text-tertiary">Specimen document. Fictional person.</figcaption>
          </figure>
        </div>
      </Section>

      {/* Security Deep-Dive */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <p className="text-sm text-tertiary">Privacy &amp; Security</p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">You&apos;re You. We Make Sure of It.</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              180+ countries — no fraud, no fakes, no second-guessing. We tell you exactly what data we collect,
              how we use it, and who sees it. No surprises. No fine print.
            </p>
            <ul className="mt-10 max-w-xl border-y border-border">
              {SECURITY_POINTS.map((item) => (
                <li key={item.title} className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <CheckGlyph className="mt-1" />
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
              Your users&apos; data is protected with bank-level encryption. We verify and delete — nothing is stored on our servers.
            </p>
            <dl className="mt-10 flex max-w-sm flex-col border-t border-border pt-8">
              <dt className="order-2 mt-2 font-mono text-xs text-tertiary">Encryption</dt>
              <dd className="order-1 text-4xl font-medium tracking-[-0.045em] text-foreground-highlight">AES-256</dd>
            </dl>
          </div>
        </Container>
      </section>

      {/* Verify + Screen Together */}
      <Section tone="tint">
        <div className="max-w-2xl px-6 md:px-8">
          <h2 className="text-2xl leading-tight sm:text-[2rem]">Verify Identity + Screen Against Watchlists</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
            Combine ID verification with sanctions, PEP, and criminal screening in a single workflow.
            Verify who someone is <em>and</em>{' '}check if they&apos;re on a watchlist — all through one API.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href="/screening" arrow>Try Free Screening</Action>
            <Action href="/contact?plan=corporate" variant="secondary">Contact Sales</Action>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Trusted by Businesses Worldwide"
          body={<p>From startups to enterprises, businesses trust Credo for fast, reliable identity verification.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <li key={t.role} className="px-6 py-8 md:px-8 md:py-10">
                <figure className="m-0 flex h-full flex-col">
                  <blockquote className="flex-1 text-[1.0625rem] leading-[1.6] tracking-[-0.01em] text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-tertiary">{t.role}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SolutionsGrid currentSlug="id-verification" />
      <TrustSection />
      <FAQ items={FAQS} />
      <CTABanner />

      <Footer />
    </>
  );
}
