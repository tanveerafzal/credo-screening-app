import Link from 'next/link';
import { SOLUTIONS_LIST } from '@/lib/solutions';
import { ArrowGlyph, Section, SectionHeader } from '../site/Canvas';

interface SolutionsGridProps {
  currentSlug?: string;
  title?: string;
}

export function SolutionsGrid({ currentSlug, title = 'Solutions for Any Workflow' }: SolutionsGridProps) {
  const solutions = currentSlug ? SOLUTIONS_LIST.filter((s) => s.slug !== currentSlug) : SOLUTIONS_LIST;

  return (
    <Section innerClassName="pb-0 md:pb-0">
      <SectionHeader
        title={title}
        body={<p>One platform, multiple ways to integrate screening into your compliance workflow.</p>}
      />
      <div className="cells-clip border-t border-border">
      <ul className={`cells sm:grid-cols-2 ${solutions.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
        {solutions.map((s) => (
          <li key={s.slug}>
            <Link href={`/solutions/${s.slug}`} className="group flex h-full flex-col px-6 py-8 transition-colors hover:bg-foreground/[0.02] md:px-8">
              <h3 className="text-base leading-snug tracking-[-0.015em] group-hover:underline group-hover:underline-offset-4">{s.label}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.shortDesc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal-ink">
                Learn more <ArrowGlyph className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </Section>
  );
}
