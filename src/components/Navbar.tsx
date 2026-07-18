'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Menu, X, ChevronDown, ScanFace, Search, FileText, Building2, Users, PenLine, UserCheck } from 'lucide-react';
import { Logo } from './Logo';
import { SOLUTIONS_LIST } from '@/lib/solutions';
import { INDUSTRIES_LIST } from '@/lib/industries';

const PRODUCTS_LIST = [
  {
    slug: 'credo-onboarding',
    label: 'Digital Onboarding',
    shortDesc: 'Remote identity verification + AML screening in one flow.',
    icon: UserCheck,
  },
  {
    slug: 'credo-id-verification',
    label: 'ID Verification',
    shortDesc: 'Government ID + selfie verification in under 30 seconds.',
    icon: ScanFace,
  },
  {
    slug: 'screening',
    label: 'Screening',
    shortDesc: 'Screen against 1.2M+ entities from OFAC, sanctions & PEP lists.',
    icon: Search,
  },
  {
    slug: 'credit-report',
    label: 'Credit Report',
    shortDesc: 'Consumer credit reports powered by Equifax.',
    icon: FileText,
  },
  {
    slug: 'credo-trusted-signatures',
    label: 'Trusted Signatures',
    shortDesc: 'Identity-verified electronic signatures that prevent fraud.',
    icon: PenLine,
  },
];

type MenuType = 'solutions' | 'industries' | 'products' | null;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (menu: MenuType) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <nav className="fixed top-0 w-full bg-surface/80 backdrop-blur-xl border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo size={56} />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('products')}
              onMouseLeave={handleMenuLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors">
                Products <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openMenu === 'products' && (
                <div
                  className="absolute top-full -left-4 mt-1 w-[340px] bg-surface rounded-xl border border-border shadow-xl shadow-black/5 p-3 space-y-1"
                  onMouseEnter={() => handleMenuEnter('products')}
                  onMouseLeave={handleMenuLeave}
                >
                  {PRODUCTS_LIST.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                        <p.icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-text-primary">{p.label}</div>
                        <div className="text-xs text-text-muted leading-snug mt-0.5">{p.shortDesc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-border mt-2 pt-2">
                    <Link
                      href="/products"
                      className="block px-3 py-2 text-xs font-medium text-accent hover:bg-surface-elevated rounded-lg transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      View all products & pricing →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('solutions')}
              onMouseLeave={handleMenuLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors">
                Solutions <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openMenu === 'solutions' && (
                <div
                  className="absolute top-full -left-4 mt-1 w-[540px] bg-surface rounded-xl border border-border shadow-xl shadow-black/5 p-3 grid grid-cols-2 gap-1"
                  onMouseEnter={() => handleMenuEnter('solutions')}
                  onMouseLeave={handleMenuLeave}
                >
                  {SOLUTIONS_LIST.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                        <s.icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-text-primary">{s.label}</div>
                        <div className="text-xs text-text-muted leading-snug mt-0.5">{s.shortDesc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 border-t border-border mt-1 pt-2 grid grid-cols-2 gap-1">
                    <Link
                      href="/fintech-kyc-verification"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-text-primary">Fintech KYC</div>
                        <div className="text-xs text-text-muted leading-snug mt-0.5">Identity verification for fintech companies</div>
                      </div>
                    </Link>
                    <Link
                      href="/staffing-identity-check"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-9 h-9 bg-accent-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-text-primary">Staffing</div>
                        <div className="text-xs text-text-muted leading-snug mt-0.5">Candidate identity & credit verification</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('industries')}
              onMouseLeave={handleMenuLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors">
                Industries <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openMenu === 'industries' && (
                <div
                  className="absolute top-full -left-4 mt-1 w-[540px] bg-surface rounded-xl border border-border shadow-xl shadow-black/5 p-3 grid grid-cols-2 gap-1"
                  onMouseEnter={() => handleMenuEnter('industries')}
                  onMouseLeave={handleMenuLeave}
                >
                  {INDUSTRIES_LIST.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-elevated transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-8 h-8 bg-surface-elevated rounded-lg flex items-center justify-center flex-shrink-0">
                        <i.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div className="text-sm font-medium text-text-primary">{i.label}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/products" className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors">Pricing</Link>

            <div className="w-px h-6 bg-border mx-2" />

            <Link href="/login" className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated rounded-lg transition-colors">Login</Link>
            <Link
              href="/register"
              className="ml-1 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors shadow-sm"
            >
              Start Free
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-surface-elevated transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 pt-2 pb-1">Products</div>
            {PRODUCTS_LIST.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="block px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {p.label}
              </Link>
            ))}

            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 pt-4 pb-1">Solutions</div>
            {SOLUTIONS_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="block px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}
            <Link
              href="/fintech-kyc-verification"
              className="block px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Fintech KYC
            </Link>
            <Link
              href="/staffing-identity-check"
              className="block px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Staffing
            </Link>

            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 pt-4 pb-1">Industries</div>
            {INDUSTRIES_LIST.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="block px-3 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-text-primary rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {i.label}
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-border space-y-1">
              <Link href="/products" className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-elevated rounded-lg" onClick={() => setMobileOpen(false)}>All Products & Pricing</Link>
              <Link href="/products" className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-elevated rounded-lg" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/login" className="block px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-elevated rounded-lg" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link href="/register" className="block w-full text-center px-4 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg mt-2" onClick={() => setMobileOpen(false)}>
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
