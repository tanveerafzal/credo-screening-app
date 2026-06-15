import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  ScanFace, Camera, CheckCircle, ShieldCheck, Globe, Zap,
  ArrowRight, CreditCard, BookOpen, Lock
} from 'lucide-react';
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
    step: '01',
    icon: Camera,
    title: 'Scan Your ID',
    desc: 'Point your camera at any government-issued ID, driver\'s license, or passport. Our OCR and MRZ scanning extracts data instantly.',
  },
  {
    step: '02',
    icon: ScanFace,
    title: 'Take a Selfie',
    desc: 'Snap a quick selfie. Our facial matching technology compares it to your ID photo in real-time with liveness detection.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Verified',
    desc: 'Identity confirmed in seconds. No manual review, no waiting. Results delivered instantly to your application via API or webhook.',
  },
];

const DOCUMENTS = [
  {
    icon: CreditCard,
    title: 'Government-Issued IDs',
    desc: 'State and national ID cards from 200+ countries.',
  },
  {
    icon: BookOpen,
    title: 'Driver\'s License',
    desc: 'US, Canadian, and international licenses supported.',
  },
  {
    icon: Globe,
    title: 'Passport',
    desc: 'MRZ scanning for instant data extraction from any passport.',
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'The whole process takes seconds. No waiting around for manual document checks or third-party verifications.',
    stat: '<30s',
    statLabel: 'Average verification time',
  },
  {
    icon: ShieldCheck,
    title: 'Top-Notch Security',
    desc: 'Facial matching and liveness detection ensure the person behind the screen is who they say they are.',
    stat: '180+',
    statLabel: 'Countries covered',
  },
  {
    icon: ScanFace,
    title: 'Simple Process',
    desc: 'Scan your ID and snap a selfie — that\'s it. No app downloads, no document uploads, no human review delays.',
    stat: '2',
    statLabel: 'Photos to verify',
  },
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

      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
            <ScanFace className="w-3.5 h-3.5" /> Identity Verification
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            The Fastest Way to<br />
            <span className="text-accent">Verify Real People</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            ID scan. Selfie. Done. Enterprise-grade identity verification
            your users complete in <strong className="text-text-primary">under 30 seconds</strong> — no app downloads, no manual review.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted transition-all"
            >
              See How It Works
            </Link>
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
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '0', label: 'Biometric Data Stored' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-sm text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Why Choose Credo for ID Verification?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Verify identities without the friction. Your users won&apos;t hate it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-surface p-8 rounded-xl border border-border hover:shadow-lg hover:border-accent/20 transition-all text-center">
                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-5">
                  <b.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">{b.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{b.desc}</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-2xl font-bold text-accent">{b.stat}</div>
                  <div className="text-xs text-text-muted mt-1">{b.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">How It Works</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Three simple steps. No app downloads. No manual review.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="bg-surface-elevated rounded-xl p-8 text-center relative border border-border">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full text-sm font-bold mb-5">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Supported Documents</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Accept identity documents from over 200 countries worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="bg-surface p-6 rounded-xl border border-border hover:shadow-md hover:border-accent/20 transition-all">
                <div className="w-11 h-11 bg-accent-subtle rounded-lg flex items-center justify-center mb-4">
                  <doc.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{doc.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Deep-Dive */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-4 border border-green-100">
                <Lock className="w-3.5 h-3.5" /> Privacy & Security
              </div>
              <h2 className="text-3xl font-bold text-text-primary">You&apos;re You. We Make Sure of It.</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                180+ countries — no fraud, no fakes, no second-guessing. We tell you exactly what data we collect,
                how we use it, and who sees it. No surprises. No fine print.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Facial Matching', desc: 'We match the selfie to the ID photo in real-time. Same face? You\'re in.' },
                  { title: 'Liveness Detection', desc: 'AI confirms a live person is present — not a photo, video, or mask.' },
                  { title: 'Encrypted & Deleted', desc: 'Biometric data is encrypted during verification and deleted immediately after. Never stored.' },
                  { title: 'Fraud Detection', desc: 'Built-in fraud detection catches tampered documents, expired IDs, and spoofing attempts.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-elevated rounded-2xl border border-border p-10 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-16 h-16 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary">Enterprise-Grade Security</h3>
              <p className="mt-3 text-text-secondary text-sm max-w-xs">
                Your users&apos; data is protected with bank-level encryption. We verify and delete — nothing is stored on our servers.
              </p>
              <div className="mt-6 w-full max-w-xs">
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-xl font-bold text-accent">AES-256</div>
                  <div className="text-xs text-text-muted">Encryption</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verify + Screen Together */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Verify Identity + Screen Against Watchlists</h2>
          <p className="mt-4 text-slate-300 text-lg">
            Combine ID verification with sanctions, PEP, and criminal screening in a single workflow.
            Verify who someone is <em>and</em> check if they&apos;re on a watchlist — all through one API.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/screening"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Try Free Screening <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Trusted by Businesses Worldwide</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              From startups to enterprises, businesses trust Credo for fast, reliable identity verification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-surface p-6 rounded-xl border border-border">
                <p className="text-text-secondary text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-xs font-semibold text-accent">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SolutionsGrid currentSlug="id-verification" />
      <FAQ items={FAQS} />
      <CTABanner />

      <Footer />
    </>
  );
}
