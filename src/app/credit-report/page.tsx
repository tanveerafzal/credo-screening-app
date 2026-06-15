import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  FileText, CheckCircle, ShieldCheck, Globe, Zap,
  ArrowRight, BarChart3, Lock, Users, Clock, Building2,
  CreditCard, TrendingUp, AlertTriangle
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Report',
  description: 'Consumer credit reports powered by Equifax. Access credit history, scores, and risk assessment through a single API. Fast, compliant, and affordable.',
};

const REPORT_INCLUDES = [
  {
    icon: TrendingUp,
    title: 'Credit Score',
    desc: 'Equifax credit score with score factors and risk indicators to support lending decisions.',
  },
  {
    icon: FileText,
    title: 'Credit History',
    desc: 'Full trade line history including open accounts, balances, payment history, and credit utilization.',
  },
  {
    icon: AlertTriangle,
    title: 'Derogatory Records',
    desc: 'Collections, charge-offs, bankruptcies, liens, and judgments with dates and amounts.',
  },
  {
    icon: BarChart3,
    title: 'Inquiries',
    desc: 'Hard and soft inquiry history showing who has accessed the consumer\'s credit file.',
  },
  {
    icon: Users,
    title: 'Public Records',
    desc: 'Bankruptcies, civil judgments, and tax liens from public record sources.',
  },
  {
    icon: CreditCard,
    title: 'Account Summary',
    desc: 'Total accounts, total balances, credit limit utilization, and account age analysis.',
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Instant Access',
    desc: 'Pull credit reports in real-time via API. No batch processing, no waiting. Results returned in seconds.',
    stat: '$5.99',
    statLabel: 'Per soft pull · Limited time',
  },
  {
    icon: ShieldCheck,
    title: 'Equifax Powered',
    desc: 'Direct integration with Equifax — one of the three major credit bureaus. Reliable, comprehensive data you can trust.',
    stat: '220M+',
    statLabel: 'Consumer profiles',
  },
  {
    icon: Lock,
    title: 'Fully Compliant',
    desc: 'FCRA-compliant credit pulls with permissible purpose verification. Audit trails and consent management built in.',
    stat: 'FCRA',
    statLabel: 'Compliant',
  },
];

const USE_CASES = [
  'Tenant screening for property management',
  'Pre-qualification for lending and credit decisions',
  'Account opening risk assessment',
  'Insurance underwriting',
  'Employment background checks (with consent)',
  'Debt collection skip tracing',
  'KYC enhanced due diligence',
  'Auto loan and lease origination',
];

const FAQS = [
  { q: 'Which credit bureau does this use?', a: 'Credit reports are powered by Equifax, one of the three major US credit bureaus with data on over 220 million consumers.' },
  { q: 'Is this FCRA compliant?', a: 'Yes. All credit pulls are FCRA-compliant. You must have a permissible purpose to pull a consumer credit report, and we verify this as part of the onboarding process.' },
  { q: 'Do I need consumer consent?', a: 'Yes. You must obtain written consumer consent before pulling a credit report. Our API supports consent tracking and audit trails.' },
  { q: 'Is this a hard or soft pull?', a: 'We support both hard and soft pulls depending on your use case. Soft pulls are available for pre-qualification and account review. Hard pulls are used for credit decisions.' },
  { q: 'Can I combine credit reports with screening?', a: 'Yes. You can run credit reports alongside our background screening and ID verification products through the same API for a complete risk assessment.' },
  { q: 'How is pricing structured?', a: 'Credit reports are $5.99 per soft pull — limited time pricing. All reports include the full credit file, score, and risk indicators. Contact us for volume pricing.' },
  { q: 'What data is included in a report?', a: 'Each report includes credit score, trade lines, payment history, public records, collections, inquiries, and account summaries. The exact fields depend on the consumer\'s credit file.' },
];

