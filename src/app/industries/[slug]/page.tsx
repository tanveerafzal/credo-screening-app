import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/marketing/PageHero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { DataCoverage } from '@/components/marketing/DataCoverage';
import { SmartMatching } from '@/components/marketing/SmartMatching';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { CTABanner } from '@/components/marketing/CTABanner';
import { INDUSTRIES, INDUSTRIES_LIST } from '@/lib/industries';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return INDUSTRIES_LIST.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = INDUSTRIES[slug];
  if (!i) return {};
  return {
    title: `${i.label} Screening | CredoScreening`,
    description: i.hero.subtitle,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) notFound();

  return (
    <>
      <Navbar />

      <PageHero
        badge={industry.hero.badge}
        title={industry.hero.title}
        subtitle={industry.hero.subtitle}
      />

      <StatsBar />

      {/* Pain Points */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Compliance Challenges for {industry.label}</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              We understand the specific compliance pressures facing your industry.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {industry.painPoints.map((p) => (
              <div key={p.title} className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Common Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {industry.useCases.map((uc) => (
              <div key={uc} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{uc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DataCoverage />
      <SmartMatching />
      <SolutionsGrid />
      <CTABanner
        title={`Ready to screen for your ${industry.label.toLowerCase()} business?`}
        subtitle="First month free — up to 10 verifications & 10 screenings. No credit card required."
      />

      <Footer />
    </>
  );
}
