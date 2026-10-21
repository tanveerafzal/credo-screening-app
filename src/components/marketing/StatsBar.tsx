import { Container } from '../site/Canvas';
import { CountUp, Reveal } from '../site/motion';

export const DEFAULT_STATS = [
  { value: '1.2M+', label: 'Entities Screened Against' },
  { value: '80+', label: 'Global Data Sources' },
  { value: '<3s', label: 'Average Response Time' },
  { value: '99.9%', label: 'Uptime SLA' },
];

export function StatsBar({ stats = DEFAULT_STATS }: { stats?: Array<{ value: string; label: string }> }) {
  return (
    <section className="border-t border-border px-0 md:px-12">
      <Container>
        <div className="cells-clip">
        <Reveal as="dl" className="reveal-cells cells grid-cols-2 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-7 md:px-8 md:py-9">
              <dt className="font-mono text-xs text-tertiary">{s.label}</dt>
              <dd className="mt-2 text-3xl font-medium tracking-[-0.04em] text-foreground-highlight tabular-nums sm:text-[2.25rem]">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </Reveal>
        </div>
      </Container>
    </section>
  );
}
