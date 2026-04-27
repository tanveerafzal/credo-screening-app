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
    color: 'indigo',
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
    color: 'purple',
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
      <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-6">
            <Layers className="w-3.5 h-3.5" /> Products & Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Simple Pricing.<br />
            <span className="text-indigo-600">Pay Per Use.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            ID Verification and Background Screening at <strong>$0.99 per check</strong>.
            Bundle both for just <strong>$1.59</strong>. No contracts, no monthly minimums.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <div key={product.name} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition">
                <div className={`w-14 h-14 ${product.color === 'indigo' ? 'bg-indigo-100' : 'bg-purple-100'} rounded-2xl flex items-center justify-center mb-5`}>
                  <product.icon className={`w-7 h-7 ${product.color === 'indigo' ? 'text-indigo-600' : 'text-purple-600'}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.tagline}</p>
                <div className="mt-5">
                  <span className="text-4xl font-extrabold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-500 ml-1">/ per check</span>
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{product.description}</p>
                <ul className="mt-6 space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={product.href}
                  className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold mb-6">
            <DollarSign className="w-3.5 h-3.5" /> Best Value
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Bundle & Save
          </h2>
          <p className="mt-4 text-indigo-200 text-lg max-w-2xl mx-auto">
            Run ID Verification + Background Screening together for just <strong className="text-white">$1.59 per check</strong> — save 20% compared to running them separately.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <ScanFace className="w-8 h-8 text-indigo-200 mx-auto mb-3" />
              <div className="text-sm text-indigo-200">ID Verification</div>
              <div className="text-2xl font-extrabold text-white mt-1">$0.99</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <Search className="w-8 h-8 text-indigo-200 mx-auto mb-3" />
              <div className="text-sm text-indigo-200">Screening</div>
              <div className="text-2xl font-extrabold text-white mt-1">$0.99</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6 ring-2 ring-white/30">
              <Layers className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-sm text-indigo-200">Both Together</div>
              <div className="text-2xl font-extrabold text-white mt-1">$1.59</div>
              <div className="text-xs text-indigo-300 mt-1">Save $0.39</div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 shadow-lg transition"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Why Pay Per Use?</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              No subscriptions, no surprises. You only pay when you run a check.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={item.title} className="bg-gray-50 p-8 rounded-2xl text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">What&apos;s Included</h2>
            <p className="mt-3 text-gray-600">Every check includes all features. No hidden tiers.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-sm font-semibold text-gray-900 px-6 py-4">Feature</th>
                  <th className="text-center text-sm font-semibold text-gray-900 px-4 py-4">
                    <ScanFace className="w-4 h-4 inline mr-1 text-indigo-600" />ID Verify
                  </th>
                  <th className="text-center text-sm font-semibold text-gray-900 px-4 py-4">
                    <Search className="w-4 h-4 inline mr-1 text-purple-600" />Screening
                  </th>
                  <th className="text-center text-sm font-semibold text-gray-900 px-4 py-4">
                    <Layers className="w-4 h-4 inline mr-1 text-indigo-600" />Bundle
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
                  <tr key={row.feature} className="border-b border-gray-50">
                    <td className="text-sm text-gray-700 px-6 py-3">{row.feature}</td>
                    {[row.idv, row.screen, row.bundle].map((val, i) => (
                      <td key={i} className="text-center px-4 py-3">
                        {typeof val === 'boolean' ? (
                          val ? (
                            <CheckCircle className="w-4 h-4 text-green-500 inline" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )
                        ) : (
                          <span className="text-sm font-semibold text-gray-900">{val}</span>
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
