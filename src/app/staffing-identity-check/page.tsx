import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  ArrowRight, Shield, ScanFace, Camera, CheckCircle, Zap, Globe,
  Lock, Users, AlertTriangle, Clock, UserX, ShieldCheck,
  Fingerprint, Smartphone, Building2, Briefcase, FileText,
  BadgeCheck, Eye, Scale, UserCheck, Heart, Search
} from 'lucide-react';
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
    icon: UserX,
    title: 'Fake Identities in Remote Hiring',
    desc: 'Remote hiring has made it easier than ever for candidates to use fake or stolen identities. Without in-person verification, fraudulent applicants slip through.',
  },
  {
    icon: FileText,
    title: 'Resume Fraud',
    desc: 'Fabricated credentials, inflated job titles, and fake references are on the rise. Traditional screening catches some — but not the identity behind the resume.',
  },
  {
    icon: Clock,
    title: 'Time Wasted on Unverified Applicants',
    desc: 'Recruiters spend hours interviewing, onboarding, and placing candidates who turn out to be unverifiable. That\'s lost time and lost revenue.',
  },
  {
    icon: AlertTriangle,
    title: 'Risk to Company Reputation',
    desc: 'Placing a fraudulent candidate damages trust with your clients. One bad hire can cost a staffing firm its most valuable relationships.',
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: 'Government ID Verification',
    desc: 'Verify government-issued IDs, passports, and driver\'s licenses from 200+ countries with OCR and MRZ data extraction.',
  },
  {
    icon: ScanFace,
    title: 'Selfie + Face Match',
    desc: 'AI-powered facial biometric matching compares the candidate\'s selfie to their ID photo in real-time with high accuracy.',
  },
  {
    icon: Eye,
    title: 'Liveness Detection',
    desc: 'Confirms the candidate is a real, live person — not a photo, video, or deepfake. Blocks identity spoofing attempts.',
  },
  {
    icon: Zap,
    title: 'Instant Verification Results',
    desc: 'Results in under 30 seconds. No manual review queues. Candidates are verified before they even finish the application.',
  },
  {
    icon: Search,
    title: 'Optional Watchlist Screening',
    desc: 'Add sanctions, PEP, and adverse media screening for higher-risk placements — in the same verification workflow.',
  },
  {
    icon: Briefcase,
    title: 'Easy Integration into Hiring Workflows',
    desc: 'REST API and webhook callbacks. Embed verification into your ATS, onboarding portal, or candidate intake process.',
  },
];

const BENEFITS = [
  { icon: BadgeCheck, text: 'Verify candidate identity before interviews begin' },
  { icon: UserX, text: 'Detect fake applicants instantly with AI-powered matching' },
  { icon: Search, text: 'Add watchlist screening for higher-risk placements (optional)' },
  { icon: Clock, text: 'Save recruiter time — no more chasing unverifiable candidates' },
  { icon: Heart, text: 'Increase client confidence with verified, trusted placements' },
  { icon: Zap, text: 'Fast and simple onboarding — candidates verify in under 30 seconds' },
];

const STEPS = [
  {
    step: '01',
    icon: Smartphone,
    title: 'Candidate Uploads ID',
    desc: 'The candidate captures or uploads a photo of their government-issued ID, passport, or driver\'s license. OCR extracts data automatically.',
  },
  {
    step: '02',
    icon: Camera,
    title: 'Takes a Selfie',
    desc: 'A quick selfie is captured with liveness detection running in real-time. No app download required — works in any browser.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Instant Verification Result',
    desc: 'Identity verified and liveness confirmed — all in a single workflow. Results delivered via API or webhook.',
  },
];

const USE_CASES = [
  { icon: Users, title: 'Recruitment Agencies', desc: 'Verify every candidate before presenting them to clients. Build trust with verified placements.' },
  { icon: Building2, title: 'Staffing Firms', desc: 'Reduce fraud risk across high-volume temporary and permanent placements.' },
  { icon: Globe, title: 'Remote Hiring Teams', desc: 'Verify candidates you\'ll never meet in person. Essential for distributed and global teams.' },
  { icon: Briefcase, title: 'HR Departments', desc: 'Add identity verification to your internal hiring process for an extra layer of security.' },
  { icon: Scale, title: 'High-Trust Roles', desc: 'Roles involving financial responsibility, accounting, or executive authority benefit from verified identity before placement.' },
];

export default function StaffingIdentityCheckPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated via-surface to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-8 border border-accent/10">
              <UserCheck className="w-3.5 h-3.5" /> Built for Staffing & Recruitment
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Verify Candidate Identity{' '}
              <span className="text-accent">Before You Hire</span>
            </h1>

            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Prevent fake applicants and reduce hiring risk with fast ID verification and optional watchlist screening.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact?source=staffing&action=demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted hover:bg-surface-elevated transition-all"
              >
                Start Free Trial
              </Link>
            </div>

            <p className="mt-5 text-sm text-text-muted">No credit card required. First month free.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '<30s', label: 'Verification Time' },
              { value: '200+', label: 'Countries Supported' },
              { value: '$0.99', label: 'Per ID Check' },
              { value: '80+', label: 'Watchlist Sources' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-sm text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">
              Fake Candidates and Hidden Risks Are Increasing
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              The staffing industry faces growing threats from identity fraud, resume fabrication, and unverified applicants.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PAIN_POINTS.map((p) => (
              <div key={p.title} className="bg-surface p-6 rounded-xl border border-border">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-4 border border-accent/10">
              <ShieldCheck className="w-3.5 h-3.5" /> The Solution
            </div>
            <h2 className="text-3xl font-bold text-text-primary">
              Complete Candidate Verification for Staffing Teams
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Identity verification and optional watchlist screening in a single workflow — built for recruiters who need speed and trust.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="group bg-surface p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Why Staffing Teams Choose {BRAND.name}</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Reduce hiring risk, save recruiter time, and build client trust with verified candidates.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {BENEFITS.map((b) => (
              <div key={b.text} className="flex items-start gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                <b.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-text-primary">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">How It Works</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Three simple steps. Identity verified in seconds.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="bg-surface rounded-xl p-6 text-center relative border border-border h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full text-sm font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Who This Is For</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              From recruitment agencies to in-house HR teams — verify every candidate before they start.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-surface p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4">
                  <uc.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{uc.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Secure, Compliant, and Privacy-First</h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Candidate data is handled with the highest security standards. Every verification is encrypted, consent-tracked, and audit-ready.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Lock, title: 'Data Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Biometric data deleted after verification.' },
              { icon: ShieldCheck, title: 'Secure Processing', desc: 'SOC 2 Type II compliant infrastructure. Bank-level security for identity data.' },
              { icon: Fingerprint, title: 'Candidate Consent', desc: 'Clear consent capture before verification. Full audit trail for every request.' },
              { icon: Scale, title: 'Regulatory Compliance', desc: 'GDPR-ready. Meets data protection standards across jurisdictions.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface-elevated p-6 rounded-xl border border-border text-center">
                <div className="w-11 h-11 bg-accent-subtle rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Make Every Hire a Verified and Trusted One</h2>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Stop guessing. Start verifying. Identity checks in seconds for every candidate you place.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?source=staffing&action=demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
