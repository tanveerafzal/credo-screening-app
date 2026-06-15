import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JOBS, JOBS_MAP } from '@/lib/jobs';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, MapPin, Clock, Building2, DollarSign,
  CheckCircle, Star, Sparkles
} from 'lucide-react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { BRAND } from '@/lib/brand';

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

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> All Positions
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">{job.title}</h1>
          <p className="mt-3 text-lg text-text-secondary">{job.shortDesc}</p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary bg-surface-elevated px-3 py-1.5 rounded-lg border border-border">
              <Building2 className="w-4 h-4 text-text-muted" /> {job.department}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary bg-surface-elevated px-3 py-1.5 rounded-lg border border-border">
              <MapPin className="w-4 h-4 text-text-muted" /> {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary bg-surface-elevated px-3 py-1.5 rounded-lg border border-border">
              <Clock className="w-4 h-4 text-text-muted" /> {job.employmentType}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary bg-surface-elevated px-3 py-1.5 rounded-lg border border-border">
              <DollarSign className="w-4 h-4 text-text-muted" /> {job.compensation}
            </span>
          </div>

          <div className="mt-8">
            <Link
              href={`/contact?role=${encodeURIComponent(job.title)}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">About the Role</h2>
                {job.about.split('\n\n').map((p, i) => (
                  <p key={i} className="text-text-secondary leading-relaxed mb-3">{p}</p>
                ))}
              </div>

              {/* Responsibilities */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">What you&apos;ll do</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">What you&apos;ll bring</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">Nice to have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Join */}
              <div className="bg-surface-elevated rounded-xl border border-border p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">Why {BRAND.name}</h3>
                <div className="space-y-4">
                  {job.whyJoin.map((item, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-surface-elevated rounded-xl border border-border p-6">
                <h3 className="text-base font-bold text-text-primary mb-4">Benefits</h3>
                <ul className="space-y-2.5">
                  {[
                    'Competitive salary + equity',
                    'Health, dental & vision',
                    'Unlimited PTO',
                    'Remote-first culture',
                    'Professional development budget',
                    'Home office stipend',
                    'Company offsites',
                  ].map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply CTA */}
              <div className="bg-accent-subtle rounded-xl border border-accent/10 p-6 text-center">
                <h3 className="text-base font-bold text-text-primary mb-2">Interested?</h3>
                <p className="text-xs text-text-secondary mb-4">Send us your resume and a short note about why you&apos;re excited about this role.</p>
                <Link
                  href={`/contact?role=${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition-colors text-sm"
                >
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
