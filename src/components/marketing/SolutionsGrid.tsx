import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SOLUTIONS_LIST } from '@/lib/solutions';

interface SolutionsGridProps {
  currentSlug?: string;
  title?: string;
}

export function SolutionsGrid({ currentSlug, title = 'Solutions for Any Workflow' }: SolutionsGridProps) {
  const solutions = currentSlug
    ? SOLUTIONS_LIST.filter((s) => s.slug !== currentSlug)
    : SOLUTIONS_LIST;

  return (
    <section className="py-24 bg-surface-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            One platform, multiple ways to integrate screening into your compliance workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group bg-surface p-5 rounded-xl border border-border hover:border-accent/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">{s.label}</h3>
              <p className="mt-1 text-xs text-text-muted leading-snug">{s.shortDesc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-1.5 transition-all">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
