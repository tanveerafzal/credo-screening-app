'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { LogoIcon } from '@/components/Logo';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { isPendingSignup, register, saveAuth } from '@/lib/auth';
import { getPartnerDashboardUrl } from '@/lib/id-verify-api';

function RegisterForm() {
  const DASHBOARD_URL = `${getPartnerDashboardUrl()}/partner/dashboard`;
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [restrictedIndustryWarrantyAccepted, setRestrictedIndustryWarrantyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.companyName.trim() || !form.contactName.trim() || !form.email.trim() || !form.password) {
      setError('All fields are required.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!restrictedIndustryWarrantyAccepted) {
      setError('Please confirm that you are not an adult, gambling, or alcohol business.');
      return;
    }

    setLoading(true);
    try {
      const data = await register({
        email: form.email.trim(),
        password: form.password,
        companyName: form.companyName.trim(),
        contactName: form.contactName.trim(),
        restrictedIndustryWarrantyAccepted: true,
      });
      if (isPendingSignup(data) || !('token' in data) || !data.token) {
        setSubmittedEmail(form.email.trim());
        return;
      }
      saveAuth(data.token, data.partner);
      window.location.href = `${DASHBOARD_URL}?token=${encodeURIComponent(data.token)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <LogoIcon size={44} />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
            <p className="text-sm text-text-muted mt-1">Request access — we review every new account</p>
          </div>

          {submittedEmail ? (
            <div className="bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 space-y-4 text-center">
              <h2 className="text-lg font-semibold text-text-primary">Request received</h2>
              <p className="text-sm text-text-secondary">
                Your request will be reviewed and approved. We will email you at{' '}
                <strong className="text-text-primary">{submittedEmail}</strong> once your account is ready.
              </p>
              <p className="text-sm text-text-muted">You will not be able to sign in until that review is complete.</p>
              <Link href="/login" className="inline-block text-accent font-medium hover:text-accent-light transition-colors">
                Go to sign in
              </Link>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                placeholder="Your Company Inc."
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Your Name</label>
              <input
                type="text"
                value={form.contactName}
                onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent pr-10 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Repeat password"
                className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-text-secondary">
              <input
                type="checkbox"
                checked={restrictedIndustryWarrantyAccepted}
                onChange={(e) => setRestrictedIndustryWarrantyAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>We are not an adult, gambling, or alcohol business</span>
            </label>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !restrictedIndustryWarrantyAccepted}
              className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light disabled:opacity-50 transition-colors"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting request...</> : 'Request Account'}
            </button>

            <p className="text-center text-sm text-text-muted">
              Already have an account? <Link href="/login" className="text-accent font-medium hover:text-accent-light transition-colors">Sign in</Link>
            </p>
          </form>
          )}
        </div>
      </main>
    </>
  );
}

export default function RegisterPage() {
  return <RegisterForm />;
}
