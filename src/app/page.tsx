import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import {
  Search, Globe, Zap, Lock, BarChart3,
  CheckCircle, ArrowRight, Database, ScanFace
} from 'lucide-react';
import { LogoIcon } from '@/components/Logo';

const SOURCES = [
  { category: 'Sanctions', items: ['OFAC SDN', 'OFAC Consolidated', 'EU Consolidated Sanctions', 'UN Security Council', 'UK OFSI', 'Australia DFAT', 'Canada SEMA', 'Switzerland SECO', 'Japan MOF', 'Singapore MAS', 'Hong Kong MAS'], color: 'red' },
  { category: 'PEP (Politically Exposed Persons)', items: ['OpenSanctions PEP', 'Wikidata Politicians', 'US Congress', 'UK Parliament', 'EU Parliament', 'EveryPolitician'], color: 'purple' },
  { category: 'Criminal / Law Enforcement', items: ['Interpol Red & Yellow Notices', 'FBI Most Wanted', 'DEA Most Wanted', 'US Marshals', 'Europol Most Wanted'], color: 'orange' },
  { category: 'Regulatory / Debarment', items: ['SEC Enforcement', 'SAM.gov Exclusions', 'OIG Exclusion List', 'BIS Entity List', 'World Bank Debarment', 'FCA Warnings (UK)', 'BaFin (Germany)', 'FINMA (Switzerland)', 'ASIC (Australia)'], color: 'blue' },
  { category: 'Country Risk', items: ['FATF High-Risk Lists', 'Basel AML Index', 'Transparency International CPI'], color: 'yellow' },
  { category: 'Adverse Media', items: ['GDELT Project', 'Global news monitoring'], color: 'teal' },
];

const FEATURES = [
  { icon: Zap, title: 'Instant Results', desc: 'Screen against 1.2M+ entities in under 3 seconds with fuzzy name matching' },
  { icon: Globe, title: '80+ Global Sources', desc: 'OFAC, EU, UN, UK, PEP databases, Interpol, and regulatory lists worldwide' },
  { icon: Lock, title: 'Bank-Grade Security', desc: 'All data encrypted in transit and at rest. HMAC-signed webhooks' },
  { icon: BarChart3, title: 'Smart Matching', desc: 'Name variant detection (Muhammad/Mohammed/Mohamed), phonetic matching, and composite scoring' },
  { icon: Database, title: 'Always Fresh', desc: 'Critical sanctions lists updated hourly. Full dataset refreshed every 4 hours automatically' },
  { icon: Search, title: 'Easy Integration', desc: 'Simple REST API. Send a name, get results. Webhook callbacks for async workflows' },
  { icon: ScanFace, title: 'ID Verification', desc: 'Verify real people with ID scan + selfie. Facial matching, liveness detection, 200+ countries supported' },
];

const colorMap: Record<string, string> = {
  red: 'bg-red-50 border-red-200 text-red-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800',
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  yellow: 'bg-amber-50 border-amber-200 text-amber-800',
  teal: 'bg-teal-50 border-teal-200 text-teal-800',
};

const badgeColorMap: Record<string, string> = {
  red: 'bg-red-100 text-red-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-amber-100 text-amber-700',
  teal: 'bg-teal-100 text-teal-700',
};

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-6">
            <LogoIcon size={16} /> Powered by TrustCredo
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Your Trusted<br />
            <span className="text-indigo-600">Background Check</span> Partner
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Screen against <strong>1.2 million+ entities</strong> from OFAC, global sanctions, PEP databases, and 80+ watchlists.
            Verify identities with <strong>ID scan + selfie</strong> in under 30 seconds. All in one platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/screening"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
            >
              Try Free Screening <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#sources"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 transition"
            >
              View Sources
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">10 free screenings per day. No credit card required.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1.2M+', label: 'Entities Screened Against' },
              { value: '200+', label: 'Countries for ID Verification' },
              { value: '<30s', label: 'Identity Verified' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Why CredoScreening?</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">Built for compliance teams, fintechs, and any business that needs reliable screening.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section id="sources" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Data Sources We Screen Against</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">Comprehensive coverage across sanctions, PEP, criminal, and regulatory databases worldwide.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOURCES.map((group) => (
              <div key={group.category} className={`p-5 rounded-2xl border ${colorMap[group.color]}`}>
                <h3 className="font-semibold text-sm mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColorMap[group.color]}`}>
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
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-gray-600">First month free. Pay per use. Scale as you grow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: '/month',
                badge: 'FIRST MONTH FREE',
                features: ['Pay per use after first month', 'All watchlist sources', 'Instant results', 'Web interface'],
                cta: 'Get Started',
                href: '/register',
                popular: false,
              },
              {
                name: 'Small Business',
                price: '$49',
                period: '/month',
                badge: 'FIRST MONTH FREE',
                features: ['All in Starter', 'REST API access', 'Webhook callbacks', 'CSV export', 'Priority support'],
                cta: 'Get Started',
                href: '/register',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                badge: null,
                features: ['Unlimited screenings', 'Continuous monitoring', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
                cta: 'Contact Us',
                href: '/contact?plan=enterprise',
                popular: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.popular ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 shadow-xl scale-105' : 'bg-white border border-gray-200'}`}>
                {plan.badge && <div className={`text-xs font-semibold mb-2 ${plan.popular ? 'text-indigo-200' : 'text-indigo-600'}`}>{plan.badge}</div>}
                <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mt-4">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-gray-500'}`}> {plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-indigo-200' : 'text-indigo-600'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`mt-8 block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition ${
                    plan.popular
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Per-Use Product Pricing */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Pay Per Use</h3>
              <p className="mt-2 text-gray-600 text-sm">Every plan uses the same per-check pricing. No hidden fees.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition">
                <ScanFace className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-gray-500">ID Verification</div>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">$0.99</div>
                <div className="text-xs text-gray-500 mt-1">per check</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition">
                <Search className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-sm font-medium text-gray-500">Background Screening</div>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">$0.99</div>
                <div className="text-xs text-gray-500 mt-1">per check</div>
              </div>
              <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 text-center hover:shadow-lg transition">
                <div className="flex items-center justify-center gap-1 mb-3">
                  <ScanFace className="w-6 h-6 text-indigo-600" />
                  <span className="text-indigo-400 font-bold">+</span>
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-sm font-medium text-indigo-600">Both Together</div>
                <div className="text-3xl font-extrabold text-gray-900 mt-1">$1.59</div>
                <div className="text-xs text-indigo-500 mt-1">per check · save 20%</div>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link href="/products" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
                View full product details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to screen?</h2>
          <p className="mt-4 text-indigo-200 text-lg">
            Try 10 free screenings today. No signup required.
          </p>
          <Link
            href="/screening"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 shadow-lg transition"
          >
            Start Screening <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
