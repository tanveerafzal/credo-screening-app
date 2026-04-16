'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  title?: string;
  items: Array<{ q: string; a: string }>;
}

export function FAQ({ title = 'Frequently Asked Questions', items }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
