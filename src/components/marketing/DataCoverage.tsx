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
    color: 'purple',
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

const colorMap: Record<string, string> = {
  red: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
};

export function DataCoverage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">Comprehensive Data Coverage</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Screen against the world's most comprehensive watchlist database, aggregated from 80+ official sources.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {COVERAGE.map((c) => (
            <div key={c.title} className={`p-6 rounded-2xl border ${colorMap[c.color]}`}>
              <div className="flex items-center gap-3 mb-3">
                <c.icon className="w-6 h-6" />
                <h3 className="text-lg font-bold">{c.title}</h3>
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 bg-white/60 rounded-full">{c.stat}</span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
