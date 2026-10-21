'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { ArrowGlyph, CheckGlyph, Container, TextLink, cx } from '@/components/site/Canvas';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = 'name' | 'email' | 'company' | 'phone' | 'message';
type Form = Record<Field, string>;

/** Field-level problems, named for the person filling the form. */
function validate(form: Form): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!form.name.trim()) errors.name = 'Enter your name.';
  if (!form.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL.test(form.email.trim())) errors.email = 'Enter a valid email address, like you@company.com.';
  if (!form.message.trim()) errors.message = 'Tell us what you need.';
  return errors;
}

const inputClass =
  'w-full rounded-lg border border-border-emphasized bg-background text-[0.9375rem] text-foreground placeholder:text-tertiary transition-colors focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/10';

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="rise-in mt-1.5 text-[0.8125rem] leading-snug text-danger">
      {message}
    </p>
  ) : null;
}

function ContactForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || '';

  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: plan === 'corporate'
      ? 'I\'m interested in the Corporate plan. Please provide details on pricing and custom integrations.'
      : '',
  });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const errors = validate(form);
  const shown = (field: Field) => (touched[field] ? errors[field] : undefined);
  const touch = (field: Field) => setTouched((t) => ({ ...t, [field]: true }));
  const fieldProps = (field: Field) => ({
    id: `contact-${field}`,
    name: field,
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [field]: e.target.value }),
    onBlur: () => touch(field),
    'aria-invalid': shown(field) ? true : undefined,
    'aria-describedby': shown(field) ? `contact-${field}-error` : undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (Object.keys(errors).length) {
      setTouched({ name: true, email: true, message: true });
      const first = Object.keys(errors)[0];
      document.getElementById(`contact-${first}`)?.focus();
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
      <div role="status" className="rise-in border-y border-border py-10">
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
          <input type="text" autoComplete="name" placeholder="John Doe" className={cx('h-11 px-3.5', inputClass)} {...fieldProps('name')} />
          <FieldError id="contact-name-error" message={shown('name')} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
          <input type="email" autoComplete="email" placeholder="you@company.com" className={cx('h-11 px-3.5', inputClass)} {...fieldProps('email')} />
          <FieldError id="contact-email-error" message={shown('email')} />
        </div>
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-foreground">Company</label>
          <input type="text" autoComplete="organization" placeholder="Acme Inc." className={cx('h-11 px-3.5', inputClass)} {...fieldProps('company')} />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
          <input type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" className={cx('h-11 px-3.5', inputClass)} {...fieldProps('phone')} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">Message *</label>
        <textarea
          rows={5}
          placeholder="Tell us about your screening needs, expected volume, and any custom requirements..."
          className={cx('resize-none px-3.5 py-3 leading-[1.6]', inputClass)}
          {...fieldProps('message')}
        />
        <FieldError id="contact-message-error" message={shown('message')} />
      </div>

      {error && (
        <p role="alert" className="rise-in flex items-start gap-2.5 border-l border-danger py-1 pl-3 text-sm text-danger">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--ink-hover)] active:scale-[0.98] disabled:opacity-50 sm:w-auto"
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
