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
import { pageMetadata } from '@/lib/seo';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return INDUSTRIES_LIST.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const i = INDUSTRIES[slug];
  if (!i) return {};
  return pageMetadata({
    title: `${i.label} AML Screening`,
    description: i.hero.subtitle,
    path: `/industries/${slug}`,
    keywords: [`${i.label} screening`, 'AML compliance', 'sanctions screening', i.label.toLowerCase()],
  });
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
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Compliance Challenges for {industry.label}</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              We understand the specific compliance pressures facing your industry.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {industry.painPoints.map((p) => (
              <div key={p.title} className="bg-surface p-6 rounded-xl border border-border">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-10">Common Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {industry.useCases.map((uc) => (
              <div key={uc} className="flex items-center gap-3 p-4 bg-surface-elevated rounded-lg border border-border">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-text-primary">{uc}</span>
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
      />

      <Footer />
    </>
  );
}
