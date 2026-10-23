import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/marketing/PageHero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureCells } from '@/components/marketing/FeatureGrid';
import { CTABanner } from '@/components/marketing/CTABanner';
import { CheckGlyph, Index, Section, SectionHeader } from '@/components/site/Canvas';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Staffing Identity Verification',
  description:
    'Verify candidate identity for staffing and HR teams. Stop resume fraud with ID scan, selfie match, and optional watchlist screening.',
  path: '/staffing-identity-check',
  keywords: ['staffing background check', 'candidate identity verification', 'hiring identity check'],
});

const PAIN_POINTS = [
  {
    title: 'Fake Identities in Remote Hiring',
    desc: 'Remote hiring has made it easier than ever for candidates to use fake or stolen identities. Without in-person verification, fraudulent applicants slip through.',
  },
  {
    title: 'Resume Fraud',
    desc: 'Fabricated credentials, inflated job titles, and fake references are on the rise. Traditional screening catches some — but not the identity behind the resume.',
  },
  {
    title: 'Time Wasted on Unverified Applicants',
    desc: 'Recruiters spend hours interviewing, onboarding, and placing candidates who turn out to be unverifiable. That\'s lost time and lost revenue.',
  },
  {
    title: 'Risk to Company Reputation',
    desc: 'Placing a fraudulent candidate damages trust with your clients. One bad hire can cost a staffing firm its most valuable relationships.',
  },
];

const FEATURES = [
  {
    title: 'Government ID Verification',
    desc: 'Verify government-issued IDs, passports, and driver\'s licenses from 200+ countries with OCR and MRZ data extraction.',
  },
  {
    title: 'Selfie + Face Match',
    desc: 'AI-powered facial biometric matching compares the candidate\'s selfie to their ID photo in real-time with high accuracy.',
  },
  {
    title: 'Liveness Detection',
    desc: 'Confirms the candidate is a real, live person — not a photo, video, or deepfake. Blocks identity spoofing attempts.',
  },
  {
    title: 'Instant Verification Results',
    desc: 'Results in under 30 seconds. No manual review queues. Candidates are verified before they even finish the application.',
  },
  {
    title: 'Optional Watchlist Screening',
    desc: 'Add sanctions, PEP, and adverse media screening for higher-risk placements — in the same verification workflow.',
  },
  {
    title: 'Easy Integration into Hiring Workflows',
    desc: 'REST API and webhook callbacks. Embed verification into your ATS, onboarding portal, or candidate intake process.',
  },
];

const BENEFITS = [
  'Verify candidate identity before interviews begin',
  'Detect fake applicants instantly with AI-powered matching',
  'Add watchlist screening for higher-risk placements (optional)',
  'Save recruiter time — no more chasing unverifiable candidates',
  'Increase client confidence with verified, trusted placements',
  'Fast and simple onboarding — candidates verify in under 30 seconds',
];

const STEPS = [
  {
    title: 'Candidate Uploads ID',
    desc: 'The candidate captures or uploads a photo of their government-issued ID, passport, or driver\'s license. OCR extracts data automatically.',
  },
  {
    title: 'Takes a Selfie',
    desc: 'A quick selfie is captured with liveness detection running in real-time. No app download required — works in any browser.',
  },
  {
    title: 'Instant Verification Result',
    desc: 'Identity verified and liveness confirmed — all in a single workflow. Results delivered via API or webhook.',
  },
];

const USE_CASES = [
  { title: 'Recruitment Agencies', desc: 'Verify every candidate before presenting them to clients. Build trust with verified placements.' },
  { title: 'Staffing Firms', desc: 'Reduce fraud risk across high-volume temporary and permanent placements.' },
  { title: 'Remote Hiring Teams', desc: 'Verify candidates you\'ll never meet in person. Essential for distributed and global teams.' },
  { title: 'HR Departments', desc: 'Add identity verification to your internal hiring process for an extra layer of security.' },
  { title: 'High-Trust Roles', desc: 'Roles involving financial responsibility, accounting, or executive authority benefit from verified identity before placement.' },
];

const SECURITY = [
  { title: 'Data Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Biometric data deleted after verification.' },
  { title: 'Secure Processing', desc: 'SOC 2 Type II compliant infrastructure. Bank-level security for identity data.' },
  { title: 'Candidate Consent', desc: 'Clear consent capture before verification. Full audit trail for every request.' },
  { title: 'Regulatory Compliance', desc: 'GDPR-ready. Meets data protection standards across jurisdictions.' },
];

function NumberedCells({ items, className }: { items: Array<{ title: string; desc: string }>; className: string }) {
  return (
    <div className="cells-clip border-t border-border">
      <ul className={`cells ${className}`}>
        {items.map((item, i) => (
          <li key={item.title} className="px-6 py-8 md:px-8 md:py-10">
            <Index n={i + 1} />
            <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{item.title}</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StaffingIdentityCheckPage() {
  return (
    <>
      <Navbar />

      <PageHero
        badge="Built for Staffing & Recruitment"
        title="Verify Candidate Identity Before You Hire"
        subtitle="Prevent fake applicants and reduce hiring risk with fast ID verification and optional watchlist screening."
        primaryCta={{ label: 'Book a Demo', href: '/contact?source=staffing&action=demo' }}
        secondaryCta={{ label: 'Start Free Trial', href: '/register' }}
        note="No credit card required. First month free."
      />

      <StatsBar
        stats={[
          { value: '<30s', label: 'Verification Time' },
          { value: '200+', label: 'Countries Supported' },
          { value: '$0.99', label: 'Starting from / ID check' },
          { value: '80+', label: 'Watchlist Sources' },
        ]}
      />

      {/* Problem Section */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Fake Candidates and Hidden Risks Are Increasing"
          body={<p>The staffing industry faces growing threats from identity fraud, resume fabrication, and unverified applicants.</p>}
        />
        <NumberedCells items={PAIN_POINTS} className="sm:grid-cols-2 lg:grid-cols-4" />
      </Section>

      {/* Solution Section */}
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <div className="mb-12 max-w-2xl px-6 md:mb-16 md:px-8">
          <p className="text-sm text-tertiary">The Solution</p>
          <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Complete Candidate Verification for Staffing Teams</h2>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
            Identity verification and optional watchlist screening in a single workflow — built for recruiters who need speed and trust.
          </p>
        </div>
        <FeatureCells features={FEATURES} />
      </Section>

      {/* Benefits Section */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title={`Why Staffing Teams Choose ${BRAND.name}`}
          body={<p>Reduce hiring risk, save recruiter time, and build client trust with verified candidates.</p>}
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
        <SectionHeader title="How It Works" body={<p>Three simple steps. Identity verified in seconds.</p>} />
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
          title="Who This Is For"
          body={<p>From recruitment agencies to in-house HR teams — verify every candidate before they start.</p>}
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
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Secure, Compliant, and Privacy-First"
          body={<p>Candidate data is handled with the highest security standards. Every verification is encrypted, consent-tracked, and audit-ready.</p>}
        />
        <NumberedCells items={SECURITY} className="sm:grid-cols-2 lg:grid-cols-4" />
      </Section>

      <CTABanner
        title="Make Every Hire a Verified and Trusted One"
        subtitle="Stop guessing. Start verifying. Identity checks in seconds for every candidate you place."
        primaryLabel="Book a Demo"
        primaryHref="/contact?source=staffing&action=demo"
        secondaryLabel="Get Started"
        secondaryHref="/register"
      />

      <Footer />
    </>
  );
}
