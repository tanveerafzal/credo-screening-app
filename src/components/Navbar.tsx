'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { SOLUTIONS_LIST } from '@/lib/solutions';
import { INDUSTRIES_LIST } from '@/lib/industries';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'solutions' | 'industries' | null>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (menu: 'solutions' | 'industries') => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo size={36} />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('solutions')}
              onMouseLeave={handleMenuLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Solutions <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openMenu === 'solutions' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-[540px] bg-white rounded-2xl border border-gray-100 shadow-xl p-4 grid grid-cols-2 gap-2"
                  onMouseEnter={() => handleMenuEnter('solutions')}
                  onMouseLeave={handleMenuLeave}
                >
                  {SOLUTIONS_LIST.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <s.icon className="w-4.5 h-4.5 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">{s.label}</div>
                        <div className="text-xs text-gray-500 leading-snug mt-0.5">{s.shortDesc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMenuEnter('industries')}
              onMouseLeave={handleMenuLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                Industries <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {openMenu === 'industries' && (
                <div
                  className="absolute top-full -left-4 mt-2 w-[540px] bg-white rounded-2xl border border-gray-100 shadow-xl p-4 grid grid-cols-2 gap-1"
                  onMouseEnter={() => handleMenuEnter('industries')}
                  onMouseLeave={handleMenuLeave}
                >
                  {INDUSTRIES_LIST.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/industries/${i.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{i.label}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Pricing</Link>
            <Link href="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Docs</Link>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Login</Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Try Free
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <div className="text-xs font-bold text-gray-400 uppercase px-2 mt-2">Solutions</div>
            {SOLUTIONS_LIST.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="block px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                onClick={() => setMobileOpen(false)}
              >
                {s.label}
              </Link>
            ))}

            <div className="text-xs font-bold text-gray-400 uppercase px-2 mt-4">Industries</div>
            {INDUSTRIES_LIST.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="block px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded"
                onClick={() => setMobileOpen(false)}
              >
                {i.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link href="/#pricing" className="block px-2 py-2 text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link href="/docs" className="block px-2 py-2 text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Docs</Link>
              <Link href="/login" className="block px-2 py-2 text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link href="/register" className="block w-full text-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg" onClick={() => setMobileOpen(false)}>
                Try Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
