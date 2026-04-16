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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            One platform, multiple ways to integrate screening into your compliance workflow.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{s.label}</h3>
              <p className="mt-1 text-xs text-gray-500 leading-snug">{s.shortDesc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:gap-1.5 transition-all">
                Learn more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
