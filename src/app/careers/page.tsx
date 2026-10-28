import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTABanner } from '@/components/marketing/CTABanner';
import { JOBS } from '@/lib/jobs';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description: `Join ${BRAND.name} and help build AML screening and compliance infrastructure for regulated industries.`,
  path: '/careers',
});

const PERKS = [
  { title: 'Health & Wellness', desc: 'Medical, dental, and vision coverage for you and your family.' },
  { title: 'Remote-First', desc: 'Work from anywhere in the US or Canada. We care about results, not office hours.' },
  { title: 'Equity', desc: 'Meaningful ownership in a company with strong product-market fit.' },
  { title: 'Unlimited PTO', desc: 'Take the time you need to recharge. We trust you to manage your schedule.' },
  { title: 'Home Office', desc: 'Stipend to set up your ideal workspace at home.' },
  { title: 'Team Offsites', desc: 'Regular in-person offsites to connect, collaborate, and have fun.' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-0 md:px-12">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
        </div>
        <Container className="relative">
          <div className="max-w-2xl px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
            <Breadcrumb items={[{ label: 'Careers' }]} />
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">
              Help build the future of<br />
              compliance screening
            </h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
              We&apos;re a small, fast-moving team building the compliance infrastructure that regulated businesses rely on.
              Join us and make a real impact from day one.
            </p>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <Section id="positions" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Open Positions"
          body={<p>{JOBS.length} open role{JOBS.length !== 1 ? 's' : ''} — all remote across the US & Canada.</p>}
        />
        <ul className="border-t border-border">
          {JOBS.map((job) => (
            <li key={job.slug} className="border-b border-border last:border-b-0">
              <Link
                href={`/careers/${job.slug}`}
                className="group grid gap-4 px-6 py-8 transition-colors hover:bg-foreground/[0.02] md:grid-cols-12 md:items-baseline md:gap-6 md:px-8"
              >
                <div className="md:col-span-6">
                  <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em] group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-4">
                    {job.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.9375rem] leading-[1.65] text-muted">{job.shortDesc}</p>
                </div>
                <dl className="grid grid-cols-3 gap-4 font-mono text-xs text-tertiary md:col-span-5">
                  <div>
                    <dt className="sr-only">Team</dt>
                    <dd>{job.department}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd>{job.location}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Type</dt>
                    <dd>{job.employmentType}</dd>
                  </div>
                </dl>
                <span className="hidden justify-end text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground md:col-span-1 md:flex">
                  <ArrowGlyph />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Why Credo */}
      <Section tone="tint" innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title={`Why ${BRAND.name}?`}
          body={<p>We&apos;re building something that matters — and we take care of the people building it.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((perk, i) => (
              <li key={perk.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{perk.title}</h3>
                <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">{perk.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* About */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">About {BRAND.name}</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              {BRAND.name} helps businesses screen individuals and organizations against 1.2M+ entities from OFAC, global sanctions,
              PEP databases, and 80+ watchlists — all in under 3 seconds.
            </p>
            <p className="mt-4 max-w-xl text-base leading-[1.75] text-muted">
              We also provide identity verification with government ID scanning, facial matching, and liveness detection across 200+ countries.{' '}
              {BRAND.name} is operated by {BRAND.legalEntity}, carrying on business as {BRAND.registeredName}.
            </p>
          </div>
          <div className="cells-clip border-t border-border lg:col-span-5 lg:border-t-0">
            <dl className="cells h-full grid-cols-2">
              {[
                { label: 'Entities screened against', value: '1.2M+' },
                { label: 'Global watchlists', value: '80+' },
                { label: 'Countries for ID verification', value: '200+' },
                { label: 'Average response time', value: '<3 seconds' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col justify-end px-6 py-10 md:px-8">
                  <dt className="order-2 mt-2 font-mono text-xs text-tertiary">{stat.label}</dt>
                  <dd className="order-1 text-3xl font-medium tracking-[-0.045em] text-foreground-highlight sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <CTABanner
        title="Don't see a role that fits?"
        subtitle="We're always looking for talented people. Send us your resume and tell us how you'd contribute."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Products"
        secondaryHref="/products"
      />

      <Footer />
    </>
  );
}
