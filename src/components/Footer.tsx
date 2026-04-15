import { Shield } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-indigo-400" />
              <span className="text-lg font-bold text-white">Credo<span className="text-indigo-400">Screening</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Your trusted background check partner. Screen against 1.2M+ entities from OFAC, global sanctions, PEP databases, and 80+ watchlists worldwide.
            </p>
            <p className="text-xs mt-4 text-gray-500">
              A sister company of <a href="https://trustcredo.com" className="text-indigo-400 hover:underline">TrustCredo</a> — Identity Verification
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/screening" className="hover:text-white transition">Free Screening</Link></li>
              <li><Link href="/#sources" className="hover:text-white transition">Data Sources</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white transition">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://trustcredo.com" className="hover:text-white transition">TrustCredo</a></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CredoScreening. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
