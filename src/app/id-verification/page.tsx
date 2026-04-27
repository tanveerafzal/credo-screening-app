import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolutionsGrid } from '@/components/marketing/SolutionsGrid';
import { FAQ } from '@/components/marketing/FAQ';
import { CTABanner } from '@/components/marketing/CTABanner';
import Link from 'next/link';
import {
  ScanFace, Camera, CheckCircle, ShieldCheck, Globe, Zap,
  ArrowRight, CreditCard, BookOpen, Lock
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ID Verification | CredoScreening',
  description: 'Enterprise-grade identity verification in under 30 seconds. ID scan, selfie, done. 200+ countries, facial matching, liveness detection.',
};

const STEPS = [
  {
    step: '01',
    icon: Camera,
    title: 'Scan Your ID',
    desc: 'Point your camera at any government-issued ID, driver\'s license, or passport. Our OCR and MRZ scanning extracts data instantly.',
  },
  {
    step: '02',
    icon: ScanFace,
    title: 'Take a Selfie',
    desc: 'Snap a quick selfie. Our facial matching technology compares it to your ID photo in real-time with liveness detection.',
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Verified',
    desc: 'Identity confirmed in seconds. No manual review, no waiting. Results delivered instantly to your application via API or webhook.',
  },
];

const DOCUMENTS = [
  {
    icon: CreditCard,
    title: 'Government-Issued IDs',
    desc: 'State and national ID cards from 200+ countries.',
  },
  {
    icon: BookOpen,
    title: 'Driver\'s License',
    desc: 'US, Canadian, and international licenses supported.',
  },
  {
    icon: Globe,
    title: 'Passport',
    desc: 'MRZ scanning for instant data extraction from any passport.',
  },
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'The whole process takes seconds. No waiting around for manual document checks or third-party verifications.',
    stat: '<30s',
    statLabel: 'Average verification time',
  },
  {
    icon: ShieldCheck,
    title: 'Top-Notch Security',
    desc: 'Facial matching and liveness detection ensure the person behind the screen is who they say they are.',
    stat: '180+',
    statLabel: 'Countries covered',
  },
  {
    icon: ScanFace,
    title: 'Simple Process',
    desc: 'Scan your ID and snap a selfie — that\'s it. No app downloads, no document uploads, no human review delays.',
    stat: '2',
    statLabel: 'Photos to verify',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Screening used to take days. Now applicants verify in seconds and move straight to lease signing.',
    role: 'Property Management',
  },
  {
    quote: 'Verification is instant and completely frictionless. Our onboarding conversion jumped significantly.',
    role: 'Finance Platform',
  },
  {
    quote: 'We verify homeowners instantly without adding friction to the lending process.',
    role: 'Home Equity Lender',
  },
  {
    quote: 'Fraud attempts are down significantly since we added identity verification to our account opening flow.',
    role: 'Credit Union',
  },
  {
    quote: 'Made identity verification seamless without adding steps. Our users barely notice it\'s there.',
    role: 'Insurtech',
  },
  {
    quote: 'Verifying contractor identity used to be a nightmare. Now it\'s same-day onboarding.',
    role: 'Staffing Platform',
  },
];

const FAQS = [
  { q: 'What documents are supported?', a: 'Government-issued IDs, driver\'s licenses, and passports from 200+ countries. MRZ scanning for instant passport data extraction.' },
  { q: 'How fast is verification?', a: 'Most users complete the entire process in under 30 seconds. No waiting for manual review.' },
  { q: 'Is biometric data stored?', a: 'No. We encrypt biometric data during verification and delete it immediately after. Nothing is stored on our servers.' },
  { q: 'Do users need to download an app?', a: 'No. Verification works directly in any web browser on any device with a camera.' },
  { q: 'How does liveness detection work?', a: 'Our AI analyzes the selfie in real-time to confirm a live person is present — not a photo, video, or mask. This prevents spoofing and identity fraud.' },
  { q: 'Can I combine ID verification with screening?', a: 'Yes. Run ID verification and sanctions/PEP screening together in a single workflow via our API.' },
];

export default function IDVerificationPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-6">
            <ScanFace className="w-3.5 h-3.5" /> Identity Verification
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            The Fastest Way to<br />
            <span className="text-indigo-600">Verify Real People</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            ID scan. Selfie. Done. Enterprise-grade identity verification
            your users complete in <strong>under 30 seconds</strong> — no app downloads, no manual review.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 transition"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '<30s', label: 'Verification Time' },
              { value: '200+', label: 'Countries Supported' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '0', label: 'Biometric Data Stored' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose CredoScreening for ID Verification?</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Verify identities without the friction. Your users won&apos;t hate it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <b.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{b.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{b.desc}</p>
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="text-2xl font-extrabold text-indigo-600">{b.stat}</div>
                  <div className="text-xs text-gray-500 mt-1">{b.statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Three simple steps. No app downloads. No manual review.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-indigo-200" />
                )}
                <div className="bg-gray-50 rounded-2xl p-8 text-center relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full text-sm font-bold mb-5">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Documents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Supported Documents</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Accept identity documents from over 200 countries worldwide.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <doc.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{doc.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Deep-Dive */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                <Lock className="w-3.5 h-3.5" /> Privacy & Security
              </div>
              <h2 className="text-3xl font-bold text-gray-900">You&apos;re You. We Make Sure of It.</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                180+ countries — no fraud, no fakes, no second-guessing. We tell you exactly what data we collect,
                how we use it, and who sees it. No surprises. No fine print.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { title: 'Facial Matching', desc: 'We match the selfie to the ID photo in real-time. Same face? You\'re in.' },
                  { title: 'Liveness Detection', desc: 'AI confirms a live person is present — not a photo, video, or mask.' },
                  { title: 'Encrypted & Deleted', desc: 'Biometric data is encrypted during verification and deleted immediately after. Never stored.' },
                  { title: 'Fraud Detection', desc: 'Built-in fraud detection catches tampered documents, expired IDs, and spoofing attempts.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-20 h-20 text-indigo-600 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">Enterprise-Grade Security</h3>
              <p className="mt-3 text-gray-600 text-sm max-w-xs">
                Your users&apos; data is protected with bank-level encryption. We verify and delete — nothing is stored on our servers.
              </p>
              <div className="mt-6 w-full max-w-xs">
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-xl font-extrabold text-indigo-600">AES-256</div>
                  <div className="text-xs text-gray-500">Encryption</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verify + Screen Together */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Verify Identity + Screen Against Watchlists</h2>
          <p className="mt-4 text-indigo-200 text-lg">
            Combine ID verification with sanctions, PEP, and criminal screening in a single workflow.
            Verify who someone is <em>and</em> check if they&apos;re on a watchlist — all through one API.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/screening"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 shadow-lg transition"
            >
              Try Free Screening <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact?plan=corporate"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-400 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Businesses Worldwide</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              From startups to enterprises, businesses trust CredoScreening for fast, reliable identity verification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold text-indigo-600">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SolutionsGrid currentSlug="id-verification" />
      <FAQ items={FAQS} />
      <CTABanner />

      <Footer />
    </>
  );
}
