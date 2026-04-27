import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

const API_URL = 'https://api.credoscreening.com';

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
            <p className="mt-2 text-gray-600">Everything you need to integrate CredoScreening into your application.</p>
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-indigo-700">
              <strong>Base URL:</strong> <code className="bg-indigo-100 px-1.5 py-0.5 rounded">{API_URL}/api/v1</code>
              <span className="ml-4">Need an API key? <Link href="/register" className="font-semibold underline">Create a free account</Link></span>
            </div>
          </div>

          <div className="space-y-8">
            {/* Authentication */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Authentication</h2>
              <p className="text-sm text-gray-600 mb-4">
                All requests require an API key passed in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">x-api-key</code> header.
              </p>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl -H "x-api-key: YOUR_API_KEY" \\
     ${API_URL}/api/v1/screenings`}
              </pre>
              <p className="mt-3 text-xs text-gray-500">
                Your API key is available on your <Link href="/dashboard" className="text-indigo-600 hover:underline">dashboard</Link> after registration.
              </p>
            </section>

            {/* Screen a Person */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg">POST</span>
                <code className="text-base font-mono font-semibold text-gray-900">/api/v1/screenings</code>
              </div>
              <p className="text-sm text-gray-600 mt-2 mb-5">
                Screen a person against 1.2M+ entities from OFAC, sanctions, PEP, and 80+ watchlists. Returns results instantly.
              </p>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Request Body</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Field</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Type</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Required</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { field: 'firstName', type: 'string', req: true, desc: 'First name of the person to screen' },
                      { field: 'lastName', type: 'string', req: true, desc: 'Last name of the person to screen' },
                      { field: 'dateOfBirth', type: 'string', req: false, desc: 'Date of birth (YYYY-MM-DD). Improves match accuracy' },
                      { field: 'nationality', type: 'string', req: false, desc: 'ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)' },
                      { field: 'address', type: 'string', req: false, desc: 'Full address for additional matching context' },
                      { field: 'idNumber', type: 'string', req: false, desc: 'Passport or national ID number' },
                      { field: 'externalRef', type: 'string', req: false, desc: 'Your reference ID. Returned in webhooks as referenceId' },
                    ].map(f => (
                      <tr key={f.field}>
                        <td className="px-3 py-2"><code className="text-xs bg-gray-100 px-1 rounded">{f.field}</code></td>
                        <td className="px-3 py-2 text-gray-500">{f.type}</td>
                        <td className="px-3 py-2">{f.req ? <span className="text-red-600 font-semibold">Yes</span> : <span className="text-gray-400">No</span>}</td>
                        <td className="px-3 py-2 text-gray-600">{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Example Request</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`curl -X POST ${API_URL}/api/v1/screenings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "firstName": "Vladimir",
    "lastName": "Putin",
    "nationality": "RU"
  }'`}
              </pre>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Response — No Match</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`{
  "screeningId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "hasMatch": false,
  "provider": "TRUSTCREDO",
  "queriedName": "John Smith",
  "totalMatches": 0,
  "matchedLists": [],
  "referenceId": null,
  "externalRef": null
}`}
              </pre>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Response — Match Found</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`{
  "screeningId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "hasMatch": true,
  "provider": "TRUSTCREDO",
  "queriedName": "Vladimir Putin",
  "totalMatches": 12,
  "matchedLists": [
    {
      "name": "OpenSanctions Default (All)",
      "listType": "sanction",
      "countryCode": "INTL",
      "entities": [
        {
          "name": "Vladimir Vladimirovich PUTIN",
          "score": 0.95,
          "matchLevel": "EXACT"
        },
        {
          "name": "Vladimir PUTIN",
          "score": 0.92,
          "matchLevel": "STRONG"
        }
      ],
      "matchTypes": ["exact", "strong"]
    }
  ],
  "referenceId": "your-external-ref",
  "externalRef": "your-external-ref"
}`}
              </pre>
            </section>

            {/* Get Result */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">GET</span>
                <code className="text-base font-mono font-semibold text-gray-900">/api/v1/screenings/:id</code>
              </div>
              <p className="text-sm text-gray-600 mt-2 mb-4">Retrieve a previously completed screening result by its ID.</p>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto">
{`curl ${API_URL}/api/v1/screenings/a1b2c3d4-... \\
  -H "x-api-key: YOUR_API_KEY"`}
              </pre>
            </section>

            {/* Match Levels */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Match Levels</h2>
              <p className="text-sm text-gray-600 mb-4">
                Each matched entity includes a <code className="bg-gray-100 px-1 rounded text-xs">score</code> (0.0 to 1.0)
                and a <code className="bg-gray-100 px-1 rounded text-xs">matchLevel</code> classification.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { level: 'EXACT', range: '0.95 - 1.0', color: 'border-red-200 bg-red-50', badge: 'bg-red-100 text-red-700', desc: 'Near-identical name match. High confidence.' },
                  { level: 'STRONG', range: '0.85 - 0.94', color: 'border-orange-200 bg-orange-50', badge: 'bg-orange-100 text-orange-700', desc: 'Strong match with minor variations (spelling, transliteration).' },
                  { level: 'PARTIAL', range: '0.70 - 0.84', color: 'border-yellow-200 bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700', desc: 'Partial match. Manual review recommended.' },
                  { level: 'WEAK', range: '0.50 - 0.69', color: 'border-gray-200 bg-gray-50', badge: 'bg-gray-100 text-gray-700', desc: 'Low confidence. Likely a different person.' },
                ].map(m => (
                  <div key={m.level} className={`p-4 rounded-xl border ${m.color}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.badge}`}>{m.level}</span>
                      <span className="text-xs text-gray-500">{m.range}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* List Types */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">List Types</h2>
              <div className="space-y-3">
                {[
                  { type: 'ofac', badge: 'bg-red-100 text-red-700', title: 'OFAC', desc: 'US Treasury OFAC sanctions — SDN, Consolidated, SSI, and FSE lists.' },
                  { type: 'sanction', badge: 'bg-amber-100 text-amber-700', title: 'SANCTION', desc: 'Global sanctions — EU, UN, UK OFSI, Australia, Canada, Switzerland, Japan, Singapore, and more.' },
                  { type: 'pep', badge: 'bg-purple-100 text-purple-700', title: 'PEP', desc: 'Politically Exposed Persons — heads of state, parliament members, senior government officials worldwide.' },
                ].map(t => (
                  <div key={t.type} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.badge} flex-shrink-0 mt-0.5`}>{t.title}</span>
                    <p className="text-sm text-gray-600">{t.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Webhooks */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Webhooks</h2>
              <p className="text-sm text-gray-600 mb-4">
                Configure a webhook URL to receive screening results asynchronously. Contact us to set up your webhook endpoint.
              </p>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Event Types</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                  <code className="text-xs font-mono bg-green-50 text-green-700 px-2 py-0.5 rounded-lg">screening.completed</code>
                  <span className="text-sm text-gray-600">Screening finished — no watchlist matches found</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                  <code className="text-xs font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">screening.matched</code>
                  <span className="text-sm text-gray-600">Screening finished — one or more watchlist matches found</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Webhook Payload</h3>
              <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-x-auto mb-4">
{`{
  "event": "screening.matched",
  "screeningId": "a1b2c3d4-...",
  "data": {
    "hasMatch": true,
    "provider": "TRUSTCREDO",
    "referenceId": "your-external-ref",
    "queriedName": "Vladimir Putin",
    "totalMatches": 12,
    "matchedLists": [...]
  },
  "timestamp": "2026-04-15T10:00:00.000Z"
}`}
              </pre>

              <h3 className="text-sm font-bold text-gray-800 mb-2">Signature Verification</h3>
              <p className="text-sm text-gray-600 mb-2">
                All webhook payloads are signed with HMAC-SHA256. Verify using these headers:
              </p>
              <div className="space-y-1 text-xs">
                {[
                  { header: 'X-Webhook-Signature', desc: 'HMAC-SHA256 signature of timestamp + payload' },
                  { header: 'X-Webhook-Timestamp', desc: 'Unix timestamp of when the webhook was sent' },
                  { header: 'X-Webhook-ID', desc: 'Unique ID for this webhook delivery' },
                ].map(h => (
                  <div key={h.header} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                    <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700 flex-shrink-0">{h.header}</code>
                    <span className="text-gray-600">{h.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Errors */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Error Codes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Meaning</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { code: '200', meaning: 'Success', action: 'Parse the response body', color: 'text-green-600' },
                      { code: '400', meaning: 'Bad request', action: 'Check required fields (firstName, lastName)', color: 'text-yellow-600' },
                      { code: '401', meaning: 'Unauthorized', action: 'Check your x-api-key header', color: 'text-red-600' },
                      { code: '429', meaning: 'Rate limit / quota exceeded', action: 'Wait or upgrade your plan', color: 'text-red-600' },
                      { code: '500', meaning: 'Server error', action: 'Retry with exponential backoff', color: 'text-red-600' },
                    ].map(e => (
                      <tr key={e.code}>
                        <td className="px-3 py-2"><code className={`font-bold ${e.color}`}>{e.code}</code></td>
                        <td className="px-3 py-2 text-gray-700">{e.meaning}</td>
                        <td className="px-3 py-2 text-gray-500">{e.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Rate Limits */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Rate Limits & Quotas</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Plan</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Screenings/month</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">Rate limit</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-600">API access</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { plan: 'Starter', screenings: 'Pay per use', rate: '5,000 req/15min', api: true },
                      { plan: 'Professional', screenings: 'Pay per use', rate: '5,000 req/15min', api: true },
                      { plan: 'Corporate', screenings: 'Unlimited', rate: 'Custom', api: true },
                    ].map(p => (
                      <tr key={p.plan}>
                        <td className="px-3 py-2 font-medium text-gray-900">{p.plan}</td>
                        <td className="px-3 py-2 text-gray-700">{p.screenings}</td>
                        <td className="px-3 py-2 text-gray-500">{p.rate}</td>
                        <td className="px-3 py-2">{p.api ? <CheckCircle className="w-4 h-4 text-green-500" /> : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-indigo-600 rounded-2xl p-8 text-center">
              <Shield className="w-10 h-10 text-indigo-200 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white">Ready to integrate?</h2>
              <p className="text-indigo-200 mt-2 text-sm">Create a free account and get your API key in 30 seconds.</p>
              <Link href="/register" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition">
                Get API Key <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
