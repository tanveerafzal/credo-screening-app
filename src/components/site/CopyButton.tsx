'use client';

import { useEffect, useRef, useState } from 'react';

/** Copies `text` to the clipboard and confirms inline for a moment. */
export function CopyButton({ text, label = 'Copy code' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable: the code is still selectable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      data-copied={copied || undefined}
      className="copy-button absolute right-2.5 top-2.5 inline-flex h-7 items-center gap-1.5 rounded-md border border-white/15 bg-night/80 px-2 font-mono text-[0.6875rem] text-white/70 hover:border-white/30 hover:text-white focus-visible:outline-teal"
    >
      <span className="copy-button__glyph" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12" className="copy-button__copy">
          <path d="M5.5 3.5h7v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 5.5h7v8h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg viewBox="0 0 16 16" width="12" height="12" className="copy-button__check">
          <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
        </svg>
      </span>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
