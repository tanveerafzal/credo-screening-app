'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Logo } from '@/components/Logo';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { forgotPassword } from '@/lib/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
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
              <Logo size={40} />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Reset your password</h1>
            <p className="text-sm text-text-muted mt-1">We&apos;ll send you a link to reset your password</p>
          </div>

          {sent ? (
            <div className="bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 text-center">
              <CheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
              <h2 className="text-xl font-bold text-text-primary">Check your email</h2>
              <p className="mt-2 text-sm text-text-secondary">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
                Check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm text-accent font-medium hover:text-accent-light transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light disabled:opacity-50 transition-colors"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-text-muted">
                Remember your password? <Link href="/login" className="text-accent font-medium hover:text-accent-light transition-colors">Sign in</Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
