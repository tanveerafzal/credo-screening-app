import Link from 'next/link';
import { Logo } from './Logo';
import { BRAND, copyrightLine } from '@/lib/brand';
import { AsciiField } from './site/AsciiField';

const PRODUCT_LINKS: Array<[string, string]> = [
  ['Products', '/products'],
  ['Digital Onboarding', '/credo-onboarding'],
  ['ID Verification', '/credo-id-verification'],
  ['Free Screening', '/screening'],
  ['Trusted Signatures', '/credo-trusted-signatures'],
  ['Pricing', '/#pricing'],
  ['API Docs', '/docs'],
];

const COMPANY_LINKS: Array<[string, string]> = [
  ['Partner Portal', BRAND.partnerPortal],
  ['About', '/about'],
  ['Careers', '/careers'],
  ['Privacy Policy', '/privacy'],
  ['Terms of Service', '/terms'],
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const cls = 'text-sm text-white/60 transition-colors hover:text-white';
  return href.startsWith('http') ? (
    <a href={href} className={cls}>{label}</a>
  ) : (
    <Link href={href} className={cls}>{label}</Link>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night px-0 text-white/60 md:px-12">
      <div className="absolute inset-x-0 bottom-0 h-72" aria-hidden="true">
        <AsciiField tone="dark" focus={[0.78, 0.95]} />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/30 to-transparent" />
      </div>
      <div className="relative mx-auto w-full max-w-[84rem] border-x border-white/10">
        <div className="grid gap-12 px-6 pb-48 pt-16 md:grid-cols-12 md:px-8 md:pt-20">
          <div className="md:col-span-6">
            <Logo size={124} tone="white" />
            <p className="mt-6 max-w-sm text-sm leading-[1.75] text-white/60">
              {BRAND.tagline} Screen against 1.2M+ entities from OFAC, global sanctions, PEP databases, and 80+ watchlists worldwide.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-6 md:justify-items-end">
            <div>
              <h2 className="mb-4 font-mono text-xs font-normal tracking-normal text-white/55">Product</h2>
              <ul className="space-y-2.5">
                {PRODUCT_LINKS.map(([label, href]) => (
                  <li key={label}><FooterLink label={label} href={href} /></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-mono text-xs font-normal tracking-normal text-white/55">Company</h2>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map(([label, href]) => (
                  <li key={label}><FooterLink label={label} href={href} /></li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="relative border-t border-white/10 px-6 py-5 text-xs text-white/45 md:px-8">
          <span>{copyrightLine(2026)} · All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
