'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Key, Copy, Check, Search, Loader2, AlertTriangle, CheckCircle, LogOut } from 'lucide-react';
import { getAuth, clearAuth, getProfile } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://id-verify-api-214036150009.northamerica-northeast2.run.app';

interface ScreeningResult {
  screeningId: string;
  hasMatch: boolean;
  queriedName: string;
  totalMatches: number;
  matchedLists: Array<{
    name: string;
    listType: string;
    entities: Array<{ name: string; score: number; matchLevel: string }>;
  }>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [partner, setPartner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  // Screening form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [screening, setScreening] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [screenError, setScreenError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.push('/login');
      return;
    }
    getProfile(auth.token)
      .then((p) => setPartner(p))
      .catch(() => {
        clearAuth();
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleLogout = () => {
    clearAuth();
    router.push('/');
  };

  const handleScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    setScreenError('');
    setResult(null);

    if (!firstName.trim() || !lastName.trim()) {
      setScreenError('First and last name are required.');
      return;
    }

    setScreening(true);
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
          'x-api-key': partner.apiKey,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      if (!res.ok) throw new Error(data.error || data.message || 'Screening failed');
      setResult(data);
    } catch (err) {
      setScreenError(err instanceof Error ? err.message : 'Screening failed');
    } finally {
      setScreening(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome, {partner?.contactName || partner?.companyName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:border-gray-300 transition"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>

          {/* API Keys */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">API Credentials</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">Use these credentials to integrate screening into your application.</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <div className="text-xs font-medium text-gray-500">API Key</div>
                  <code className="text-sm font-mono text-gray-900">{partner?.apiKey}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(partner?.apiKey || '', 'apiKey')}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  {copied === 'apiKey' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'apiKey' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <div>
                  <div className="text-xs font-medium text-gray-500">API Secret</div>
                  <code className="text-sm font-mono text-gray-900">{partner?.apiSecret}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(partner?.apiSecret || '', 'apiSecret')}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                >
                  {copied === 'apiSecret' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === 'apiSecret' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <strong>Keep your API secret safe.</strong> Do not share it publicly or commit it to version control.
            </div>
          </div>

          {/* Quick API Example */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Start</h2>
            <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl -X POST ${API_URL}/api/v1/screenings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${partner?.apiKey || 'YOUR_API_KEY'}" \\
  -d '{"firstName": "John", "lastName": "Doe"}'`}
            </pre>
          </div>

          {/* Screening Tool */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Run Screening</h2>
            </div>

            <form onSubmit={handleScreen}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="e.g. US"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={screening}
                className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                {screening ? <><Loader2 className="w-4 h-4 animate-spin" /> Screening...</> : <><Search className="w-4 h-4" /> Screen</>}
              </button>
            </form>

            {screenError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {screenError}
              </div>
            )}

            {result && (
              <div className={`mt-4 rounded-xl border p-4 ${result.hasMatch ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {result.hasMatch ? <AlertTriangle className="w-5 h-5 text-red-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                  <span className={`font-semibold ${result.hasMatch ? 'text-red-800' : 'text-green-800'}`}>
                    {result.hasMatch ? `${result.totalMatches} match${result.totalMatches > 1 ? 'es' : ''}` : 'All clear'} — {result.queriedName}
                  </span>
                </div>
                {result.matchedLists.map((list, i) => (
                  <div key={i} className="mt-2 bg-white rounded-lg border border-red-100 p-3 text-sm">
                    <div className="font-medium text-gray-900">{list.name} <span className="text-xs text-gray-500 uppercase">{list.listType}</span></div>
                    {list.entities.map((e, j) => (
                      <div key={j} className="flex justify-between text-xs mt-1 text-gray-600">
                        <span>{e.name}</span>
                        <span>{(e.score * 100).toFixed(0)}% ({e.matchLevel})</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="mt-2 text-xs text-gray-500">ID: {result.screeningId}</div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
