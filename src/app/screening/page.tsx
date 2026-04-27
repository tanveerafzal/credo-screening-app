'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Search, AlertTriangle, CheckCircle, Loader2, LogIn, UserPlus } from 'lucide-react';
import { getAuth } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';

interface MatchedEntity {
  name: string;
  birthdate?: string;
  score: number;
  matchLevel: string;
}

interface MatchedList {
  name: string;
  listType: 'pep' | 'sanction' | 'ofac';
  countryCode?: string;
  url?: string;
  entities: MatchedEntity[];
  matchTypes: string[];
}

interface ScreeningResult {
  screeningId: string;
  hasMatch: boolean;
  provider: string;
  queriedName: string;
  totalMatches: number;
  matchedLists: MatchedList[];
}

const DAILY_LIMIT = 10;
const STORAGE_KEY = 'credoscreening_daily';

function getDailyUsage(): { count: number; date: string } {
  if (typeof window === 'undefined') return { count: 0, date: '' };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { count: 0, date: '' };
    const data = JSON.parse(stored);
    const today = new Date().toISOString().split('T')[0];
    if (data.date !== today) return { count: 0, date: today };
    return data;
  } catch {
    return { count: 0, date: '' };
  }
}

function incrementUsage() {
  const today = new Date().toISOString().split('T')[0];
  const current = getDailyUsage();
  const newCount = current.date === today ? current.count + 1 : 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ count: newCount, date: today }));
  return newCount;
}

const listTypeBadge: Record<string, { bg: string; text: string; label: string }> = {
  ofac: { bg: 'bg-red-100', text: 'text-red-700', label: 'OFAC' },
  sanction: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'SANCTION' },
  pep: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'PEP' },
};

