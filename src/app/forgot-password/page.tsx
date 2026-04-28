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
      <main className="pt-24 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size={40} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
            <p className="text-sm text-gray-500 mt-1">We'll send you a link to reset your password</p>
          </div>

          {sent ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Check your email</h2>
              <p className="mt-2 text-sm text-gray-600">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                Check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Remember your password? <Link href="/login" className="text-indigo-600 font-medium hover:underline">Sign in</Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
