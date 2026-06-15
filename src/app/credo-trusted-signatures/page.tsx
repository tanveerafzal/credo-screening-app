import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  PenLine, ArrowRight, Shield, Users, FileCheck, Clock,
  Lock, CheckCircle, Fingerprint, Eye, Upload, Type
} from 'lucide-react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Trusted Signatures — Identity-Verified E-Signatures',
  description:
    'Electronic signatures with mandatory identity verification. Each signer proves who they are before signing. ESIGN and eIDAS compliant, tamper-proof audit trail.',
  path: '/credo-trusted-signatures',
  keywords: ['verified e-signatures', 'identity verified signing', 'ESIGN compliant signatures', 'law firm e-signatures'],
});

const BENEFITS = [
  {
    icon: Fingerprint,
    title: 'Identity Verified Signing',
    desc: 'Every signer completes identity verification before placing their signature. Government ID scan plus selfie match confirms the real person behind the signature.',
    stat: '3',
    statLabel: 'Verification levels',
  },
  {
    icon: Users,
    title: 'Sequential Multi-Signer',
    desc: 'Route documents to multiple signers in order. Each party verifies identity and signs before the next is notified. Full chain-of-custody at every step.',
    stat: 'Sequential',
    statLabel: 'Multi-party signing',
  },
  {
    icon: Shield,
    title: 'Tamper-Proof & Sealed',
    desc: 'Every completed document is cryptographically sealed with a Trust Credo verification stamp. Any post-signature modification is immediately detectable.',
    stat: '100%',
    statLabel: 'Tamper-evident',
  },
];

const STEPS = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload & Prepare',
    desc: 'Upload your PDF or document. Use the drag-and-drop editor to place signature fields, initials blocks, date fields, text inputs, and checkboxes anywhere on the document.',
  },
  {
    step: '02',
    icon: Users,
    title: 'Add Signers',
    desc: 'Add one or more signers by email. Set the signing order for sequential workflows. Each signer receives a secure invitation link.',
  },
  {
    step: '03',
    icon: Fingerprint,
    title: 'Verify & Sign',
    desc: 'Each signer completes identity verification — government ID scan and selfie matching — then draws, types, or uploads their signature directly in the browser.',
  },
  {
    step: '04',
    icon: FileCheck,
    title: 'Receive Signed PDF',
    desc: 'Once all parties have signed, every recipient receives the completed, tamper-proof PDF sealed with the Trust Credo verification record and full audit trail.',
  },
];

const FEATURES = [
  {
    icon: Type,
    title: 'Draw, Type, or Upload',
    desc: 'Signers can draw their signature on any device, type a stylized signature, or upload an existing signature image.',
  },
  {
    icon: PenLine,
    title: 'Drag-and-Drop Editor',
    desc: 'Place signature fields, initials, dates, text inputs, and checkboxes anywhere on the document with a visual editor — no code required.',
  },
  {
    icon: Eye,
    title: 'Real-Time Tracking',
    desc: 'Track document status in real-time. See who has opened, signed, or is pending. Get webhook notifications on every event.',
  },
  {
    icon: Clock,
    title: 'Detailed Audit Trail',
    desc: 'Every action is logged — document creation, signer invites, identity verification, field completion, and final signature — with timestamps and IP addresses.',
  },
  {
    icon: Shield,
    title: 'Trust Credo Seal',
    desc: 'Completed documents carry a cryptographic Trust Credo seal linking each signature to the verified identity behind it.',
  },
  {
    icon: FileCheck,
    title: 'Full Field Types',
    desc: 'Signature, initials, date signed, free text, number, dropdown, checkbox, and radio fields — everything needed for complex contracts.',
  },
];

const FAQS = [
  {
    q: 'What makes Trusted Signatures different from standard e-signature tools?',
    a: 'Every signer must verify their identity — government ID scan and selfie match — before signing. Standard e-signature tools accept any email address; Trusted Signatures proves the person behind the signature is who they claim to be.',
  },
  {
    q: 'What identity verification levels are available?',
    a: 'Three levels are available: Standard (email confirmation), Enhanced (government ID scan), and Biometric (government ID plus live selfie matching). You choose the level per document or per signer role.',
  },
  {
    q: 'How does sequential multi-signer work?',
    a: 'You define the signing order when setting up the document. Signer 1 receives the invitation first. Once they complete identity verification and sign, Signer 2 is automatically notified. Each party signs in sequence, with the full chain recorded in the audit trail.',
  },
  {
    q: 'What happens to documents after signing?',
    a: 'Completed documents are cryptographically sealed and distributed as a tamper-proof PDF to all parties. The document is stored securely and linked to the full audit trail. Any modification after signing breaks the cryptographic seal.',
  },
  {
    q: 'Are Trusted Signatures legally valid?',
    a: 'Yes. Electronic signatures created through Trusted Signatures comply with the ESIGN Act (US) and eIDAS Regulation (EU). The identity verification trail strengthens legal enforceability compared to standard e-signatures.',
  },
  {
    q: 'How is Trusted Signatures priced?',
    a: 'Trusted Signatures is priced at $1.99 per completed signing envelope — one price regardless of the number of signers or pages. Identity verification is included. Contact us for volume pricing.',
  },
];

