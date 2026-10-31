'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { SOLUTIONS_LIST } from '@/lib/solutions';
import { INDUSTRIES_LIST } from '@/lib/industries';
import { BRAND } from '@/lib/brand';
import { Action, ArrowGlyph, cx } from './site/Canvas';

const PRODUCTS_LIST = [
  {
    slug: 'credo-onboarding',
    label: 'Digital Onboarding',
    shortDesc: 'Remote identity verification + AML screening in one flow.',
  },
  {
    slug: 'credo-id-verification',
    label: 'ID Verification',
    shortDesc: 'Government ID + selfie verification in under 30 seconds.',
  },
  {
    slug: 'screening',
    label: 'Screening',
    shortDesc: 'Screen against 1.2M+ entities from OFAC, sanctions & PEP lists.',
  },
  {
    slug: 'credo-trusted-signatures',
    label: 'Trusted Signatures',
    shortDesc: 'Identity-verified electronic signatures that prevent fraud.',
  },
];

const EXTRA_SOLUTIONS = [
  { href: '/fintech-kyc-verification', label: 'Fintech KYC', shortDesc: 'Identity verification for fintech companies' },
  { href: '/staffing-identity-check', label: 'Staffing', shortDesc: 'Candidate identity verification' },
];

type MenuType = 'solutions' | 'industries' | 'products' | 'resources' | null;

const triggerClass =
  'inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm text-muted transition-colors duration-100 hover:bg-foreground/5 hover:text-foreground aria-expanded:bg-foreground/5 aria-expanded:text-foreground';

