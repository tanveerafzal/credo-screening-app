'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Credo<span className="text-indigo-600">Screening</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#sources" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Sources</Link>
            <Link href="/#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Pricing</Link>
            <Link href="/screening" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Free Screening</Link>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Login</Link>
            <Link
              href="/screening"
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
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link href="/#sources" className="block text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Sources</Link>
            <Link href="/#pricing" className="block text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/screening" className="block text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Free Screening</Link>
            <Link href="/login" className="block text-sm font-medium text-gray-600" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link href="/screening" className="block w-full text-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg" onClick={() => setMobileOpen(false)}>
              Try Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
