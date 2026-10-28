import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BRAND } from '@/lib/brand';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowGlyph, Container, Index, Section, TextLink } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import { LandscapeBand } from '@/components/site/LandscapeBand';
import { TrustSection } from '@/components/site/TrustSection';
import { StatsBar } from '@/components/marketing/StatsBar';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: `Learn about ${BRAND.name} — AML and sanctions screening against 1.2M+ watchlist entities, operated by ${BRAND.legalEntity} as ${BRAND.registeredName}.`,
  path: '/about',
});

const VALUES = [
  { title: 'Security First', desc: 'All data encrypted in transit and at rest. HMAC-signed webhooks. No PII stored beyond what\'s needed for screening.' },
  { title: 'Speed & Reliability', desc: 'Sub-3-second response times with 99.9% uptime. Critical watchlists updated hourly so you\'re always screening against the latest data.' },
  { title: 'Global Coverage', desc: 'Sanctions, PEP, and criminal databases from the US, EU, UK, UN, Australia, Canada, Switzerland, and 70+ more jurisdictions.' },
  { title: 'Developer Friendly', desc: 'Simple REST API — send a name, get results. Webhook callbacks, CSV export, and comprehensive documentation.' },
];

const strong = 'font-medium text-foreground';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-0 md:px-12">
          <div className="absolute inset-0 opacity-70" aria-hidden="true">
            <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
          </div>
          <Container className="relative">
            <div className="max-w-2xl px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
              <Breadcrumb items={[{ label: 'About' }]} />
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">About {BRAND.name}</h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                We help businesses stay compliant by screening individuals and organizations against
                the world&apos;s most comprehensive watchlist database.
              </p>
            </div>
          </Container>
        </section>

        {/* Mission */}
        <Section>
          <div className="grid gap-8 px-6 md:px-8 lg:grid-cols-12">
            <h2 className="text-2xl leading-tight sm:text-[2rem] lg:col-span-4">Our Mission</h2>
            <div className="max-w-2xl space-y-5 text-base leading-[1.75] text-muted lg:col-span-8">
              <p>
                {BRAND.name}{' '}was founded with a simple mission: make compliance screening accessible to every business,
                regardless of size. We believe that robust AML, sanctions, and PEP screening shouldn&apos;t require enterprise-level
                budgets or months of integration work.
              </p>
              <p>
                Our platform screens against <strong className={strong}>1.2 million+ entities</strong> from <strong className={strong}>80+ global sources</strong>,
                including OFAC, EU, UN, and UK sanctions lists, PEP databases, Interpol notices, and regulatory debarment lists.
                Results are delivered in seconds through a simple API or our web interface.
              </p>
            </div>
          </div>
        </Section>

        {/* Values */}
        <Section tone="tint" innerClassName="pb-0 md:pb-0">
          <div className="mb-12 max-w-2xl px-6 md:mb-16 md:px-8">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">What We Stand For</h2>
          </div>
          <div className="cells-clip border-t border-border">
            <ul className="cells sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <li key={v.title} className="px-6 py-8 md:px-8 md:py-10">
                  <Index n={i + 1} />
                  <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{v.title}</h3>
                  <p className="mt-2.5 max-w-md text-[0.9375rem] leading-[1.7] text-muted">{v.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Who we are */}
        <Section>
          <div className="grid gap-8 px-6 md:px-8 lg:grid-cols-12">
            <h2 className="text-2xl leading-tight sm:text-[2rem] lg:col-span-4">Who We Are</h2>
            <div className="max-w-2xl lg:col-span-8">
              <div className="space-y-5 text-base leading-[1.75] text-muted">
                <p>
                  {BRAND.name} is operated by <strong className={strong}>{BRAND.legalEntity}</strong>, carrying on business under the
                  registered name <strong className={strong}>{BRAND.registeredName}</strong> in Ontario, Canada.
                </p>
                <p>
                  Under {BRAND.registeredName}, we deliver the full compliance stack — sanctions and watchlist screening,
                  identity verification, and identity-verified electronic signatures — through one platform and API.
                </p>
                <p>
                  Our partner portal, SDK, and verification flows run on {BRAND.registeredName} infrastructure at{' '}
                  <a href={BRAND.partnerPortal} className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">partner.trustcredo.com</a>.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                <TextLink href={BRAND.partnerPortal}>Partner Portal <ArrowGlyph /></TextLink>
                <TextLink href="/contact">Contact Us <ArrowGlyph /></TextLink>
              </div>
            </div>
          </div>
        </Section>

        <LandscapeBand />
        <TrustSection />

        <StatsBar
          stats={[
            { value: '1.2M+', label: 'Entities' },
            { value: '80+', label: 'Data Sources' },
            { value: '<3s', label: 'Response Time' },
            { value: '24/7', label: 'Monitoring' },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
