'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { ArrowGlyph, CheckGlyph, Container, TextLink } from '@/components/site/Canvas';

function ContactForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: plan === 'corporate'
      ? 'I\'m interested in the Corporate plan. Please provide details on pricing and custom integrations.'
      : '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email, and message are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, plan: plan || undefined }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div role="status" className="border-y border-border py-10">
        <CheckGlyph className="h-6 w-6" />
        <h2 className="mt-5 text-2xl leading-tight">Message Sent!</h2>
        <p className="mt-3 max-w-md text-base leading-[1.75] text-muted">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
        <div className="mt-6">
          <TextLink href="/">Back to home <ArrowGlyph /></TextLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {plan === 'corporate' && (
        <div className="rounded-lg border border-teal/30 bg-teal-wash px-4 py-3 text-sm text-teal-ink">
          <strong className="font-medium">Corporate Plan Inquiry</strong> — We&apos;ll prepare a custom quote for your team.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">Your Name *</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="h-11 w-full rounded-lg border border-border-emphasized bg-background px-3.5 text-[0.9375rem] text-foreground placeholder:text-tertiary focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
          <input
            type="email"
            autoComplete="email"
            id="contact-email"
            name="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="h-11 w-full rounded-lg border border-border-emphasized bg-background px-3.5 text-[0.9375rem] text-foreground placeholder:text-tertiary focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash"
          />
        </div>
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-foreground">Company</label>
          <input
            type="text"
            id="contact-company"
            name="company"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            placeholder="Acme Inc."
            className="h-11 w-full rounded-lg border border-border-emphasized bg-background px-3.5 text-[0.9375rem] text-foreground placeholder:text-tertiary focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="h-11 w-full rounded-lg border border-border-emphasized bg-background px-3.5 text-[0.9375rem] text-foreground placeholder:text-tertiary focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">Message *</label>
        <textarea
          id="contact-message"
            name="message"
            value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={5}
          placeholder="Tell us about your screening needs, expected volume, and any custom requirements..."
          className="w-full resize-none rounded-lg border border-border-emphasized bg-background px-3.5 py-3 text-[0.9375rem] leading-[1.6] text-foreground placeholder:text-tertiary focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash"
        />
      </div>

      {error && (
        <p role="alert" className="flex items-start gap-2.5 border-l-2 border-danger py-1 pl-3 text-sm text-danger">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white transition-[background-color,transform] duration-150 hover:bg-[var(--ink-hover)] active:translate-y-px disabled:opacity-50 sm:w-auto"
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Message'}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-0 md:px-12">
          <Container>
            <div className="px-6 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
              <p className="mb-6 text-sm text-tertiary">
                <Link href="/" className="hover:text-foreground">Credo</Link>
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-muted">Contact</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Contact Us</h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                Have questions? Need a custom plan? We&apos;d love to hear from you.
              </p>
            </div>
          </Container>
        </section>

        <section className="border-t border-border px-0 md:px-12">
          <Container className="grid lg:grid-cols-12">
            <div className="px-6 py-16 md:px-8 md:py-20 lg:col-span-8 lg:border-r lg:border-border">
              <div className="max-w-2xl">
                <Suspense fallback={<div className="py-8"><Loader2 className="h-5 w-5 animate-spin text-tertiary" aria-label="Loading" /></div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <div className="border-t border-border px-6 py-16 md:px-8 md:py-20 lg:col-span-4 lg:border-t-0">
              <dl className="border-t border-border">
                <div className="border-b border-border py-5">
                  <dt className="font-mono text-xs text-tertiary">Email</dt>
                  <dd className="mt-1.5">
                    <a href="mailto:sales@credoscreening.com" className="text-[0.9375rem] font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">sales@credoscreening.com</a>
                  </dd>
                </div>
                <div className="border-b border-border py-5">
                  <dt className="font-mono text-xs text-tertiary">Headquarters</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-foreground">Toronto, Canada</dd>
                </div>
              </dl>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