function MenuRow({ href, label, desc, onClick }: { href: string; label: string; desc?: string; onClick: () => void }) {
  const className = 'group block rounded-md px-3 py-2.5 transition-colors hover:bg-foreground/[0.04]';
  const content = (
    <>
      <span className="block text-sm font-medium text-foreground-highlight">{label}</span>
      {desc ? <span className="mt-0.5 block text-[0.8125rem] leading-snug text-tertiary">{desc}</span> : null}
    </>
  );
  return href.startsWith('http') ? (
    <a href={href} onClick={onClick} className={className}>{content}</a>
  ) : (
    <Link href={href} onClick={onClick} className={className}>{content}</Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMenu(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openMenu]);

  const enter = (menu: MenuType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const close = () => setOpenMenu(null);

  const panel = 'menu-panel absolute left-0 top-full mt-2 rounded-xl border border-border-emphasized bg-background p-2 shadow-[0_18px_40px_-20px_rgba(11,17,16,0.25)]';

  const dropdown = (key: Exclude<MenuType, null>, label: string, content: React.ReactNode, width: string) => (
    <div className="relative" onMouseEnter={() => enter(key)} onMouseLeave={leave}>
      <button
        type="button"
        className={triggerClass}
        aria-expanded={openMenu === key}
        aria-haspopup="true"
        onClick={() => setOpenMenu(openMenu === key ? null : key)}
      >
        {label}
        <ChevronDown className={cx('h-3.5 w-3.5 transition-transform duration-150', openMenu === key && 'rotate-180')} aria-hidden="true" />
      </button>
      <div className={cx(panel, width)} data-open={openMenu === key || undefined} onMouseEnter={() => enter(key)} onMouseLeave={leave}>
        {content}
      </div>
    </div>
  );

  return (
    <header className="chrome-surface fixed inset-x-0 top-0 z-50 border-b border-border px-0 md:px-12">
      <div className="mx-auto grid h-16 w-full max-w-[84rem] grid-cols-[auto_1fr_auto] items-center gap-2 border-x border-border px-6 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Credo Screening home" className="inline-flex h-9 w-fit items-center rounded-md">
          <Logo size={94} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 justify-self-center lg:flex">
          {dropdown(
            'products',
            'Products',
            <>
              {PRODUCTS_LIST.map((p) => (
                <MenuRow key={p.slug} href={`/${p.slug}`} label={p.label} desc={p.shortDesc} onClick={close} />
              ))}
              <div className="mt-1 border-t border-border pt-1">
                <Link
                  href="/products"
                  onClick={close}
                  className="flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm font-medium text-teal-ink hover:bg-foreground/[0.04]"
                >
                  View all products & pricing <ArrowGlyph />
                </Link>
              </div>
            </>,
            'w-[22rem] origin-top-left',
          )}
          {dropdown(
            'solutions',
            'Solutions',
            <div className="grid grid-cols-2 gap-x-1">
              {SOLUTIONS_LIST.map((s) => (
                <MenuRow key={s.slug} href={`/solutions/${s.slug}`} label={s.label} desc={s.shortDesc} onClick={close} />
              ))}
              <div className="col-span-2 mt-1 grid grid-cols-2 gap-x-1 border-t border-border pt-1">
                {EXTRA_SOLUTIONS.map((s) => (
                  <MenuRow key={s.href} href={s.href} label={s.label} desc={s.shortDesc} onClick={close} />
                ))}
              </div>
            </div>,
            'w-[34rem] -left-24 [transform-origin:7.5rem_0]',
          )}
          {dropdown(
            'industries',
            'Industries',
            <div className="grid grid-cols-2 gap-x-1">
              {INDUSTRIES_LIST.map((i) => (
                <MenuRow key={i.slug} href={`/industries/${i.slug}`} label={i.label} onClick={close} />
              ))}
            </div>,
            'w-[28rem] -left-24 [transform-origin:7.5rem_0]',
          )}
          {dropdown(
            'resources',
            'Resources',
            <>
              <MenuRow href="/blog" label="Blogs" desc="Articles on identity verification and digital onboarding" onClick={close} />
              <MenuRow href="/supported-documents" label="Supported documents" desc="IDs we accept, starting with Canada, then the United States" onClick={close} />
              <MenuRow href={BRAND.docsUrl} label="API Docs" desc="Identity verification and screening API reference" onClick={close} />
            </>,
            'w-[22rem] origin-top-left',
          )}
          <Link href="/products" className={triggerClass}>
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <span className="hidden sm:inline-flex">
            <Action href="/login" variant="secondary" size="sm">Login</Action>
          </span>
          <Action href="/contact?plan=corporate" size="sm">Talk to sales</Action>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-foreground/5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
              {mobileOpen ? (
                <path d="M4 4l10 10M14 4 4 14" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 5.5h14M2 12.5h14" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        data-open={mobileOpen || undefined}
        className="mobile-menu absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
          <div className="mx-auto max-w-[84rem] px-6 pb-8 pt-2 md:px-8">
            {[
              { title: 'Products', items: PRODUCTS_LIST.map((p) => ({ href: `/${p.slug}`, label: p.label })) },
              {
                title: 'Solutions',
                items: [
                  ...SOLUTIONS_LIST.map((s) => ({ href: `/solutions/${s.slug}`, label: s.label })),
                  ...EXTRA_SOLUTIONS.map((s) => ({ href: s.href, label: s.label })),
                ],
              },
              { title: 'Industries', items: INDUSTRIES_LIST.map((i) => ({ href: `/industries/${i.slug}`, label: i.label })) },
              { title: 'Resources', items: [{ href: '/blog', label: 'Blogs' }, { href: '/supported-documents', label: 'Supported documents' }, { href: BRAND.docsUrl, label: 'API Docs' }] },
            ].map((group) => (
              <div key={group.title} className="border-b border-border py-4">
                <p className="pb-2 font-mono text-xs text-tertiary">{group.title}</p>
                <ul className="grid grid-cols-2 gap-x-4">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-[0.9375rem] text-foreground hover:text-teal-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-1 py-4">
              <Link href="/products" onClick={() => setMobileOpen(false)} className="py-2 text-[0.9375rem] text-foreground">All Products & Pricing</Link>
              <Link href="/products" onClick={() => setMobileOpen(false)} className="py-2 text-[0.9375rem] text-foreground">Pricing</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="py-2 text-[0.9375rem] text-foreground">Login</Link>
            </div>
            <Action href="/contact?plan=corporate" className="w-full">Talk to sales</Action>
          </div>
      </div>
    </header>
  );
}
