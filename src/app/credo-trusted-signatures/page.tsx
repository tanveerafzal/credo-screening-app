import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import { StatsBar } from '@/components/marketing/StatsBar';
import { FeatureCells } from '@/components/marketing/FeatureGrid';
import Link from 'next/link';
import { Action, CheckGlyph, Container, Index, Section, SectionHeader } from '@/components/site/Canvas';
import { GuillocheArt } from '@/components/site/GuillocheArt';
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
    title: 'Identity Verified Signing',
    desc: 'Every signer completes identity verification before placing their signature. Government ID scan plus selfie match confirms the real person behind the signature.',
    stat: '3',
    statLabel: 'Verification levels',
  },
  {
    title: 'Sequential Multi-Signer',
    desc: 'Route documents to multiple signers in order. Each party verifies identity and signs before the next is notified. Full chain-of-custody at every step.',
    stat: 'Sequential',
    statLabel: 'Multi-party signing',
  },
  {
    title: 'Tamper-Proof & Sealed',
    desc: 'Every completed document is cryptographically sealed with a Trust Credo verification stamp. Any post-signature modification is immediately detectable.',
    stat: '100%',
    statLabel: 'Tamper-evident',
  },
];

const STEPS = [
  {
    title: 'Upload & Prepare',
    desc: 'Upload your PDF or document. Use the drag-and-drop editor to place signature fields, initials blocks, date fields, text inputs, and checkboxes anywhere on the document.',
  },
  {
    title: 'Add Signers',
    desc: 'Add one or more signers by email. Set the signing order for sequential workflows. Each signer receives a secure invitation link.',
  },
  {
    title: 'Verify & Sign',
    desc: 'Each signer completes identity verification — government ID scan and selfie matching — then draws, types, or uploads their signature directly in the browser.',
  },
  {
    title: 'Receive Signed PDF',
    desc: 'Once all parties have signed, every recipient receives the completed, tamper-proof PDF sealed with the Trust Credo verification record and full audit trail.',
  },
];

const FEATURES = [
  {
    title: 'Draw, Type, or Upload',
    desc: 'Signers can draw their signature on any device, type a stylized signature, or upload an existing signature image.',
  },
  {
    title: 'Drag-and-Drop Editor',
    desc: 'Place signature fields, initials, dates, text inputs, and checkboxes anywhere on the document with a visual editor — no code required.',
  },
  {
    title: 'Real-Time Tracking',
    desc: 'Track document status in real-time. See who has opened, signed, or is pending. Get webhook notifications on every event.',
  },
  {
    title: 'Detailed Audit Trail',
    desc: 'Every action is logged — document creation, signer invites, identity verification, field completion, and final signature — with timestamps and IP addresses.',
  },
  {
    title: 'Trust Credo Seal',
    desc: 'Completed documents carry a cryptographic Trust Credo seal linking each signature to the verified identity behind it.',
  },
  {
    title: 'Full Field Types',
    desc: 'Signature, initials, date signed, free text, number, dropdown, checkbox, and radio fields — everything needed for complex contracts.',
  },
];

