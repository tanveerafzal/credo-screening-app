import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  FileText, CheckCircle, ShieldCheck, Globe, Zap,
  ArrowRight, BarChart3, Lock, Users, Building2,
  CreditCard, TrendingUp, AlertTriangle
} from 'lucide-react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Credit Report (Canada Only)',
  description:
    'Canadian consumer credit reports powered by Equifax. Credit history, scores, and risk signals via API for lending, staffing, and tenant screening — Canada only.',
  path: '/credit-report',
  keywords: ['credit report API Canada', 'Equifax Canada credit check', 'Canadian consumer credit screening'],
});

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
    desc: 'Collections, charge-offs, bankruptcies, and judgments with dates and amounts.',
  },
  {
    icon: BarChart3,
    title: 'Inquiries',
    desc: 'Hard and soft inquiry history showing who has accessed the consumer\'s credit file.',
  },
  {
    icon: Users,
    title: 'Public Records',
    desc: 'Bankruptcies and related public-record items from Canadian credit file sources.',
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
    desc: 'Pull Canadian credit reports in real-time via API. No batch processing, no waiting. Results returned in seconds.',
    stat: '$5.99',
    statLabel: 'Per soft pull · Limited time',
  },
  {
    icon: ShieldCheck,
    title: 'Equifax Canada',
    desc: 'Direct integration with Equifax for Canadian consumer credit files. Reliable bureau data for Canada-only use cases.',
    stat: 'CA',
    statLabel: 'Canada only',
  },
  {
    icon: Lock,
    title: 'Consent Built In',
    desc: 'Credit pulls require consumer consent and a valid purpose. Consent tracking and audit trails are built into the flow.',
    stat: 'SIN',
    statLabel: 'Consent + identity',
  },
];

const USE_CASES = [
  'Tenant screening for Canadian property managers',
  'Pre-qualification for Canadian lending decisions',
  'Account opening risk assessment in Canada',
  'Insurance underwriting (Canada)',
  'Employment background checks with consent (Canada)',
  'KYC enhanced due diligence for Canadian applicants',
  'Auto loan and lease origination in Canada',
  'Staffing / role-based financial risk checks (Canada)',
];

const FAQS = [
  { q: 'Is this available outside Canada?', a: 'No. Credit Report is Canada only. It pulls Canadian Equifax consumer credit files and is not offered for other countries.' },
  { q: 'Which credit bureau does this use?', a: 'Reports are powered by Equifax for Canadian consumers. Coverage is limited to Canada.' },
  { q: 'Do I need consumer consent?', a: 'Yes. You must obtain consumer consent before pulling a credit report. Our flow supports consent capture and audit trails.' },
  { q: 'Is this a hard or soft pull?', a: 'We support soft pulls for pre-qualification and account review. Hard pulls may be available depending on your use case and onboarding.' },
  { q: 'Can I combine credit reports with screening?', a: 'Yes. You can run Canadian credit reports alongside background screening and ID verification through the same platform.' },
  { q: 'How is pricing structured?', a: 'Credit reports are $5.99 per soft pull — limited time pricing. Contact us for volume pricing.' },
  { q: 'What data is included in a report?', a: 'Each report typically includes credit score, trade lines, payment history, public records, collections, inquiries, and account summaries. Exact fields depend on the consumer\'s credit file.' },
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
            <FileText className="w-3.5 h-3.5" /> Canada only · Powered by Equifax
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            Credit Reports<br />
            <span className="text-accent">for Canada</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Pull Canadian consumer credit reports powered by <strong className="text-text-primary">Equifax</strong> through
            a single API. Credit scores, trade lines, public records, and risk indicators — Canada only.
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
              { value: 'Canada', label: 'Coverage' },
              { value: '<5s', label: 'Response Time' },
              { value: 'Equifax', label: 'Data Source' },
              { value: '$5.99', label: 'Per Soft Pull' },
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
              Equifax Canada integration. Simple API. Clear Canada-only coverage.
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
              Every report includes the Equifax Canadian credit file with scores, history, and risk indicators.
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
              Three steps to pull a Canadian credit report through the Credo API.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: Users,
                title: 'Submit Consumer Info',
                desc: 'Send the consumer\'s name, SIN, date of birth, and Canadian address through our API. Consumer consent is required and tracked.',
              },
              {
                step: '02',
                icon: Building2,
                title: 'We Pull from Equifax',
                desc: 'Credo retrieves the Canadian Equifax credit file in real-time. No batch processing.',
              },
              {
                step: '03',
                icon: FileText,
                title: 'Get the Report',
                desc: 'Receive the credit report with score, trade lines, public records, and risk factors via API response or webhook.',
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
            Combine Canadian credit reports with background screening and identity verification for a complete
            risk assessment — all through one API, one dashboard, one integration.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">Credit Report</div>
              <div className="text-lg font-bold text-white mt-1">Canada · Equifax</div>
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
                <Lock className="w-3.5 h-3.5" /> Canada Only
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Built for Responsible Use</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Pulling consumer credit reports requires a valid purpose and consumer consent.
                Credo supports consent capture, audit trails, and secure handling of Canadian credit data.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Canada Coverage', desc: 'Credit Report is offered for Canada only. Do not use this product for applicants outside Canada.' },
                  { title: 'Consumer Consent', desc: 'Built-in consent tracking with timestamps and audit trails for every credit pull.' },
                  { title: 'Data Security', desc: 'Credit data is encrypted in transit and at rest. Access controls and logging for every request.' },
                  { title: 'Identity First', desc: 'Pair with ID verification so the person providing a SIN matches the government ID on file.' },
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
              <h3 className="text-2xl font-bold text-text-primary">Equifax · Canada</h3>
              <p className="mt-3 text-text-secondary text-sm max-w-xs">
                Canadian credit reports are pulled via Equifax. This product is not available for US or other country credit files.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2">
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">Canada</div>
                  <div className="text-xs text-text-muted">Coverage only</div>
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
        title="Ready to pull Canadian credit reports?"
        subtitle="Contact us to get set up with Equifax credit reporting for Canada through the Credo API."
        primaryLabel="Contact Sales"
        primaryHref="/contact?product=credit-report"
        secondaryLabel="View All Products"
        secondaryHref="/products"
      />

      <Footer />
    </>
  );
}
