import { Database, Globe, Clock, Shield } from 'lucide-react';

export function StatsBar() {
  const stats = [
    { value: '1.2M+', label: 'Entities Screened Against', icon: Database },
    { value: '80+', label: 'Global Data Sources', icon: Globe },
    { value: '<3s', label: 'Average Response Time', icon: Clock },
    { value: '99.9%', label: 'Uptime SLA', icon: Shield },
  ];

  return (
    <section className="py-8 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-subtle mb-3">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">{s.value}</div>
              <div className="text-sm text-text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
