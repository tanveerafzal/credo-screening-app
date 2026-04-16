'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Key, Copy, Check, Search, Loader2, AlertTriangle, CheckCircle,
  LogOut, History, BookOpen, LayoutDashboard, Clock
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { getAuth, clearAuth, getProfile } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';

type Tab = 'overview' | 'screenings' | 'docs';

interface ScreeningRecord {
  id: string;
  status: string;
  verdict: string | null;
  dataset: string;
  createdAt: string;
  completedAt: string | null;
  processingTimeMs: number | null;
  inputPayload: { firstName?: string; lastName?: string; dateOfBirth?: string; nationality?: string; [key: string]: any };
  resultPayload: any;
}

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
  const [tab, setTab] = useState<Tab>('overview');
  const [copied, setCopied] = useState<string | null>(null);

  // Screening form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [nationality, setNationality] = useState('');
  const [screening, setScreening] = useState(false);
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [screenError, setScreenError] = useState('');

  // Screening history
  const [history, setHistory] = useState<ScreeningRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    if (!auth) { router.push('/login'); return; }
    getProfile(auth.token)
      .then((p) => setPartner(p))
      .catch(() => { clearAuth(); router.push('/login'); })
      .finally(() => setLoading(false));
  }, [router]);

  const loadHistory = useCallback(async () => {
    const auth = getAuth();
    if (!auth) return;
    setLoadingHistory(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/partners/screenings`, {
        headers: { 'Authorization': `Bearer ${auth.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.data || data || []);
      }
    } catch { /* silent */ }
    finally { setLoadingHistory(false); }
  }, []);

  useEffect(() => {
    if (tab === 'screenings') loadHistory();
  }, [tab, loadHistory]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleScreen = async (e: React.FormEvent) => {
    e.preventDefault();
    setScreenError('');
    setResult(null);
    if (!firstName.trim() || !lastName.trim()) { setScreenError('First and last name required.'); return; }
    setScreening(true);
    try {
      const body: Record<string, string> = { firstName: firstName.trim(), lastName: lastName.trim() };
      if (dob.trim()) body.dateOfBirth = dob.trim();
      if (nationality.trim()) body.nationality = nationality.trim();
      const res = await fetch(`${API_URL}/api/v1/screenings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': partner.apiKey },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      if (!res.ok) throw new Error(data.error || data.message || 'Screening failed');
      setResult(data);
    } catch (err) { setScreenError(err instanceof Error ? err.message : 'Screening failed'); }
    finally { setScreening(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const sidebarItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'screenings', label: 'Screenings', icon: History },
    { id: 'docs', label: 'API Docs', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-5 border-b border-gray-100">
          <Logo size={28} />
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-900 truncate">{partner?.companyName}</div>
          <div className="text-xs text-gray-500 truncate">{partner?.contactEmail}</div>
          <button
            onClick={() => { clearAuth(); router.push('/'); }}
            className="mt-3 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Overview Tab */}
        {tab === 'overview' && (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

            {/* API Keys */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">API Credentials</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'API Key', value: partner?.apiKey, key: 'apiKey' },
                  { label: 'API Secret', value: partner?.apiSecret, key: 'apiSecret' },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <div>
                      <div className="text-xs font-medium text-gray-500">{item.label}</div>
                      <code className="text-sm font-mono text-gray-900">{item.value}</code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value || '', item.key)}
                      className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      {copied === item.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === item.key ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Run Screening */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Run Screening</h2>
              </div>
              <form onSubmit={handleScreen}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'First Name *', value: firstName, set: setFirstName, placeholder: 'e.g. John' },
                    { label: 'Last Name *', value: lastName, set: setLastName, placeholder: 'e.g. Doe' },
                    { label: 'Date of Birth', value: dob, set: setDob, placeholder: 'YYYY-MM-DD' },
                    { label: 'Nationality', value: nationality, set: setNationality, placeholder: 'e.g. US' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input type="text" value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={screening}
                  className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition">
                  {screening ? <><Loader2 className="w-4 h-4 animate-spin" /> Screening...</> : <><Search className="w-4 h-4" /> Screen</>}
                </button>
              </form>

              {screenError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />{screenError}
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
        )}

        {/* Screenings History Tab */}
        {tab === 'screenings' && (
          <div className="max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Screening History</h1>
              <button onClick={loadHistory} disabled={loadingHistory}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                {loadingHistory ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {loadingHistory && history.length === 0 ? (
              <div className="text-center py-12"><Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" /></div>
            ) : history.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No screenings yet. Run your first screening from the Overview tab.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-5 py-3 font-semibold text-gray-600">Request</th>
                      <th className="px-5 py-3 font-semibold text-gray-600">Result</th>
                      <th className="px-5 py-3 font-semibold text-gray-600">Time</th>
                      <th className="px-5 py-3 font-semibold text-gray-600">Date</th>
                      <th className="px-5 py-3 font-semibold text-gray-600 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {history.map(s => {
                      const input = s.inputPayload || {};
                      const name = `${input.firstName || ''} ${input.lastName || ''}`.trim();
                      const hasMatch = s.verdict === 'FLAG';
                      const isExpanded = expandedId === s.id;
                      const resp = s.resultPayload || {};
                      const matchedLists: Array<{ name: string; listType: string; entities: Array<{ name: string; score: number; matchLevel: string }> }> = resp.matchedLists || [];

                      return (
                        <>
                          <tr key={s.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : s.id)}>
                            <td className="px-5 py-3">
                              <div className="font-medium text-gray-900">{name || '—'}</div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {[input.dateOfBirth, input.nationality].filter(Boolean).join(' · ') || ''}
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              {s.status === 'COMPLETED' ? (
                                <div>
                                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                                    hasMatch ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                  }`}>
                                    {hasMatch ? <><AlertTriangle className="w-3 h-3" /> {resp.totalMatches || 0} Match{(resp.totalMatches || 0) > 1 ? 'es' : ''}</> : <><CheckCircle className="w-3 h-3" /> Clear</>}
                                  </span>
                                  {hasMatch && matchedLists.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {matchedLists.slice(0, 3).map((l, i) => (
                                        <span key={i} className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                          l.listType === 'ofac' ? 'bg-red-50 text-red-600' :
                                          l.listType === 'pep' ? 'bg-purple-50 text-purple-600' :
                                          'bg-amber-50 text-amber-600'
                                        }`}>
                                          {l.listType.toUpperCase()}
                                        </span>
                                      ))}
                                      {matchedLists.length > 3 && <span className="text-[10px] text-gray-400">+{matchedLists.length - 3}</span>}
                                    </div>
                                  )}
                                </div>
                              ) : s.status === 'FAILED' ? (
                                <span className="text-xs font-semibold text-red-500">Failed</span>
                              ) : (
                                <span className="text-xs text-gray-500">{s.status}</span>
                              )}
                            </td>
                            <td className="px-5 py-3 text-gray-500">
                              {s.processingTimeMs ? `${(s.processingTimeMs / 1000).toFixed(1)}s` : '—'}
                            </td>
                            <td className="px-5 py-3 text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>
                            <td className="px-5 py-3 text-gray-400">
                              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`${s.id}-detail`}>
                              <td colSpan={5} className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                                <div className="grid md:grid-cols-2 gap-4">
                                  {/* Request */}
                                  <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Request</h4>
                                    <pre className="bg-gray-900 text-gray-100 rounded-xl p-3 text-xs overflow-x-auto">
{JSON.stringify(s.inputPayload, null, 2)}
                                    </pre>
                                  </div>
                                  {/* Response */}
                                  <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Response</h4>
                                    {s.status === 'COMPLETED' && resp ? (
                                      hasMatch ? (
                                        <div className="space-y-2">
                                          {matchedLists.map((list, i) => (
                                            <div key={i} className="bg-white rounded-lg border border-red-100 p-3">
                                              <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-xs text-gray-900">{list.name}</span>
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                                  list.listType === 'ofac' ? 'bg-red-100 text-red-700' :
                                                  list.listType === 'pep' ? 'bg-purple-100 text-purple-700' :
                                                  'bg-amber-100 text-amber-700'
                                                }`}>{list.listType.toUpperCase()}</span>
                                              </div>
                                              {list.entities.map((ent, j) => (
                                                <div key={j} className="flex justify-between text-xs mt-1 py-0.5">
                                                  <span className="text-gray-700">{ent.name}</span>
                                                  <span className={`font-semibold ${
                                                    ent.score >= 0.9 ? 'text-red-600' : ent.score >= 0.8 ? 'text-orange-600' : 'text-yellow-600'
                                                  }`}>{(ent.score * 100).toFixed(0)}%</span>
                                                </div>
                                              ))}
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                          <span className="text-sm text-green-700 font-medium">No matches found — all clear</span>
                                        </div>
                                      )
                                    ) : (
                                      <pre className="bg-gray-900 text-gray-100 rounded-xl p-3 text-xs overflow-x-auto">
{JSON.stringify(resp, null, 2)}
                                      </pre>
                                    )}
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-gray-400">
                                  Screening ID: <code className="font-mono">{s.id}</code>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* API Docs Tab */}
        {tab === 'docs' && (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">API Documentation</h1>

            <div className="space-y-6">
              {/* Authentication */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h2>
                <p className="text-sm text-gray-600 mb-3">
                  All API requests require your API key in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">x-api-key</code> header.
                </p>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl -H "x-api-key: ${partner?.apiKey || 'YOUR_API_KEY'}" \\
     ${API_URL}/api/v1/screenings`}
                </pre>
              </div>

              {/* Screen a Person */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">POST</span>
                  <code className="text-sm font-mono text-gray-900">/api/v1/screenings</code>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Screen a person against all watchlists. Returns matches instantly.
                </p>

                <h3 className="text-sm font-semibold text-gray-700 mb-2">Request Body</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`{
  "firstName": "John",          // required
  "lastName": "Doe",            // required
  "dateOfBirth": "1990-01-15",  // optional - improves accuracy
  "nationality": "US",          // optional - ISO 3166-1 alpha-2
  "address": "123 Main St",    // optional
  "idNumber": "A12345678",     // optional - passport/ID number
  "externalRef": "your-id-123" // optional - returned in webhooks
}`}
                </pre>

                <h3 className="text-sm font-semibold text-gray-700 mb-2">Response — No Matches</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`{
  "screeningId": "a1b2c3d4-...",
  "hasMatch": false,
  "provider": "TRUSTCREDO",
  "queriedName": "John Doe",
  "totalMatches": 0,
  "matchedLists": []
}`}
                </pre>

                <h3 className="text-sm font-semibold text-gray-700 mb-2">Response — Matches Found</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`{
  "screeningId": "a1b2c3d4-...",
  "hasMatch": true,
  "provider": "TRUSTCREDO",
  "queriedName": "Vladimir Putin",
  "totalMatches": 5,
  "matchedLists": [
    {
      "name": "OFAC SDN List",
      "listType": "ofac",
      "countryCode": "US",
      "entities": [
        {
          "name": "Vladimir Vladimirovich PUTIN",
          "score": 0.95,
          "matchLevel": "EXACT"
        }
      ],
      "matchTypes": ["exact"]
    }
  ]
}`}
                </pre>

                <h3 className="text-sm font-semibold text-gray-700 mb-2">Full Example</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl -X POST ${API_URL}/api/v1/screenings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${partner?.apiKey || 'YOUR_API_KEY'}" \\
  -d '{
    "firstName": "Vladimir",
    "lastName": "Putin",
    "nationality": "RU"
  }'`}
                </pre>
              </div>

              {/* Get Screening Result */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">GET</span>
                  <code className="text-sm font-mono text-gray-900">/api/v1/screenings/:id</code>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Retrieve a screening result by ID.
                </p>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl ${API_URL}/api/v1/screenings/a1b2c3d4-... \\
  -H "x-api-key: ${partner?.apiKey || 'YOUR_API_KEY'}"`}
                </pre>
              </div>

              {/* Match Levels */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Match Levels</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { level: 'EXACT', score: '95%+', color: 'bg-red-100 text-red-700', desc: 'Near-identical match' },
                    { level: 'STRONG', score: '85-94%', color: 'bg-orange-100 text-orange-700', desc: 'High confidence match' },
                    { level: 'PARTIAL', score: '70-84%', color: 'bg-yellow-100 text-yellow-700', desc: 'Possible match, review recommended' },
                    { level: 'WEAK', score: '50-69%', color: 'bg-gray-100 text-gray-700', desc: 'Low confidence, likely false positive' },
                  ].map(m => (
                    <div key={m.level} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.color}`}>{m.level}</span>
                      <div>
                        <div className="text-xs text-gray-500">{m.score}</div>
                        <div className="text-xs text-gray-600">{m.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* List Types */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">List Types</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { type: 'ofac', label: 'OFAC', desc: 'US Treasury sanctions (SDN, Consolidated, SSI, FSE)', color: 'bg-red-100 text-red-700' },
                    { type: 'sanction', label: 'SANCTION', desc: 'Global sanctions (EU, UN, UK, AU, CA, CH, etc.)', color: 'bg-amber-100 text-amber-700' },
                    { type: 'pep', label: 'PEP', desc: 'Politically Exposed Persons (parliament members, government officials)', color: 'bg-purple-100 text-purple-700' },
                  ].map(t => (
                    <div key={t.type} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.color}`}>{t.label}</span>
                      <span className="text-gray-600">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhooks */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Webhooks</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Configure a webhook URL to receive screening results asynchronously. We send two event types:
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="p-3 rounded-lg border border-gray-100">
                    <code className="text-xs font-mono bg-green-50 text-green-700 px-1.5 py-0.5 rounded">screening.completed</code>
                    <span className="text-gray-600 ml-2">— No matches found</span>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-100">
                    <code className="text-xs font-mono bg-red-50 text-red-700 px-1.5 py-0.5 rounded">screening.matched</code>
                    <span className="text-gray-600 ml-2">— Watchlist matches found</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Webhook Payload</h3>
                <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`{
  "event": "screening.matched",
  "screeningId": "a1b2c3d4-...",
  "data": {
    "hasMatch": true,
    "referenceId": "your-external-ref",
    "matchedLists": [ ... ]
  },
  "timestamp": "2026-04-15T10:00:00Z"
}`}
                </pre>
                <p className="mt-3 text-xs text-gray-500">
                  Webhooks are signed with HMAC-SHA256. Verify using the <code className="bg-gray-100 px-1 rounded">X-Webhook-Signature</code> header.
                </p>
              </div>

              {/* Rate Limits */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Rate Limits & Errors</h2>
                <div className="space-y-2 text-sm">
                  {[
                    { code: '200', desc: 'Success', color: 'text-green-600' },
                    { code: '400', desc: 'Invalid request (missing required fields)', color: 'text-yellow-600' },
                    { code: '401', desc: 'Invalid or missing API key', color: 'text-red-600' },
                    { code: '429', desc: 'Rate limit exceeded (5,000 req/15min)', color: 'text-red-600' },
                    { code: '500', desc: 'Server error', color: 'text-red-600' },
                  ].map(e => (
                    <div key={e.code} className="flex items-center gap-3 p-2">
                      <code className={`text-xs font-bold ${e.color}`}>{e.code}</code>
                      <span className="text-gray-600">{e.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
