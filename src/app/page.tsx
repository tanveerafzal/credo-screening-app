import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  Search, Globe, Zap, Lock, BarChart3,
  CheckCircle, ArrowRight, Database, ScanFace, Shield, Clock, FileText, PenLine,
  UserCheck, Camera
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { BUNDLE_PRICES, FREE_CREDITS, FREE_TRIAL, PRODUCT_PRICES, formatUsd } from '@/lib/pricing';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'AML & Sanctions Screening Platform',
    description: BRAND.description,
    path: '/',
    keywords: ['AML screening', 'sanctions screening', 'OFAC screening', 'PEP screening', 'watchlist screening'],
  }),
  title: {
    absolute: `${BRAND.name} — AML & Sanctions Screening Platform`,
  },
};

const SOURCES = [
  { category: 'Sanctions', items: ['OFAC SDN', 'OFAC Consolidated', 'EU Consolidated Sanctions', 'UN Security Council', 'UK OFSI', 'Australia DFAT', 'Canada SEMA', 'Switzerland SECO', 'Japan MOF', 'Singapore MAS', 'Hong Kong MAS'], color: 'red' },
  { category: 'PEP (Politically Exposed Persons)', items: ['OpenSanctions PEP', 'Wikidata Politicians', 'US Congress', 'UK Parliament', 'EU Parliament', 'EveryPolitician'], color: 'violet' },
  { category: 'Criminal / Law Enforcement', items: ['Interpol Red & Yellow Notices', 'FBI Most Wanted', 'DEA Most Wanted', 'US Marshals', 'Europol Most Wanted'], color: 'orange' },
  { category: 'Regulatory / Debarment', items: ['SEC Enforcement', 'SAM.gov Exclusions', 'OIG Exclusion List', 'BIS Entity List', 'World Bank Debarment', 'FCA Warnings (UK)', 'BaFin (Germany)', 'FINMA (Switzerland)', 'ASIC (Australia)'], color: 'blue' },
  { category: 'Country Risk', items: ['FATF High-Risk Lists', 'Basel AML Index', 'Transparency International CPI'], color: 'amber' },
  { category: 'Adverse Media', items: ['GDELT Project', 'Global news monitoring'], color: 'teal' },
];

const FEATURES = [
  { icon: Zap, title: 'Instant Results', desc: 'Screen against 1.2M+ entities in under 3 seconds with fuzzy name matching and phonetic algorithms.' },
  { icon: Globe, title: '80+ Global Sources', desc: 'OFAC, EU, UN, UK, PEP databases, Interpol, and regulatory lists from jurisdictions worldwide.' },
  { icon: Lock, title: 'Bank-Grade Security', desc: 'All data encrypted in transit and at rest. HMAC-signed webhooks for tamper-proof delivery.' },
  { icon: BarChart3, title: 'Smart Matching', desc: 'Name variant detection (Muhammad/Mohammed/Mohamed), phonetic matching, and composite scoring.' },
  { icon: Database, title: 'Always Current', desc: 'Critical sanctions lists updated hourly. Full dataset refreshed every 4 hours automatically.' },
  { icon: Search, title: 'Easy Integration', desc: 'Simple REST API. Send a name, get results. Webhook callbacks for async workflows.' },
  { icon: ScanFace, title: 'ID Verification', desc: 'Verify real people with ID scan + selfie. Facial matching, liveness detection, 200+ countries.' },
];

