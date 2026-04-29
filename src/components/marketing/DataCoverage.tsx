import { Shield, Users, AlertCircle, Newspaper } from 'lucide-react';

const COVERAGE = [
  {
    icon: Shield,
    title: 'Global Sanctions Lists',
    stat: '75+ lists',
    desc: 'OFAC SDN, OFAC Consolidated, EU Financial Sanctions, UN Security Council, UK OFSI, and 70+ other sanctions lists from 30+ jurisdictions. Refreshed every 60 minutes for critical lists.',
    color: 'red',
  },
  {
    icon: Users,
    title: 'PEP Data',
    stat: '1M+ records',
    desc: 'Politically Exposed Persons including heads of state, parliament members, senior government officials, and their family members and close associates worldwide.',
    color: 'violet',
  },
  {
    icon: AlertCircle,
    title: 'Criminal Watchlists',
    stat: 'Global coverage',
    desc: 'Interpol Red and Yellow Notices, FBI Most Wanted, Europol Most Wanted, US Marshals, DEA Most Wanted, and national criminal databases.',
    color: 'orange',
  },
  {
    icon: Newspaper,
    title: 'Adverse Media',
    stat: 'GDELT + more',
    desc: 'Global news monitoring via GDELT Project. Identify subjects mentioned in negative news, fraud allegations, corruption, and financial crime coverage.',
    color: 'teal',
  },
];

const colorMap: Record<string, { bg: string; icon: string; stat: string }> = {
  red: { bg: 'bg-red-50 border-red-100', icon: 'text-red-600', stat: 'bg-red-100 text-red-700' },
  violet: { bg: 'bg-violet-50 border-violet-100', icon: 'text-violet-600', stat: 'bg-violet-100 text-violet-700' },
  orange: { bg: 'bg-orange-50 border-orange-100', icon: 'text-orange-600', stat: 'bg-orange-100 text-orange-700' },
  teal: { bg: 'bg-teal-50 border-teal-100', icon: 'text-teal-600', stat: 'bg-teal-100 text-teal-700' },
};

export function DataCoverage() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary">Comprehensive Data Coverage</h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Screen against the world's most comprehensive watchlist database, aggregated from 80+ official sources.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {COVERAGE.map((c) => (
            <div key={c.title} className={`p-6 rounded-xl border ${colorMap[c.color].bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <c.icon className={`w-5 h-5 ${colorMap[c.color].icon}`} />
                <h3 className="text-base font-bold text-text-primary">{c.title}</h3>
                <span className={`ml-auto text-xs font-semibold px-2.5 py-0.5 rounded-md ${colorMap[c.color].stat}`}>{c.stat}</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
