import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { Shield, Globe, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Logo size={48} className="justify-center mb-6" />
            <h1 className="text-4xl font-extrabold text-gray-900">About CredoScreening</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We help businesses stay compliant by screening individuals and organizations against
              the world's most comprehensive watchlist database.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              CredoScreening was founded with a simple mission: make compliance screening accessible to every business,
              regardless of size. We believe that robust AML, sanctions, and PEP screening shouldn't require enterprise-level
              budgets or months of integration work.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform screens against <strong>1.2 million+ entities</strong> from <strong>80+ global sources</strong>,
              including OFAC, EU, UN, and UK sanctions lists, PEP databases, Interpol notices, and regulatory debarment lists.
              Results are delivered in seconds through a simple API or our web interface.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Security First', desc: 'All data encrypted in transit and at rest. HMAC-signed webhooks. No PII stored beyond what\'s needed for screening.' },
                { icon: Zap, title: 'Speed & Reliability', desc: 'Sub-3-second response times with 99.9% uptime. Critical watchlists updated hourly so you\'re always screening against the latest data.' },
                { icon: Globe, title: 'Global Coverage', desc: 'Sanctions, PEP, and criminal databases from the US, EU, UK, UN, Australia, Canada, Switzerland, and 70+ more jurisdictions.' },
                { icon: Users, title: 'Developer Friendly', desc: 'Simple REST API — send a name, get results. Webhook callbacks, CSV export, and comprehensive documentation.' },
              ].map(v => (
                <div key={v.title} className="bg-white p-6 rounded-2xl border border-gray-100">
                  <v.icon className="w-8 h-8 text-indigo-600 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TrustCredo */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Powered by TrustCredo</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              CredoScreening is a sister company of <a href="https://trustcredo.com" className="text-indigo-600 font-medium hover:underline">TrustCredo</a>,
              a trusted identity verification platform used by businesses across North America. TrustCredo provides
              AI-powered ID document verification, biometric face matching, and liveness detection.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Together, TrustCredo and CredoScreening offer a complete KYC/AML solution — from identity verification
              to watchlist screening — through a single integration.
            </p>
            <div className="flex gap-4">
              <a href="https://trustcredo.com" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline">
                Visit TrustCredo <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline">
                Contact Us <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-indigo-600">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '1.2M+', label: 'Entities' },
                { value: '80+', label: 'Data Sources' },
                { value: '<3s', label: 'Response Time' },
                { value: '24/7', label: 'Monitoring' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-white">{s.value}</div>
                  <div className="text-sm text-indigo-200 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
