import { Section, SectionHeader } from '../site/Canvas';

const COVERAGE = [
  {
    title: 'Global Sanctions Lists',
    stat: '75+ lists',
    desc: 'OFAC SDN, OFAC Consolidated, EU Financial Sanctions, UN Security Council, UK OFSI, and 70+ other sanctions lists from 30+ jurisdictions. Refreshed every 60 minutes for critical lists.',
  },
  {
    title: 'PEP Data',
    stat: '1M+ records',
    desc: 'Politically Exposed Persons including heads of state, parliament members, senior government officials, and their family members and close associates worldwide.',
  },
  {
    title: 'Criminal Watchlists',
    stat: 'Global coverage',
    desc: 'Interpol Red and Yellow Notices, FBI Most Wanted, Europol Most Wanted, US Marshals, DEA Most Wanted, and national criminal databases.',
  },
  {
    title: 'Adverse Media',
    stat: 'GDELT + more',
    desc: 'Global news monitoring via GDELT Project. Identify subjects mentioned in negative news, fraud allegations, corruption, and financial crime coverage.',
  },
];

export function DataCoverage() {
  return (
    <Section innerClassName="pb-0 md:pb-0">
      <SectionHeader
        title="Comprehensive Data Coverage"
        body={<p>Screen against the world&apos;s most comprehensive watchlist database, aggregated from 80+ official sources.</p>}
      />
      <div className="cells-clip border-t border-border">
      <ul className="cells md:grid-cols-2">
        {COVERAGE.map((c) => (
          <li key={c.title} className="px-6 py-8 md:px-8 md:py-10">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em]">{c.title}</h3>
              <span className="font-mono text-xs text-teal-ink">{c.stat}</span>
            </div>
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-muted">{c.desc}</p>
          </li>
        ))}
      </ul>
      </div>
    </Section>
  );
}