const sourceColorMap: Record<string, { card: string; badge: string }> = {
  red: { card: 'bg-red-50 border-red-100', badge: 'bg-red-100 text-red-700' },
  violet: { card: 'bg-violet-50 border-violet-100', badge: 'bg-violet-100 text-violet-700' },
  orange: { card: 'bg-orange-50 border-orange-100', badge: 'bg-orange-100 text-orange-700' },
  blue: { card: 'bg-blue-50 border-blue-100', badge: 'bg-blue-100 text-blue-700' },
  amber: { card: 'bg-amber-50 border-amber-100', badge: 'bg-amber-100 text-amber-700' },
  teal: { card: 'bg-teal-50 border-teal-100', badge: 'bg-teal-100 text-teal-700' },
};

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated via-surface to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
              <Shield className="w-3.5 h-3.5" />
              {FREE_TRIAL.headline}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1] tracking-tight">
              Compliance screening
              <br />
              <span className="text-accent">you can trust</span>
            </h1>

            <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Screen against <strong className="text-text-primary font-semibold">1.2 million+ entities</strong> from OFAC, global sanctions, PEP databases, and 80+ watchlists. Verify identities with ID scan + selfie in under 30 seconds.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/screening"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
              >
                Try Free Screening <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#sources"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted hover:bg-surface-elevated transition-all"
              >
                View Data Sources
              </Link>
            </div>

            <p className="mt-4 text-sm text-text-muted">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1.2M+', label: 'Entities Screened Against', icon: Database },
              { value: '200+', label: 'Countries Supported', icon: Globe },
              { value: '<3s', label: 'Average Response Time', icon: Clock },
              { value: '99.9%', label: 'Uptime SLA', icon: Shield },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-subtle mb-3">
                  <s.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-text-primary">{s.value}</div>
                <div className="text-sm text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Why {BRAND.name}?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Built for compliance teams, fintechs, and any business that needs reliable screening.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Digital Onboarding */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-4 border border-accent/10">
                <UserCheck className="w-3.5 h-3.5" /> Digital Onboarding
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Frictionless Customer Onboarding</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Verify identity remotely with ID scan, selfie liveness, and automated AML screening —
                all in under 30 seconds. No app downloads. No manual review queues.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Camera, title: 'Document Capture', desc: 'OCR and MRZ extraction from IDs and passports.' },
                  { icon: ScanFace, title: 'Identity Verification', desc: 'Facial matching with passive liveness detection.' },
                  { icon: Search, title: 'Compliance Screening', desc: 'OFAC, PEP, sanctions, and criminal watchlists.' },
                ].map((step) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4.5 h-4.5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
                      <p className="text-sm text-text-secondary">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/credo-onboarding"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-all"
              >
                Explore Digital Onboarding <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '<30s', label: 'Verification Time' },
                { value: '200+', label: 'Countries' },
                { value: '1.2M+', label: 'Watchlist Entities' },
                { value: String(FREE_CREDITS), label: 'Free Credits' },
              ].map((s) => (
                <div key={s.label} className="bg-surface p-6 rounded-xl border border-border text-center">
                  <div className="text-2xl font-bold text-accent">{s.value}</div>
                  <div className="text-xs text-text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section id="sources" className="py-10 sm:py-12 bg-surface-elevated border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Data Sources We Screen Against</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Comprehensive coverage across sanctions, PEP, criminal, and regulatory databases worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOURCES.map((group) => (
              <div key={group.category} className={`p-5 rounded-xl border ${sourceColorMap[group.color].card}`}>
                <h3 className="font-semibold text-sm text-text-primary mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className={`text-xs font-medium px-2.5 py-1 rounded-md ${sourceColorMap[group.color].badge}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-4 border border-accent/10">
              <Shield className="w-3.5 h-3.5" />
              {FREE_TRIAL.headline}
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-text-secondary">Pay per use. No monthly minimums. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: 'Pay as you go',
                price: '$0',
                period: ' platform fee',
                badge: 'FIRST MONTH FREE',
                features: [
                  `${FREE_CREDITS} free credits on signup`,
                  'Per-check pricing — no commitments',
                  'REST API, webhooks & dashboard included',
                  'Buy more credits anytime in your account',
                ],
                cta: 'Get Started',
                href: '/register',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                badge: null,
                features: ['Volume pricing & credit packs', 'Continuous monitoring', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
                cta: 'Contact Us',
                href: '/contact?plan=corporate',
                popular: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-xl p-8 transition-all ${plan.popular ? 'bg-primary text-white ring-2 ring-accent shadow-xl relative' : 'bg-surface border border-border hover:border-border hover:shadow-md'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">Most Popular</div>}
                {plan.badge && !plan.popular && <div className="text-xs font-semibold mb-2 text-accent">{plan.badge}</div>}
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-text-primary'}`}>{plan.name}</h3>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-text-primary'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-text-muted'}`}> {plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-accent-light' : 'text-accent'}`} />
                      <span className={plan.popular ? 'text-slate-200' : 'text-text-secondary'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full text-center py-2.5 rounded-lg font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-accent-light'
                      : 'bg-primary text-white hover:bg-primary-light'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Per-Use Product Pricing */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary">Pay Per Use</h3>
              <p className="mt-2 text-text-secondary text-sm">
                1 credit = 1 check. Use credits on any product below. ID + Screening bundle {formatUsd(BUNDLE_PRICES.idAndScreening.amount)}.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              <div className="bg-surface rounded-xl border border-border p-6 text-center hover:shadow-md hover:border-accent/20 transition-all relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Limited Time</div>
                <ScanFace className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-sm font-medium text-text-muted">ID Verification</div>
                <div className="text-3xl font-bold text-text-primary mt-1">{formatUsd(PRODUCT_PRICES.idVerification.amount)}</div>
                <div className="text-xs text-text-muted mt-1">per check</div>
              </div>
              <div className="bg-surface rounded-xl border border-border p-6 text-center hover:shadow-md hover:border-accent/20 transition-all relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Limited Time</div>
                <Search className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-sm font-medium text-text-muted">Background Screening</div>
                <div className="text-3xl font-bold text-text-primary mt-1">{formatUsd(PRODUCT_PRICES.screening.amount)}</div>
                <div className="text-xs text-text-muted mt-1">per check</div>
              </div>
              <div className="bg-surface rounded-xl border border-border p-6 text-center hover:shadow-md hover:border-accent/20 transition-all relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Limited Time</div>
                <FileText className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-sm font-medium text-text-muted">Credit Report</div>
                <div className="text-3xl font-bold text-text-primary mt-1">{formatUsd(PRODUCT_PRICES.creditReport.amount)}</div>
                <div className="text-xs text-text-muted mt-1">per soft pull</div>
              </div>
              <div className="bg-surface rounded-xl border border-border p-6 text-center hover:shadow-md hover:border-accent/20 transition-all relative">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Limited Time</div>
                <PenLine className="w-8 h-8 text-accent mx-auto mb-3" />
                <div className="text-sm font-medium text-text-muted">Trusted Signatures</div>
                <div className="text-3xl font-bold text-text-primary mt-1">{formatUsd(PRODUCT_PRICES.trustedSignatures.amount)}</div>
                <div className="text-xs text-text-muted mt-1">per envelope</div>
              </div>
              <div className="bg-accent-subtle rounded-xl border border-accent/10 p-6 text-center hover:shadow-md transition-all">
                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <ScanFace className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-xs">+</span>
                  <Search className="w-5 h-5 text-accent" />
                  <span className="text-accent font-bold text-xs">+</span>
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div className="text-sm font-medium text-accent">All Together</div>
                <div className="text-3xl font-bold text-text-primary mt-1">{formatUsd(BUNDLE_PRICES.full.amount)}</div>
                <div className="text-xs text-accent mt-1">per check &middot; save 15%</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/products" className="text-sm font-medium text-accent hover:text-accent-light inline-flex items-center gap-1.5 transition-colors">
                View full product details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to strengthen your compliance?</h2>
          <p className="mt-4 text-slate-300 text-lg">
            {FREE_TRIAL.cta}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/screening"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Start Screening <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
