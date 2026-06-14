import { Sparkles, Globe2, Volume2, Calendar, Hash, Users } from 'lucide-react';

const CAPABILITIES = [
  { icon: Sparkles, title: 'Name Variants', desc: 'Muhammad, Mohammed, Mohamed, Muhamad — all recognized as the same name with our variant database.' },
  { icon: Volume2, title: 'Phonetic Matching', desc: 'Soundex and Jaro-Winkler algorithms catch names that sound similar despite different spellings.' },
  { icon: Globe2, title: 'Transliteration', desc: 'Match names across scripts: Cyrillic, Arabic, Chinese, and other non-Latin characters.' },
  { icon: Calendar, title: 'Date of Birth Matching', desc: 'Fuzzy DOB matching with exact, year-only, and approximate date modes.' },
  { icon: Hash, title: 'Identifier Matching', desc: 'Exact passport, national ID, and tax ID matching for definitive identification.' },
  { icon: Users, title: 'Composite Scoring', desc: 'Weighted score combining name, DOB, nationality, and identifier matches for confidence.' },
];

export function SmartMatching() {
  return (
    <section className="py-14 sm:py-16 bg-surface-elevated relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-4 border border-accent/10">
            <Sparkles className="w-3.5 h-3.5" /> Smart Matching Technology
          </div>
          <h2 className="text-3xl font-bold text-text-primary">Find Real Matches, Reduce False Positives</h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Our matching engine uses multiple algorithms in parallel to catch matches a simple text search would miss.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="bg-surface p-5 rounded-xl border border-border">
              <div className="flex items-center gap-2.5 mb-2">
                <c.icon className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-text-primary">{c.title}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