export default function ScreeningPage() {
  const router = useRouter();

  // Restore saved screening input (from before login/register redirect)
  const pending = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('cs_pending_screening') || 'null')
    : null;

  const [firstName, setFirstName] = useState(pending?.firstName || '');
  const [lastName, setLastName] = useState(pending?.lastName || '');
  const [dob, setDob] = useState(pending?.dateOfBirth || '');
  const [nationality, setNationality] = useState(pending?.nationality || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [error, setError] = useState('');
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [limitInfo, setLimitInfo] = useState<{ used: number; limit: number } | null>(null);

  const remaining = DAILY_LIMIT - getDailyUsage().count;

  const saveScreeningInput = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cs_pending_screening', JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: dob.trim() || undefined,
        nationality: nationality.trim() || undefined,
      }));
    }
  };

  const handleScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setShowAuthPrompt(false);
    setShowUpgradePrompt(false);
    setLimitInfo(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required.');
      return;
    }

    // Check if user is logged in FIRST — never call the API without auth
    const auth = getAuth();
    if (!auth || !auth.partner?.apiKey) {
      saveScreeningInput();
      setShowAuthPrompt(true);
      return;
    }

    setLoading(true);

    try {
      const body: Record<string, string> = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      if (dob.trim()) body.dateOfBirth = dob.trim();
      if (nationality.trim()) body.nationality = nationality.trim();

      const res = await fetch(`${API_URL}/api/v1/screenings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': auth.partner.apiKey,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      // Handle 429 / monthly limit reached
      if (res.status === 429 || (data.error && String(data.error).toLowerCase().includes('limit'))) {
        setLimitInfo({ used: data.used || 10, limit: data.limit || 10 });
        setShowUpgradePrompt(true);
        return;
      }

      // Handle 401 / unauthorized — clear stale auth
      if (res.status === 401) {
        saveScreeningInput();
        setShowAuthPrompt(true);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Screening failed (${res.status})`);
      }

      setResult(data);
      incrementUsage();
      localStorage.removeItem('cs_pending_screening');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Screening failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-4">
              <Shield className="w-3.5 h-3.5" /> Free Screening Tool
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Screen Against 1.2M+ Entities</h1>
            <p className="mt-2 text-gray-600">
              Check any name against OFAC, global sanctions, PEP databases, and 80+ watchlists.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {remaining > 0
                ? `${remaining} free screening${remaining !== 1 ? 's' : ''} remaining today`
                : 'Daily limit reached. Sign up for unlimited access.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleScreen} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Vladimir"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Putin"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="e.g. RU, US, CA"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Screening...</>
              ) : (
                <><Search className="w-4 h-4" /> Run Screening</>
              )}
            </button>
          </form>

          {/* Auth Prompt */}
          {showAuthPrompt && (
            <div className="mt-6 bg-white rounded-2xl border border-indigo-200 shadow-sm overflow-hidden">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                <h3 className="font-semibold text-indigo-900">Sign in to run your screening</h3>
                <p className="text-sm text-indigo-700 mt-1">
                  Create a free account to screen against 1.2M+ entities. Your screening details have been saved.
                </p>
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login?redirect=/screening"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition text-sm"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
                <Link
                  href="/register?redirect=/screening"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition text-sm"
                >
                  <UserPlus className="w-4 h-4" /> Create Free Account
                </Link>
              </div>
              <div className="px-6 pb-4">
                <p className="text-xs text-gray-500 text-center">First month free — up to 10 verifications & 10 screenings. No credit card required.</p>
              </div>
            </div>
          )}

          {/* Upgrade Prompt (monthly limit reached) */}
          {showUpgradePrompt && (
            <div className="mt-6 bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-amber-900">Monthly screening limit reached</h3>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  You've reached the screening limit. Upgrade to continue screening.
                </p>
              </div>
              <div className="p-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#pricing"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition text-sm"
                >
                  View Plans
                </Link>
                <Link
                  href="/contact?plan=enterprise"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition text-sm"
                >
                  Contact Sales
                </Link>
              </div>
              <div className="px-6 pb-4">
                <p className="text-xs text-gray-500 text-center">Pro plan starts at $49/month for 1,000 screenings.</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* Subject Information */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Subject Information</h3>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="flex justify-between sm:block">
                    <span className="text-gray-500">First Name</span>
                    <span className="sm:ml-2 font-medium text-gray-900">{firstName.trim()}</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-gray-500">Last Name</span>
                    <span className="sm:ml-2 font-medium text-gray-900">{lastName.trim()}</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-gray-500">Date of Birth</span>
                    <span className="sm:ml-2 font-medium text-gray-900">{dob.trim() || '—'}</span>
                  </div>
                  <div className="flex justify-between sm:block">
                    <span className="text-gray-500">Nationality</span>
                    <span className="sm:ml-2 font-medium text-gray-900">{nationality.trim() || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Screening Result */}
              <div className={`rounded-2xl border p-6 ${result.hasMatch ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-3 mb-4">
                  {result.hasMatch ? (
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  <div>
                    <h2 className={`text-lg font-bold ${result.hasMatch ? 'text-red-800' : 'text-green-800'}`}>
                      {result.hasMatch
                        ? `${result.totalMatches} Match${result.totalMatches > 1 ? 'es' : ''} Found`
                        : 'All Clear'}
                    </h2>
                    <p className={`text-sm ${result.hasMatch ? 'text-red-600' : 'text-green-600'}`}>
                      Screened: {result.queriedName}
                    </p>
                  </div>
                </div>

                {result.hasMatch && result.matchedLists.map((list, i) => {
                  const badge = listTypeBadge[list.listType] || listTypeBadge.sanction;
                  return (
                    <div key={i} className="mt-4 bg-white rounded-xl border border-red-100 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm text-gray-900">{list.name}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                        {list.countryCode && (
                          <span className="text-xs text-gray-500">{list.countryCode}</span>
                        )}
                      </div>
                      {list.entities.map((entity, j) => (
                        <div key={j} className="flex justify-between items-center py-1.5 border-t border-gray-50 text-sm">
                          <div>
                            <span className="text-gray-700">{entity.name}</span>
                            {entity.birthdate && (
                              <span className="ml-2 text-xs text-gray-400">DOB: {entity.birthdate}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{entity.matchLevel}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              entity.score >= 0.9 ? 'bg-red-100 text-red-700' :
                              entity.score >= 0.8 ? 'bg-orange-100 text-orange-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {(entity.score * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}

                <p className="mt-4 text-xs text-gray-500">
                  Screening ID: {result.screeningId} | Provider: {result.provider}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
