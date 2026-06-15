import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  ArrowRight, Shield, ScanFace, Camera, CheckCircle, Zap, Globe,
  Lock, Users, AlertTriangle, Clock, TrendingDown, ShieldCheck,
  Fingerprint, Smartphone, Building2, Coins, CreditCard, BarChart3,
  Wallet, LineChart, Server, Eye
} from 'lucide-react';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Fintech KYC Verification',
  description: 'Fast and secure KYC verification for fintech companies. Reduce fraud and verify users in seconds with ID + selfie matching powered by AI.',
  keywords: ['fintech KYC', 'identity verification', 'fraud prevention', 'KYC compliance', 'AML verification', 'fintech onboarding'],
};

const PAIN_POINTS = [
  {
    icon: Clock,
    title: 'Slow Onboarding',
    desc: 'Manual identity checks take hours or days. Users abandon sign-up before they ever transact. Every minute of friction costs you revenue.',
  },
  {
    icon: TrendingDown,
    title: 'High Drop-Off Rates',
    desc: 'Complex verification flows kill conversion. Users expect instant onboarding — if your KYC takes too long, they go to a competitor.',
  },
  {
    icon: AlertTriangle,
    title: 'Fraud Risk',
    desc: 'Synthetic identities, stolen documents, and deepfakes are on the rise. Basic document checks aren\'t enough to stop sophisticated fraud.',
  },
  {
    icon: Shield,
    title: 'Compliance Challenges',
    desc: 'KYC/AML regulations vary by jurisdiction and change frequently. Staying compliant across markets is complex and resource-intensive.',
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: 'ID Verification — 200+ Countries',
    desc: 'Accept government IDs, passports, and driver\'s licenses from over 200 countries. OCR and MRZ scanning extract data instantly.',
  },
  {
    icon: ScanFace,
    title: 'Facial Recognition + Selfie Matching',
    desc: 'AI-powered facial biometric matching compares the selfie to the ID photo in real-time with 99.9% accuracy.',
  },
  {
    icon: Eye,
    title: 'Liveness Detection',
    desc: 'Confirms a live person is present — not a photo, video, or deepfake mask. Blocks spoofing attacks before they start.',
  },
  {
    icon: Zap,
    title: 'Real-Time Results',
    desc: 'Verification completes in under 30 seconds. No manual review queues, no batch processing. Instant pass/fail decisions.',
  },
  {
    icon: Server,
    title: 'Simple API Integration',
    desc: 'RESTful API with webhook callbacks. Integrate into your onboarding flow in hours, not months. SDKs for web and mobile.',
  },
  {
    icon: BarChart3,
    title: 'Background Screening Add-On',
    desc: 'Combine ID verification with sanctions, PEP, and criminal screening against 1.2M+ entities — all in one API call.',
  },
];

const BENEFITS = [
  { icon: Zap, text: 'Verify users in under 30 seconds — no manual review' },
  { icon: ShieldCheck, text: 'Reduce fraud with AI-powered liveness detection and facial matching' },
  { icon: Globe, text: 'Global coverage — 200+ countries, all major ID document types' },
  { icon: TrendingDown, text: 'Improve onboarding conversion by removing friction from KYC' },
  { icon: Shield, text: 'Stay compliant with KYC/AML regulations across jurisdictions' },
  { icon: Lock, text: 'Biometric data encrypted in transit, deleted after verification' },
  { icon: Fingerprint, text: 'Catch deepfakes, synthetic IDs, and document tampering' },
  { icon: CreditCard, text: 'Add Equifax credit reports for lending and risk assessment' },
];

const STEPS = [
  {
    step: '01',
    icon: Smartphone,
    title: 'Upload ID',
    desc: 'User captures or uploads a photo of their government-issued ID, passport, or driver\'s license. OCR extracts data automatically.',
  },
  {
    step: '02',
    icon: Camera,
    title: 'Take a Selfie',
    desc: 'A quick selfie is captured with liveness detection running in real-time. No app download required — works in any browser.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Instant Verification',
    desc: 'AI matches the selfie to the ID photo, checks document authenticity, and returns a pass/fail result — all in under 30 seconds.',
  },
];

