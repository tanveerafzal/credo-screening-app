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
import { CheckGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
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
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title={`Compliance Challenges for ${industry.label}`}
          body={<p>We understand the specific compliance pressures facing your industry.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells md:grid-cols-3">
            {industry.painPoints.map((p, i) => (
              <li key={p.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Use Cases */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12">
          <div className="px-6 md:px-8 lg:col-span-4">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">Common Use Cases</h2>
          </div>
          <ul className="mx-6 border-y border-border md:mx-8 lg:col-span-8 lg:ml-0">
            {industry.useCases.map((uc) => (
              <li key={uc} className="flex items-center gap-3 border-b border-border py-4 text-base text-foreground last:border-b-0">
                <CheckGlyph />
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </Container>
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
