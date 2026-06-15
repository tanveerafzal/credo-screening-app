'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  title?: string;
  items: Array<{ q: string; a: string }>;
  compactTop?: boolean;
}

export function FAQ({ title = 'Frequently Asked Questions', items, compactTop = false }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`${compactTop ? 'pt-6 pb-10 sm:pt-8 sm:pb-12' : 'py-10 sm:py-12'} bg-surface`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-elevated transition-colors"
              >
                <span className="font-semibold text-text-primary text-sm">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-text-muted flex-shrink-0 ml-4 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
