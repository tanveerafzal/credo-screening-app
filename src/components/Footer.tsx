import Link from 'next/link';
import { LogoIcon } from './Logo';

export function Footer() {
  return (
    <footer className="bg-primary text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoIcon size={28} />
              <span className="text-lg font-bold text-white">
                Credo<span className="text-accent-light">Screening</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md text-slate-400">
              Your trusted background check partner. Screen against 1.2M+ entities from OFAC, global sanctions, PEP databases, and 80+ watchlists worldwide.
            </p>
            <p className="text-xs mt-6 text-slate-500">
              A sister company of <a href="https://trustcredo.com" className="text-accent-light hover:text-accent hover:underline transition-colors">TrustCredo</a> — Identity Verification
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/screening" className="hover:text-white transition-colors">Free Screening</Link></li>
              <li><Link href="/#sources" className="hover:text-white transition-colors">Data Sources</Link></li>
              <li><Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://trustcredo.com" className="hover:text-white transition-colors">TrustCredo</a></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} CredoScreening. All rights reserved.</span>
          <span>SOC 2 Compliant &middot; GDPR Ready &middot; 99.9% Uptime</span>
        </div>
      </div>
    </footer>
  );
}
