import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTABanner } from '@/components/marketing/CTABanner';
import { FAQ } from '@/components/marketing/FAQ';
import Link from 'next/link';
import {
  ScanFace, Search, CheckCircle, ArrowRight, Layers,
  Zap, Globe, ShieldCheck, DollarSign
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products & Pricing | CredoScreening',
  description: 'ID Verification and Background Screening — $0.99 per check. Bundle both for $1.59. Pay per use, no contracts.',
};

const PRODUCTS = [
  {
    icon: ScanFace,
    name: 'ID Verification',
    tagline: 'Verify real people in seconds',
    price: '$0.99',
    description: 'Government ID scan + selfie facial matching with liveness detection. Verify identities from 200+ countries in under 30 seconds.',
    features: [
      'Government ID, passport & driver\'s license',
      'Facial matching + liveness detection',
      '200+ countries supported',
      'Results in under 30 seconds',
      'OCR & MRZ data extraction',
      'Biometric data deleted after verification',
    ],
    href: '/id-verification',
  },
  {
    icon: Search,
    name: 'Background Screening',
    tagline: 'Screen against 1.2M+ entities',
    price: '$0.99',
    description: 'Sanctions, PEP, criminal, and regulatory screening across 80+ global watchlists. Instant fuzzy name matching with composite scoring.',
    features: [
      'OFAC, EU, UN, UK & global sanctions',
      'PEP & politically exposed persons',
      'Interpol & law enforcement lists',
      'Regulatory & debarment databases',
      'Fuzzy name matching & phonetic search',
      'Adverse media monitoring',
    ],
    href: '/screening',
  },
];

const FAQS = [
  { q: 'Is there a monthly fee?', a: 'No monthly fees. You only pay for what you use. Each verification or screening is billed individually at the per-use rate.' },
  { q: 'How does the bundle pricing work?', a: 'When you run both ID Verification and Background Screening on the same person in a single request, you pay $1.59 instead of $1.98 — saving you $0.39 per check.' },
  { q: 'Is there a free tier?', a: 'Yes! Your first month includes up to 10 ID verifications and 10 background screenings for free. After that, you pay per use.' },
  { q: 'Do I need to commit to a volume?', a: 'No commitments. Pay per use. Run 1 check or 10,000 — same price per check. For high-volume needs, contact us for enterprise pricing.' },
  { q: 'How do I get started?', a: 'Sign up for free, get your API key, and start running checks immediately. No credit card required for the free tier.' },
  { q: 'Can I use both products through the API?', a: 'Yes. Both products are available via our REST API. You can run them individually or combine them in a single API call for the bundled rate.' },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
            <ShieldCheck className="w-3.5 h-3.5" /> First Month Free — 10 verifications & 10 screenings included
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            Simple Pricing.<br />
            <span className="text-accent">Pay Per Use.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            ID Verification and Background Screening at <strong className="text-text-primary">$0.99 per check</strong>.
            Bundle both for just <strong className="text-text-primary">$1.59</strong>. No contracts, no monthly minimums.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <div key={product.name} className="bg-surface rounded-xl border border-border p-8 hover:shadow-lg hover:border-accent/20 transition-all">
                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mb-5">
                  <product.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{product.name}</h3>
                <p className="text-sm text-text-muted mt-1">{product.tagline}</p>
                <div className="mt-5">
                  <span className="text-4xl font-bold text-text-primary">{product.price}</span>
                  <span className="text-sm text-text-muted ml-1">/ per check</span>
                </div>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">{product.description}</p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold mb-6 border border-white/10">
            <DollarSign className="w-3.5 h-3.5" /> Best Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Bundle & Save
          </h2>
          <p className="mt-4 text-slate-300 text-lg max-w-2xl mx-auto">
            Run ID Verification + Background Screening together for just <strong className="text-white">$1.59 per check</strong> — save 20% compared to running them separately.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <ScanFace className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">ID Verification</div>
              <div className="text-2xl font-bold text-white mt-1">$0.99</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">Screening</div>
              <div className="text-2xl font-bold text-white mt-1">$0.99</div>
            </div>
            <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-xl p-6 ring-1 ring-accent/40">
              <Layers className="w-8 h-8 text-accent-light mx-auto mb-3" />
              <div className="text-sm text-accent-light">Both Together</div>
              <div className="text-2xl font-bold text-white mt-1">$1.59</div>
              <div className="text-xs text-accent-light mt-1">Save $0.39</div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Why Pay Per Use */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary">Why Pay Per Use?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              No subscriptions, no surprises. You only pay when you run a check.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: DollarSign,
                title: 'No Monthly Fees',
                desc: 'Zero fixed costs. Run 1 check or 10,000 — you only pay for what you use.',
              },
              {
                icon: Zap,
                title: 'Instant Access',
                desc: 'Sign up, get your API key, and start running checks in minutes. No setup fees.',
              },
              {
                icon: Globe,
                title: 'Scale Freely',
                desc: 'Same low price whether you run 10 checks a month or 10,000. Enterprise volume? Let\'s talk.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-surface-elevated p-8 rounded-xl text-center">
                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary">What&apos;s Included</h2>
            <p className="mt-3 text-text-secondary">Every check includes all features. No hidden tiers.</p>
          </div>
          <div className="bg-surface rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-semibold text-text-primary px-6 py-4">Feature</th>
                  <th className="text-center text-sm font-semibold text-text-primary px-4 py-4">
                    <ScanFace className="w-4 h-4 inline mr-1 text-accent" />ID Verify
                  </th>
                  <th className="text-center text-sm font-semibold text-text-primary px-4 py-4">
                    <Search className="w-4 h-4 inline mr-1 text-accent" />Screening
                  </th>
                  <th className="text-center text-sm font-semibold text-text-primary px-4 py-4">
                    <Layers className="w-4 h-4 inline mr-1 text-accent" />Bundle
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Price per check', idv: '$0.99', screen: '$0.99', bundle: '$1.59' },
                  { feature: 'REST API access', idv: true, screen: true, bundle: true },
                  { feature: 'Webhook callbacks', idv: true, screen: true, bundle: true },
                  { feature: 'ID document scanning', idv: true, screen: false, bundle: true },
                  { feature: 'Facial matching', idv: true, screen: false, bundle: true },
                  { feature: 'Liveness detection', idv: true, screen: false, bundle: true },
                  { feature: 'Sanctions screening', idv: false, screen: true, bundle: true },
                  { feature: 'PEP screening', idv: false, screen: true, bundle: true },
                  { feature: 'Criminal watchlists', idv: false, screen: true, bundle: true },
                  { feature: 'Adverse media', idv: false, screen: true, bundle: true },
                  { feature: '200+ countries', idv: true, screen: true, bundle: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border-subtle">
                    <td className="text-sm text-text-secondary px-6 py-3">{row.feature}</td>
                    {[row.idv, row.screen, row.bundle].map((val, i) => (
                      <td key={i} className="text-center px-4 py-3">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <CheckCircle className="w-4 h-4 text-success inline" />
                          ) : (
                            <span className="text-text-muted">—</span>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-text-primary">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} />
      <CTABanner />
      <Footer />
    </>
  );
}
