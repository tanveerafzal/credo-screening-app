import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTABanner } from '@/components/marketing/CTABanner';
import { JOBS } from '@/lib/jobs';
import Link from 'next/link';
import {
  ArrowRight, MapPin, Clock, Building2, Users, Rocket,
  Globe, Heart, Shield
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | CredoScreening',
  description: 'Join CredoScreening and help build the compliance infrastructure for a digital-first world. View open positions.',
};

const PERKS = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Medical, dental, and vision coverage for you and your family.' },
  { icon: Globe, title: 'Remote-First', desc: 'Work from anywhere in the US or Canada. We care about results, not office hours.' },
  { icon: Rocket, title: 'Equity', desc: 'Meaningful ownership in a company with strong product-market fit.' },
  { icon: Clock, title: 'Unlimited PTO', desc: 'Take the time you need to recharge. We trust you to manage your schedule.' },
  { icon: Building2, title: 'Home Office', desc: 'Stipend to set up your ideal workspace at home.' },
  { icon: Users, title: 'Team Offsites', desc: 'Regular in-person offsites to connect, collaborate, and have fun.' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
            <Shield className="w-3.5 h-3.5" /> We&apos;re Hiring
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            Help build the future of<br />
            <span className="text-accent">compliance screening</span>
          </h1>
          <p className="mt-5 text-lg text-text-secondary max-w-2xl mx-auto">
            We&apos;re a small, fast-moving team building the compliance infrastructure that regulated businesses rely on.
            Join us and make a real impact from day one.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary">Open Positions</h2>
            <p className="mt-3 text-text-secondary">
              {JOBS.length} open role{JOBS.length !== 1 ? 's' : ''} — all remote across the US & Canada.
            </p>
          </div>

          <div className="space-y-4">
            {JOBS.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="group block bg-surface rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 p-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                      <job.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">{job.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{job.shortDesc}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                          <Building2 className="w-3.5 h-3.5" /> {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                          <Clock className="w-3.5 h-3.5" /> {job.employmentType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent flex-shrink-0 mt-1 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why CredoScreening */}
      <section className="py-24 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-text-primary">Why CredoScreening?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              We&apos;re building something that matters — and we take care of the people building it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((perk) => (
              <div key={perk.title} className="bg-surface p-6 rounded-xl border border-border">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4">
                  <perk.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{perk.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary">About CredoScreening</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                CredoScreening helps businesses screen individuals and organizations against 1.2M+ entities from OFAC, global sanctions,
                PEP databases, and 80+ watchlists — all in under 3 seconds.
              </p>
              <p className="mt-3 text-text-secondary leading-relaxed">
                We also provide identity verification with government ID scanning, facial matching, and liveness detection across 200+ countries.
                A sister company of TrustCredo, we&apos;re building the compliance infrastructure that regulated industries depend on.
              </p>
            </div>
            <div className="bg-surface-elevated rounded-xl border border-border p-8">
              <div className="space-y-5">
                {[
                  { label: 'Entities screened against', value: '1.2M+' },
                  { label: 'Global watchlists', value: '80+' },
                  { label: 'Countries for ID verification', value: '200+' },
                  { label: 'Average response time', value: '<3 seconds' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{stat.label}</span>
                    <span className="text-sm font-bold text-accent">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
