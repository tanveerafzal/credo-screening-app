import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

export function FeatureGrid({ title = 'Key Features', subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-10 sm:py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
          {subtitle && <p className="mt-3 text-text-secondary max-w-xl mx-auto">{subtitle}</p>}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group bg-surface p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
              <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-base font-semibold text-text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
