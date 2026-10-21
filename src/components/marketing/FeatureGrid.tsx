import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Index, Section, SectionHeader } from '../site/Canvas';
import { Reveal } from '../site/motion';

interface Feature {
  icon?: LucideIcon;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  /** Fills the last row when the grid has an empty cell. */
  filler?: ReactNode;
  tone?: 'plain' | 'tint';
}

/** Ruled grid of features. Shared edges are owned once: cells draw right/bottom rules. */
export function FeatureGrid({ title = 'Key Features', subtitle, features, filler, tone }: FeatureGridProps) {
  const cols = features.length % 3 === 0 || features.length > 4 ? 3 : 2;
  const remainder = features.length % cols;
  return (
    <Section tone={tone} innerClassName="pb-0 md:pb-0">
      <SectionHeader title={title} body={subtitle ? <p>{subtitle}</p> : undefined} />
      <FeatureCells features={features} cols={cols} filler={remainder && filler ? filler : null} />
    </Section>
  );
}

export function FeatureCells({ features, cols = 3, filler }: { features: Feature[]; cols?: 2 | 3; filler?: ReactNode }) {
  return (
    <div className="cells-clip border-t border-border">
    <Reveal as="ul" className={`reveal-cells cells sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''}`}>
      {features.map((f, i) => (
        <li
          key={f.title}
          className="px-6 py-8 md:px-8 md:py-10"
        >
          <Index n={i + 1} />
          <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{f.title}</h3>
          <p className="mt-2.5 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">{f.desc}</p>
        </li>
      ))}
      {filler ? <li className={`relative hidden min-h-48 overflow-hidden sm:block ${cols === 3 ? 'lg:col-span-2' : ''}`}>{filler}</li> : null}
    </Reveal>
    </div>
  );
}
