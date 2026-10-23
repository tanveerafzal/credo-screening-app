'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { LogoIcon } from '@/components/Logo';
import { Loader2 } from 'lucide-react';
import { getSignupApproval, reviewSignupApproval, type SignupApproval } from '@/lib/auth';

function ApproveAccountForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [details, setDetails] = useState<SignupApproval | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<'approve' | 'reject' | null>(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (!token) {
      setError('This approval link is missing a token.');
      setLoading(false);
      return;
    }

    getSignupApproval(token)
      .then(setDetails)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load request'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleReview = async (action: 'approve' | 'reject') => {
    setError('');
    setSubmitting(action);
    try {
      const data = await reviewSignupApproval(token, action);
      if (data.status === 'approved' || data.status === 'already_approved') {
        setResult(`Approved ${data.companyName}. We emailed ${data.email} that the account is ready.`);
      } else {
        setResult(`Rejected ${data.companyName}. We emailed ${data.email} with the update.`);
      }
      if (details) {
        setDetails({
          ...details,
          status: action === 'approve' ? 'approved' : 'rejected',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request');
    } finally {
      setSubmitting(null);
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
            <h1 className="text-2xl font-bold text-text-primary">Account approval</h1>
            <p className="text-sm text-text-muted mt-1">Review this Credo Screening signup request</p>
          </div>

          <div className="bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 space-y-4">
            {loading && (
              <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading request...
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {result && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800">
                {result}
              </div>
            )}

            {details && (
              <>
                <dl className="text-sm space-y-2">
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Company</dt>
                    <dd className="text-text-primary font-medium">{details.companyName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Contact</dt>
                    <dd className="text-text-primary">{details.contactName}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Email</dt>
                    <dd className="text-text-primary">{details.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Phone</dt>
                    <dd className="text-text-primary">{details.phone || 'N/A'}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-muted">Status</dt>
                    <dd className="text-text-primary capitalize">{details.status}</dd>
                  </div>
                </dl>

                {details.status === 'pending' && !result && (
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleReview('approve')}
                      disabled={!!submitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light disabled:opacity-50 transition-colors"
                    >
                      {submitting === 'approve' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReview('reject')}
                      disabled={!!submitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-border text-text-primary font-semibold rounded-lg hover:bg-background disabled:opacity-50 transition-colors"
                    >
                      {submitting === 'reject' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      Reject
                    </button>
                  </div>
                )}
              </>
            )}

            <p className="text-center text-sm text-text-muted">
              <Link href="/" className="text-accent font-medium hover:text-accent-light transition-colors">
                Back to site
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default function ApproveAccountPage() {
  return (
    <Suspense
      fallback={
        <main className="pt-24 pb-20 min-h-screen bg-background flex items-center justify-center">
          <p className="text-sm text-text-muted">Loading approval...</p>
        </main>
      }
    >
      <ApproveAccountForm />
    </Suspense>
  );
}
