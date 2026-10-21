import { Container } from '../site/Canvas';

const CAPABILITIES = [
  { title: 'Name Variants', desc: 'Muhammad, Mohammed, Mohamed, Muhamad — all recognized as the same name with our variant database.' },
  { title: 'Phonetic Matching', desc: 'Soundex and Jaro-Winkler algorithms catch names that sound similar despite different spellings.' },
  { title: 'Transliteration', desc: 'Match names across scripts: Cyrillic, Arabic, Chinese, and other non-Latin characters.' },
  { title: 'Date of Birth Matching', desc: 'Fuzzy DOB matching with exact, year-only, and approximate date modes.' },
  { title: 'Identifier Matching', desc: 'Exact passport, national ID, and tax ID matching for definitive identification.' },
  { title: 'Composite Scoring', desc: 'Weighted score combining name, DOB, nationality, and identifier matches for confidence.' },
];

const VARIANTS = ['Muhammad', 'Mohammed', 'Mohamed', 'Muhamad'];

export function SmartMatching() {
  return (
    <section className="border-t border-border bg-surface-elevated px-0 md:px-12">
      <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="px-6 md:px-8 lg:col-span-5">
          <h2 className="text-2xl leading-tight sm:text-[2rem]">Find Real Matches, Reduce False Positives</h2>
          <p className="mt-5 max-w-md text-base leading-[1.75] text-muted">
            Our matching engine uses multiple algorithms in parallel to catch matches a simple text search would miss.
          </p>
          <figure className="mt-10 max-w-sm rounded-lg border border-border-emphasized bg-background font-mono text-[0.8125rem]" aria-label="Example of name variants matched to one entity">
            <figcaption className="border-b border-border px-4 py-2.5 font-sans text-xs text-tertiary">Smart Matching Technology</figcaption>
            {VARIANTS.map((v, i) => (
              <div key={v} className="flex items-center justify-between border-b border-border px-4 py-2.5 last:border-b-0">
                <span className="text-foreground">{v}</span>
                <span className="text-tertiary">{i === 0 ? 'query' : `variant ${i}`}</span>
              </div>
            ))}
          </figure>
        </div>
        <dl className="px-6 md:px-8 lg:col-span-7">
          <div className="border-t border-foreground/80" />
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-medium text-foreground-highlight">{c.title}</dt>
              <dd className="text-[0.9375rem] leading-[1.7] text-muted">{c.desc}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
