import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  UserCheck, Camera, ScanFace, ShieldCheck, Zap, TrendingDown, Shield,
  Clock, Target, Layers, Globe, Scale, CheckCircle, ArrowRight, Search,
  PenLine, FileText, Code2, Smartphone, Landmark, Banknote, Coins,
  Gamepad2, Briefcase, Home, Heart, Send, Building2
} from 'lucide-react';
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

const BENEFITS = [
  {
    icon: Zap,
    title: 'Onboarding in Under 30 Seconds',
    desc: 'Verify customer identity remotely — ID scan, selfie, and compliance checks without slowing down signup.',
    stat: '<30s',
    statLabel: 'Average completion time',
  },
  {
    icon: TrendingDown,
    title: 'Lower Operational Costs',
    desc: 'Replace manual KYC reviews and paper-based checks with automated verification and screening.',
    stat: '60%',
    statLabel: 'Typical cost reduction',
  },
  {
    icon: Shield,
    title: 'Fraud & Spoofing Prevention',
    desc: 'Liveness detection, document tampering checks, and watchlist screening catch fraud before account opening.',
    stat: '99.9%',
    statLabel: 'Platform uptime SLA',
  },
  {
    icon: Clock,
    title: 'Faster Time to Revenue',
    desc: 'Approve compliant customers in minutes instead of days. Reduce drop-off during signup flows.',
    stat: '40%',
    statLabel: 'Faster onboarding cycles',
  },
  {
    icon: Target,
    title: 'Higher Pass Rates',
    desc: 'Optimized capture flows and smart matching reduce false rejects while maintaining compliance rigor.',
    stat: '200+',
    statLabel: 'Countries supported',
  },
  {
    icon: Layers,
    title: 'Flexible Deployment',
    desc: 'Embed via SDK, REST API, or partner dashboard. Works in web, mobile browser, and native apps.',
    stat: 'API',
    statLabel: 'SDK & REST integration',
  },
  {
    icon: Smartphone,
    title: 'Multi-Platform Ready',
    desc: 'No app download required. Users complete onboarding on any device with a camera.',
    stat: '0',
    statLabel: 'App installs required',
  },
  {
    icon: Scale,
    title: 'Regulatory Compliance',
    desc: 'Screen against OFAC, EU, UN, PEP, and criminal lists. Build audit-ready onboarding workflows.',
    stat: '1.2M+',
    statLabel: 'Entities screened against',
  },
];

const STEPS = [
  {
    step: '01',
    icon: Send,
    title: 'Receive Secure Link',
    desc: 'The business sends the customer a secure onboarding link by email or SMS. They open it in any browser — no app download, no account setup.',
  },
  {
    step: '02',
    icon: Camera,
    title: 'Document Capture',
    desc: 'The user scans a government ID, passport, or driver\'s license. OCR and MRZ extraction pull data in real time — no manual entry.',
  },
  {
    step: '03',
    icon: ScanFace,
    title: 'Identity Verification',
    desc: 'A quick selfie is matched against the ID photo with passive liveness detection. Confirm the person is real and present.',
  },
  {
    step: '04',
    icon: ShieldCheck,
    title: 'Compliance & Fraud Checks',
    desc: 'Automatically screen against sanctions, PEP, and criminal watchlists. Catch deepfakes, document tampering, and high-risk matches.',
  },
  {
    step: '05',
    icon: Building2,
    title: 'Verified Data Delivered',
    desc: 'Once every check passes, clean, structured, verified customer data — identity, document, and screening results — is delivered back to the business instantly via dashboard, API, and webhook.',
  },
];

const DIFFERENTIATORS = [
  { icon: ScanFace, title: 'Passive Liveness Detection', desc: 'Confirm a live person without intrusive challenges.' },
  { icon: Search, title: 'AML & Watchlist Screening', desc: 'OFAC, EU, UN, PEP, and 80+ global sources in one flow.' },
  { icon: FileText, title: 'Real-Time OCR & MRZ', desc: 'Instant data extraction from IDs and passports.' },
  { icon: Camera, title: 'Auto Document Capture', desc: 'Guided capture with quality checks before submission.' },
  { icon: ShieldCheck, title: 'Fraud & Tamper Detection', desc: 'Catch spoofing, expired IDs, and altered documents.' },
  { icon: PenLine, title: 'Trusted Signatures', desc: 'Identity-verified e-signatures built into the same workflow.' },
  { icon: Code2, title: 'API & Webhook Integration', desc: 'Embed onboarding into any product with REST API and callbacks.' },
  { icon: Globe, title: '200+ Countries', desc: 'Support global customer bases without regional silos.' },
];