const COMPLIANCE = [
  { title: 'ESIGN Act Compliant', desc: 'Meets US electronic signature law requirements. Legally enforceable in all 50 states.' },
  { title: 'eIDAS Regulation', desc: 'Compliant with EU electronic identification and trust services regulation.' },
  { title: 'Tamper-Proof Sealing', desc: 'Cryptographic seal detects any modification to signed documents after completion.' },
  { title: 'Full Audit Trail', desc: 'Every action logged with timestamps, IP addresses, and identity verification records.' },
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
      <section className="relative overflow-hidden px-0 md:px-12">
        <Container>
          <div className="relative z-10 px-6 pb-4 pt-32 md:px-8 md:pt-44 lg:pb-24">
            <div className="max-w-2xl">
              <p className="mb-6 text-sm text-tertiary">
                <Link href="/" className="hover:text-foreground">Credo</Link>
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-muted">Trusted Signatures</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">
                Verified People.
                <br />
                Trusted Signatures.
              </h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                Identity-verified electronic signatures. Each signer proves who they are with a
                government ID scan and selfie before placing their signature —
                <strong className="font-medium text-foreground-highlight"> legally binding and fraud-resistant</strong>.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Action href="/contact?product=credo-trusted-signatures" arrow>Get Started</Action>
                <Action href="#how-it-works" variant="secondary">See How It Works</Action>
              </div>
            </div>
          </div>
          <GuillocheArt
            className="relative h-64 [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_35%),linear-gradient(to_bottom,transparent,black_25%)] sm:h-80 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[66%] lg:[mask-image:linear-gradient(to_right,transparent,black_36%)]"
            svgClassName="absolute inset-y-0 right-0 h-full w-[180%] sm:w-[130%] lg:w-full"
          />
        </Container>
      </section>

      <StatsBar
        stats={[
          { value: '3', label: 'Verification Levels' },
          { value: '5', label: 'Field Types' },
          { value: '<2 min', label: 'Avg Signing Time' },
          { value: '190+', label: 'Countries Supported' },
        ]}
      />

      {/* Benefits */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Why Trusted Signatures?"
          body={<p>Standard e-signatures accept any email. We verify the actual person.</p>}
        />
        <div className="cells-clip border-t border-border">
          <ul className="cells md:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <li key={b.title} className="flex flex-col px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{b.title}</h3>
                <p className="mt-2.5 flex-1 text-[0.9375rem] leading-[1.7] text-muted">{b.desc}</p>
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-[2rem] font-medium leading-none tracking-[-0.045em] text-foreground-highlight">{b.stat}</p>
                  <p className="mt-2 font-mono text-xs text-tertiary">{b.statLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" tone="tint" innerClassName="pb-0 md:pb-0">
        <SectionHeader title="How It Works" body={<p>Four steps from document upload to signed, sealed PDF.</p>} />
        <div className="cells-clip border-t border-border">
          <ol className="cells sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="px-6 py-8 md:px-8 md:py-10">
                <Index n={i + 1} />
                <h3 className="mt-4 text-[1.0625rem] leading-snug tracking-[-0.015em]">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.7] text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Features Grid */}
      <Section innerClassName="pb-0 md:pb-0">
        <SectionHeader
          title="Everything You Need"
          body={<p>A complete signing platform built on verified identity.</p>}
        />
        <FeatureCells features={FEATURES} />
      </Section>

      {/* Security & Compliance */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <p className="text-sm text-tertiary">Legal Compliance & Security</p>
            <h2 className="mt-3 text-2xl leading-tight sm:text-[2rem]">Legally Binding in 190+ Countries</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              Trusted Signatures meets international electronic signature standards. Identity verification
              strengthens legal enforceability beyond standard e-signature platforms.
            </p>
            <ul className="mt-10 max-w-xl border-y border-border">
              {COMPLIANCE.map((item) => (
                <li key={item.title} className="flex gap-4 border-b border-border py-5 last:border-b-0">
                  <CheckGlyph className="mt-0.5" />
                  <div>
                    <h3 className="text-base leading-snug tracking-[-0.015em]">{item.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-[1.65] text-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center border-t border-border bg-surface-elevated px-6 py-16 md:px-8 md:py-20 lg:col-span-5 lg:border-t-0">
            <h3 className="text-xl leading-tight tracking-[-0.03em]">Trust Credo Seal</h3>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">
              Every completed document carries a cryptographic seal linking each signature to the
              verified identity behind it — for courts, auditors, and counterparties.
            </p>
            <dl className="mt-8 border-y border-border">
              {[
                { k: 'ESIGN', v: 'US Electronic Signature Act' },
                { k: 'eIDAS', v: 'EU Trust Services Regulation' },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-border py-4 last:border-b-0">
                  <dt className="font-mono text-sm text-foreground-highlight">{row.k}</dt>
                  <dd className="text-right text-sm text-tertiary">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Cross-sell CTA */}
      <section className="border-t border-border px-0 md:px-12">
        <Container className="grid lg:grid-cols-12">
          <div className="px-6 py-20 md:px-8 md:py-28 lg:col-span-7 lg:border-r lg:border-border">
            <h2 className="text-2xl leading-tight sm:text-[2rem]">Pair with ID Verification</h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted">
              Already using Credo for identity verification? Trusted Signatures uses the same
              verified identity data — no duplicate verification required for returning users.
              One API, one integration, one trust layer.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Action href="/credo-id-verification" arrow>Learn About ID Verification</Action>
              <Action href="/contact?product=credo-trusted-signatures" variant="secondary">Contact Sales</Action>
            </div>
          </div>
          <div className="cells-clip border-t border-border lg:col-span-5 lg:border-t-0">
            <dl className="cells h-full grid-cols-2">
              {[
                { label: 'ID Verification', value: 'From $0.99', highlight: false },
                { label: 'Trusted Signatures', value: '$1.99 / envelope', highlight: true },
              ].map((p) => (
                <div
                  key={p.label}
                  className={`flex flex-col justify-end px-6 py-10 md:px-8 ${p.highlight ? 'bg-teal-wash/60' : ''}`}
                >
                  <dt className={`order-2 mt-2 font-mono text-xs ${p.highlight ? 'text-teal-ink' : 'text-tertiary'}`}>{p.label}</dt>
                  <dd className="order-1 text-2xl font-medium tracking-[-0.04em] text-foreground-highlight sm:text-[1.75rem]">{p.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
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
