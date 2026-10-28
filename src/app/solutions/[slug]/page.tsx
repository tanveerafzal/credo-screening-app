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
import { CheckGlyph, Container, Index } from '@/components/site/Canvas';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SOLUTIONS_LIST.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUTIONS[slug];
  if (!s) return {};
  return pageMetadata({
    title: s.label,
    description: s.hero.subtitle,
    path: `/solutions/${slug}`,
    keywords: [s.label, 'AML screening', 'sanctions screening', s.slug.replace(/-/g, ' ')],
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS[slug];
  if (!solution) notFound();

  return (
    <>
      <Navbar />

      <PageHero
        badge={solution.label}
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
        <section key={i} className="border-t border-border px-0 md:px-12">
          <Container className="grid gap-8 px-6 py-16 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <Index n={i + 1} />
              <h2 className="mt-4 max-w-md text-2xl leading-tight sm:text-[2rem]">{d.title}</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-2xl text-base leading-[1.75] text-muted sm:text-[1.0625rem]">{d.desc}</p>
              {d.bullets && (
                <ul className="mt-8 max-w-2xl border-t border-border">
                  {d.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 border-b border-border py-3.5 text-[0.9375rem] leading-[1.65] text-muted">
                      <CheckGlyph className="mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Container>
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
