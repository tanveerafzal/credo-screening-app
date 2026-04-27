'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { Loader2, CheckCircle, Mail, Phone, Building2, MessageSquare } from 'lucide-react';

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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
        <p className="mt-2 text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <a href="/" className="mt-6 inline-block text-sm text-indigo-600 font-medium hover:underline">Back to home</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5">
      {plan === 'corporate' && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-indigo-700">
          <strong>Corporate Plan Inquiry</strong> — We'll prepare a custom quote for your team.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> Your Name *</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email *</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Company</span>
          </label>
          <input
            type="text"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            placeholder="Acme Inc."
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={5}
          placeholder="Tell us about your screening needs, expected volume, and any custom requirements..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
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
      <main className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size={40} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-2 text-gray-600">
              Have questions? Need a custom plan? We'd love to hear from you.
            </p>
          </div>

          <Suspense fallback={<div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" /></div>}>
            <ContactForm />
          </Suspense>

          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-center">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <Mail className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Email</div>
              <a href="mailto:sales@credoscreening.com" className="text-sm text-indigo-600 hover:underline">sales@credoscreening.com</a>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <Building2 className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Headquarters</div>
              <div className="text-sm text-gray-500">Toronto, Canada</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
