'use client';

import { useState } from 'react';
import { Container } from '../site/Canvas';

interface FAQProps {
  title?: string;
  items: Array<{ q: string; a: string }>;
  compactTop?: boolean;
}

export function FAQ({ title = 'Frequently Asked Questions', items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border px-0 md:px-12">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12">
        <div className="px-6 md:px-8 lg:col-span-4">
          <h2 className="text-2xl leading-tight sm:text-[2rem]">{title}</h2>
        </div>
        <div className="px-6 md:px-8 lg:col-span-8">
          <div className="border-y border-border">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-border last:border-b-0">
                  <h3 className="text-base tracking-normal">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left font-medium text-foreground-highlight transition-colors hover:text-teal-ink"
                    >
                      <span>{item.q}</span>
                      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="shrink-0 text-tertiary">
                        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 3v10" stroke="currentColor" strokeWidth="1.5" className={`origin-center transition-transform duration-200 ${isOpen ? 'scale-y-0' : ''}`} />
                      </svg>
                    </button>
                  </h3>
                  <div id={`faq-${i}`} hidden={!isOpen} className="max-w-2xl pb-6 text-[0.9375rem] leading-[1.75] text-muted">
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