const INDUSTRIES = [
  {
    icon: Landmark,
    title: 'Banking',
    desc: 'Verify new account holders remotely while meeting KYC and AML requirements.',
    href: '/industries/financial-institutions',
  },
  {
    icon: Banknote,
    title: 'Fintech',
    desc: 'Onboard users in seconds with API-first identity and compliance checks.',
    href: '/industries/fintech',
  },
  {
    icon: Coins,
    title: 'Crypto',
    desc: 'Verify wallet holders and exchange users before enabling transactions.',
    href: '/industries/crypto',
  },
  {
    icon: Shield,
    title: 'Insurance',
    desc: 'Confirm policyholder identity and screen beneficiaries at issuance.',
    href: '/industries/insurance',
  },
  {
    icon: Gamepad2,
    title: 'Gaming & Gambling',
    desc: 'Age-verify players and prevent fraudulent account creation.',
    href: '/industries/gaming-gambling',
  },
  {
    icon: Briefcase,
    title: 'Professional Services',
    desc: 'Onboard clients and contractors with verified identity before engagement.',
    href: '/industries/professional-services',
  },
  {
    icon: Home,
    title: 'Real Estate',
    desc: 'Verify tenants, buyers, and sellers before lease or closing.',
    href: '/industries/real-estate',
  },
  {
    icon: Heart,
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

export default function OnboardingPage() {
  return (
    <>
      <Navbar />

      {/* Hero — What is Onboarding */}
      <section className="pt-20 pb-6 sm:pt-24 sm:pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-4 border border-accent/10">
                <UserCheck className="w-3.5 h-3.5" /> Digital Onboarding
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
                What is <span className="text-accent">{BRAND.name} Digital Onboarding?</span>
              </h1>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                Our solution lets you verify customer identity remotely — capturing document data automatically,
                matching a selfie with passive liveness, and screening against AML, PEP, and sanctions lists in real time.
              </p>
              <p className="mt-3 text-text-secondary leading-relaxed">
                No app downloads. No manual review queues. Onboard compliant customers in seconds, not days.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
                >
                  Start Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact?plan=corporate"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted transition-all"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="bg-surface-elevated rounded-2xl border border-border p-6 lg:p-8">
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">Complete Onboarding Flow</div>
              <div className="space-y-3">
                {[
                  { icon: Camera, label: 'ID Document Scan', detail: 'OCR + MRZ extraction' },
                  { icon: ScanFace, label: 'Selfie + Liveness', detail: 'Facial match in real time' },
                  { icon: Search, label: 'Watchlist Screening', detail: 'OFAC, PEP, sanctions' },
                  { icon: PenLine, label: 'Trusted Signatures', detail: 'Optional e-sign step' },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-text-primary">{item.label}</div>
                      <div className="text-xs text-text-muted">{item.detail}</div>
                    </div>
                    {i < 3 && <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border text-center">
                <div className="text-2xl font-bold text-accent">&lt;30s</div>
                <div className="text-xs text-text-muted mt-1">End-to-end verification time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-surface-elevated border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Benefits of Digital Onboarding</div>
            <h2 className="text-3xl font-bold text-text-primary">Maximize Results with {BRAND.name}</h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Faster signups, lower costs, and stronger compliance — without adding friction to your customer journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-surface p-5 rounded-xl border border-border hover:shadow-lg hover:border-accent/20 transition-all">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-bold text-text-primary leading-snug">{b.title}</h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">{b.desc}</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-lg font-bold text-accent">{b.stat}</div>
                  <div className="text-[11px] text-text-muted mt-0.5">{b.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step Process */}
      <section id="how-it-works" className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">Onboarding in {STEPS.length} Simple Steps</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              From the invite link to verified data in your systems — a frictionless flow your
              users complete in the browser, with no app install and no paperwork.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="bg-surface-elevated rounded-xl p-6 text-center relative border border-border h-full">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full text-sm font-bold mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiating Features */}
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-surface-elevated border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">Why Choose Us</div>
            <h2 className="text-3xl font-bold text-text-primary">Differentiating Features</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Everything you need for secure, compliant digital onboarding in one platform.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIFFERENTIATORS.map((f) => (
              <div key={f.title} className="bg-surface p-5 rounded-xl border border-border hover:border-accent/20 transition-all">
                <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{f.title}</h3>
                <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Workflow CTA */}
      <section className="py-8 sm:py-10 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">One Platform for Complete Onboarding</h2>
          <p className="mt-3 text-slate-300 text-lg">
            Verify identity, screen against watchlists, pull credit reports, and collect trusted signatures —
            all through a single API. Build the onboarding flow your compliance team and users will love.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: ScanFace, label: 'ID Verification', href: '/credo-id-verification' },
              { icon: Search, label: 'Screening', href: '/screening' },
              { icon: FileText, label: 'Credit Report', href: '/credit-report' },
              { icon: PenLine, label: 'Trusted Signatures', href: '/credo-trusted-signatures' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
              >
                <item.icon className="w-7 h-7 text-accent-light mx-auto mb-2" />
                <div className="text-sm font-semibold text-white">{item.label}</div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-text-primary">Sectors & Use Cases</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Digital onboarding for regulated industries and high-growth platforms worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.title}
                href={ind.href}
                className="group bg-surface-elevated p-5 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
                  <ind.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{ind.title}</h3>
                <p className="mt-2 text-xs text-text-secondary leading-relaxed">{ind.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={FAQS} compactTop />
      <CTABanner
        title="Ready to streamline onboarding?"
      />

      <Footer />
    </>
  );
}