export default function TrustedSignaturesPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-elevated to-surface" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent-subtle text-accent rounded-full text-xs font-semibold mb-6 border border-accent/10">
            <PenLine className="w-3.5 h-3.5" /> Trusted Signatures
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
            Verified People.<br />
            <span className="text-accent">Trusted Signatures.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Identity-verified electronic signatures. Each signer proves who they are with a
            government ID scan and selfie before placing their signature —
            <strong className="text-text-primary"> legally binding and fraud-resistant</strong>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact?product=credo-trusted-signatures"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-sm shadow-accent/20 transition-all"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-surface text-text-primary font-semibold rounded-lg border border-border hover:border-text-muted transition-all"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '3', label: 'Verification Levels' },
              { value: '5', label: 'Field Types' },
              { value: '<2 min', label: 'Avg Signing Time' },
              { value: '190+', label: 'Countries Supported' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-sm text-text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Why Trusted Signatures?</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Standard e-signatures accept any email. We verify the actual person.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-surface p-8 rounded-xl border border-border hover:shadow-lg hover:border-accent/20 transition-all text-center">
                <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-5">
                  <b.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">{b.title}</h3>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{b.desc}</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-2xl font-bold text-accent">{b.stat}</div>
                  <div className="text-xs text-text-muted mt-1">{b.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">How It Works</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Four steps from document upload to signed, sealed PDF.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                )}
                <div className="bg-surface-elevated rounded-xl p-8 text-center relative border border-border">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-accent text-white rounded-full text-sm font-bold mb-5">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 sm:py-12 bg-surface-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary">Everything You Need</h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              A complete signing platform built on verified identity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="group bg-surface p-6 rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
                <div className="w-10 h-10 bg-accent-subtle rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                  <f.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-10 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold mb-4 border border-green-100">
                <Lock className="w-3.5 h-3.5" /> Legal Compliance & Security
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Legally Binding in 190+ Countries</h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Trusted Signatures meets international electronic signature standards. Identity verification
                strengthens legal enforceability beyond standard e-signature platforms.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'ESIGN Act Compliant', desc: 'Meets US electronic signature law requirements. Legally enforceable in all 50 states.' },
                  { title: 'eIDAS Regulation', desc: 'Compliant with EU electronic identification and trust services regulation.' },
                  { title: 'Tamper-Proof Sealing', desc: 'Cryptographic seal detects any modification to signed documents after completion.' },
                  { title: 'Full Audit Trail', desc: 'Every action logged with timestamps, IP addresses, and identity verification records.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-elevated rounded-2xl border border-border p-10 flex flex-col items-center justify-center text-center">
              <Shield className="w-16 h-16 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-text-primary">Trust Credo Seal</h3>
              <p className="mt-3 text-text-secondary text-sm max-w-xs">
                Every completed document carries a cryptographic seal linking each signature to the
                verified identity behind it — for courts, auditors, and counterparties.
              </p>
              <div className="mt-6 w-full max-w-xs space-y-2">
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">ESIGN</div>
                  <div className="text-xs text-text-muted">US Electronic Signature Act</div>
                </div>
                <div className="bg-surface rounded-lg border border-border p-3 text-center">
                  <div className="text-lg font-bold text-accent">eIDAS</div>
                  <div className="text-xs text-text-muted">EU Trust Services Regulation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell CTA */}
      <section className="py-10 sm:py-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Pair with ID Verification</h2>
          <p className="mt-4 text-slate-300 text-lg">
            Already using Credo for identity verification? Trusted Signatures uses the same
            verified identity data — no duplicate verification required for returning users.
            One API, one integration, one trust layer.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <Fingerprint className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <div className="text-sm text-slate-300">ID Verification</div>
              <div className="text-lg font-bold text-white mt-1">From $0.99</div>
            </div>
            <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-xl p-6 text-center ring-1 ring-accent/40">
              <PenLine className="w-8 h-8 text-accent-light mx-auto mb-3" />
              <div className="text-sm text-accent-light">Trusted Signatures</div>
              <div className="text-lg font-bold text-white mt-1">$1.99 / envelope</div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/credo-id-verification"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light shadow-lg shadow-accent/20 transition-all"
            >
              Learn About ID Verification <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?product=credo-trusted-signatures"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/15 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <SolutionsGrid currentSlug="trusted-signatures" />
      <FAQ items={FAQS} />
      <CTABanner
        title="Ready to stop trusting email addresses?"
        subtitle="Trusted Signatures puts verified identity behind every signature. Get started at $1.99 per envelope."
        primaryLabel="Get Started"
        primaryHref="/contact?product=credo-trusted-signatures"
        secondaryLabel="View All Products"
        secondaryHref="/products"
      />

      <Footer />
    </>
  );
}
