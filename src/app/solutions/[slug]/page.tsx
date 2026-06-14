import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/marketing/PageHero';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { DataCoverage } from '@/components/marketing/DataCoverage';
import { SmartMatching } from '@/components/marketing/SmartMatching';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import { SOLUTIONS, SOLUTIONS_LIST } from '@/lib/solutions';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SOLUTIONS_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTIONS[slug];
  if (!s) return {};
  return {
    title: `${s.label} | Credo`,
    description: s.hero.subtitle,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS[slug];
  if (!solution) notFound();

  return (
    <>
      <Navbar />

      <PageHero
        badge={solution.hero.badge}
        title={solution.hero.title}
        subtitle={solution.hero.subtitle}
      />

      <StatsBar />

      <FeatureGrid
        title="Everything You Need"
        subtitle="Built for compliance teams that demand reliability, speed, and comprehensive coverage."
        features={solution.features}
      />

      {/* Feature Deep-Dives */}
      {solution.deepDives.map((d, i) => (
        <section key={i} className={`py-14 sm:py-16 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-elevated'}`}>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-text-primary mb-4">{d.title}</h2>
            <p className="text-text-secondary leading-relaxed text-lg">{d.desc}</p>
            {d.bullets && (
              <ul className="mt-6 space-y-3">
                {d.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <DataCoverage />
      <SmartMatching />
      <SolutionsGrid currentSlug={solution.slug} />
      <FAQ items={solution.faqs} />
      <CTABanner />

      <Footer />
    </>
  );
}