export default function CreditReportPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
            <FileText className="w-3.5 h-3.5" /> Powered by Equifax
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            Credit Reports<br />
            <span className="text-accent">in seconds</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Pull consumer credit reports powered by <strong className="text-text-primary">Equifax</strong> through
            a single API. Credit scores, trade lines, public records, and risk indicators — delivered in real-time.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?product=credit-report"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#whats-included"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted transition-all"
            >
              See What&apos;s Included
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '220M+', label: 'Consumer Profiles' },
              { value: '<5s', label: 'Response Time' },
              { value: 'FCRA', label: 'Compliant' },
              { value: 'Equifax', label: 'Data Source' },
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
            <h2 className="text-3xl font-bold text-text-primary">Why Pull Credit Through Credo?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Direct Equifax integration. Simple API. No middlemen.
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

      {/* What's Included */}
      <section id="whats-included" className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">What&apos;s in a Credit Report</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Every report includes the full Equifax credit file with scores, history, and risk indicators.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REPORT_INCLUDES.map((item) => (
              <div key={item.title} className="group bg-surface p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
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
              Three steps to pull a credit report through the Credo API.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: Users,
                title: 'Submit Consumer Info',
                desc: 'Send the consumer\'s name, SSN, date of birth, and address through our API. Consumer consent is required and tracked.',
              },
              {
                step: '02',
                icon: Building2,
                title: 'We Pull from Equifax',
                desc: 'Credo connects directly to Equifax and retrieves the full credit file in real-time. No batch processing.',
              },
              {
                step: '03',
                icon: FileText,
                title: 'Get the Report',
                desc: 'Receive the complete credit report with score, trade lines, public records, and risk factors via API response or webhook.',
              },
            ].map((step, i) => (
              <div key={step.step} className="relative">
                {i < 2 && (
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-10">Common Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {USE_CASES.map((uc) => (
              <div key={uc} className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-text-primary">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combine Products CTA */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Credit Report + Screening + ID Verification</h2>
          <p className="mt-4 text-slate-300 text-lg">
            Combine credit reports with background screening and identity verification for a complete
            risk assessment — all through one API, one dashboard, one integration.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">Credit Report</div>
              <div className="text-lg font-bold text-white mt-1">Equifax</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <Globe className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">Screening</div>
              <div className="text-lg font-bold text-white mt-1">80+ Lists</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <ShieldCheck className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">ID Verification</div>
              <div className="text-lg font-bold text-white mt-1">200+ Countries</div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?product=credit-report"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-4 border border-green-100">
                <Lock className="w-3.5 h-3.5" /> FCRA Compliance
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Built for Compliance</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Pulling consumer credit reports requires FCRA compliance. Credo handles the heavy lifting —
                permissible purpose verification, consent management, dispute handling, and audit trails are all built into the platform.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Permissible Purpose', desc: 'We verify your permissible purpose during onboarding. Only authorized use cases can pull reports.' },
                  { title: 'Consumer Consent', desc: 'Built-in consent tracking with timestamps and audit trails for every credit pull.' },
                  { title: 'Data Security', desc: 'Credit data is encrypted in transit and at rest. Access controls and logging for every request.' },
                  { title: 'Dispute Support', desc: 'Consumer dispute handling workflows compliant with FCRA requirements.' },
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
              <div className="w-20 h-20 bg-accent-subtle rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Equifax Certified</h3>
              <p className="mt-3 text-text-secondary text-sm max-w-xs">
                Credo is a certified Equifax reseller. Reports are pulled directly from Equifax systems with full bureau-level data quality.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2">
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">FCRA</div>
                  <div className="text-xs text-text-muted">Fair Credit Reporting Act</div>
                </div>
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">SOC 2</div>
                  <div className="text-xs text-text-muted">Type II Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} />
      <CTABanner
        title="Ready to pull credit reports?"
        subtitle="Contact us to get set up with Equifax credit reporting through the Credo API."
        primaryLabel="Contact Sales"
        primaryHref="/contact?product=credit-report"
        secondaryLabel="View All Products"
        secondaryHref="/products"
      />

      <Footer />
    </>
  );
}