const USE_CASES = [
  { icon: Building2, title: 'Digital Banks', desc: 'Onboard account holders instantly with compliant KYC that doesn\'t require branch visits.' },
  { icon: Coins, title: 'Crypto Platforms', desc: 'Meet regulatory requirements for crypto exchanges while keeping sign-up fast and frictionless.' },
  { icon: Wallet, title: 'Lending Apps', desc: 'Verify borrower identity before disbursement. Combine with Equifax credit reports for full risk assessment.' },
  { icon: CreditCard, title: 'Payment Platforms', desc: 'Verify merchants and high-value users to reduce chargebacks and payment fraud.' },
  { icon: LineChart, title: 'Investment Apps', desc: 'Comply with SEC and FINRA requirements for brokerage account opening and suitability.' },
];

export default function FintechKycPage() {
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
              <ShieldCheck className="w-3.5 h-3.5" /> Built for Fintech
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Fast, Compliant KYC Verification for{' '}
              <span className="text-accent">Fintech Companies</span>
            </h1>

            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Verify customer identities in under 30 seconds using ID + selfie — reduce fraud, meet compliance, and onboard users faster.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact?source=fintech-kyc&action=demo"
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
              { value: '99.9%', label: 'Matching Accuracy' },
              { value: '$0.99', label: 'Per Verification' },
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
              KYC Is Slowing You Down — and Letting Fraud In
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Traditional KYC processes weren&apos;t built for modern fintech. Here&apos;s what&apos;s holding your growth back.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
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
              <Zap className="w-3.5 h-3.5" /> The Solution
            </div>
            <h2 className="text-3xl font-bold text-text-primary">
              All-in-One Identity Verification Built for Fintech
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Everything you need to verify customers, prevent fraud, and stay compliant — through a single API.
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
            <h2 className="text-3xl font-bold text-text-primary">Why Fintech Teams Choose {BRAND.name}</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Purpose-built for high-growth fintech companies that need speed, accuracy, and compliance.
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
              Three steps. Under 30 seconds. No app download required.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="bg-surface rounded-xl p-8 text-center relative border border-border">
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

      {/* Use Cases */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Built for Every Fintech Vertical</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              From neobanks to crypto exchanges, our KYC verification adapts to your compliance requirements.
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
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-4 border border-green-100">
                <Lock className="w-3.5 h-3.5" /> Security & Compliance
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Built with Security and Compliance in Mind</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                When you handle identity data, security isn&apos;t a feature — it&apos;s a requirement. {BRAND.registeredName} is designed from the ground up to protect your users&apos; most sensitive information.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'End-to-End Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). API communications secured with HMAC-signed webhooks.' },
                  { title: 'Biometric Verification', desc: 'AI-powered facial matching with liveness detection prevents spoofing, deepfakes, and synthetic identity fraud.' },
                  { title: 'Secure Data Handling', desc: 'Biometric data is encrypted during verification and deleted immediately after. We never store facial data on our servers.' },
                  { title: 'Regulatory Compliance', desc: 'KYC/AML compliant across jurisdictions. GDPR-ready data handling with consent management and audit trails.' },
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
            <div className="bg-surface rounded-2xl border border-border p-10 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-16 h-16 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary">Enterprise-Grade Security</h3>
              <p className="mt-3 text-text-secondary text-sm max-w-xs">
                Bank-level encryption. Zero biometric data retention. Audit-ready compliance controls.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2">
                <div className="bg-surface-elevated rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">AES-256</div>
                  <div className="text-xs text-text-muted">Encryption at Rest</div>
                </div>
                <div className="bg-surface-elevated rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">SOC 2</div>
                  <div className="text-xs text-text-muted">Type II Compliant</div>
                </div>
                <div className="bg-surface-elevated rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">GDPR</div>
                  <div className="text-xs text-text-muted">Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Start Verifying Your Users Today</h2>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Join hundreds of fintech companies using {BRAND.name} for fast, compliant KYC verification. First month free — no credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?source=fintech-kyc&action=demo"
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
