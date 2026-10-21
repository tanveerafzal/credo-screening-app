import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JOBS, JOBS_MAP } from '@/lib/jobs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { BRAND } from '@/lib/brand';
import { Action, CheckGlyph, Container } from '@/components/site/Canvas';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS_MAP[slug];
  if (!job) return {};
  return pageMetadata({
    title: `${job.title} — Careers`,
    description: job.shortDesc,
    path: `/careers/${slug}`,
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = JOBS_MAP[slug];
  if (!job) notFound();

  const meta = [
    { label: 'Team', value: job.department },
    { label: 'Location', value: job.location },
    { label: 'Type', value: job.employmentType },
    { label: 'Compensation', value: job.compensation },
  ];

  const lists = [
    { title: <>What you&apos;ll do</>, items: job.responsibilities },
    { title: <>What you&apos;ll bring</>, items: job.requirements },
    { title: 'Nice to have', items: job.niceToHave },
  ];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="px-0 md:px-12">
        <Container>
          <div className="px-6 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
            <p className="mb-6 text-sm text-tertiary">
              <Link href="/careers" className="hover:text-foreground">
                <span aria-hidden="true">&larr; </span>All Positions
              </Link>
            </p>
            <h1 className="max-w-3xl text-[2.15rem] leading-[1.06] sm:text-5xl">{job.title}</h1>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">{job.shortDesc}</p>
            <div className="mt-8">
              <Action href={`/contact?role=${encodeURIComponent(job.title)}`} arrow>Apply Now</Action>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border px-0 md:px-12" aria-label="Role details">
        <Container>
          <div className="cells-clip">
            <dl className="cells grid-cols-2 md:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="px-6 py-6 md:px-8">
                  <dt className="font-mono text-xs text-tertiary">{m.label}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-foreground">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Job Content */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
        {/* Main Content */}
        <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-8">
          <div className="max-w-2xl space-y-14">
            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">About the Role</h2>
              <div className="space-y-4 text-base leading-[1.75] text-muted">
                {job.about.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {lists.map((list, li) => (
              <div key={li}>
                <h2 className="mb-4 text-xl leading-snug sm:text-2xl">{list.title}</h2>
                <ul className="border-t border-border">
                  {list.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 border-b border-border py-3.5 text-base leading-[1.7] text-muted">
                      <CheckGlyph className="mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="border-t border-border lg:col-span-4 lg:border-l lg:border-t-0">
          <div className="border-b border-border px-6 py-8 md:px-8">
            <h3 className="text-base leading-snug tracking-[-0.015em]">Why {BRAND.name}</h3>
            <div className="mt-5 space-y-5">
              {job.whyJoin.map((item, i) => (
                <div key={i}>
                  <h4 className="text-sm">{item.title}</h4>
                  <p className="mt-1 text-sm leading-[1.65] text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-border px-6 py-8 md:px-8">
            <h3 className="text-base leading-snug tracking-[-0.015em]">Benefits</h3>
            <ul className="mt-5 space-y-2.5">
              {[
                'Competitive salary + equity',
                'Health, dental & vision',
                'Unlimited PTO',
                'Remote-first culture',
                'Professional development budget',
                'Home office stipend',
                'Company offsites',
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                  <CheckGlyph className="mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-8 md:px-8">
            <h3 className="text-base leading-snug tracking-[-0.015em]">Interested?</h3>
            <p className="mt-2 text-sm leading-[1.65] text-muted">Send us your resume and a short note about why you&apos;re excited about this role.</p>
            <div className="mt-5">
              <Action href={`/contact?role=${encodeURIComponent(job.title)}`} size="sm" arrow>Apply Now</Action>
            </div>
          </div>
        </aside>
        </Container>
      </section>

      <Footer />
    </>
  );
}
