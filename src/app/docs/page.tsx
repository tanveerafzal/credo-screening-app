import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Action, CheckGlyph, Container } from '@/components/site/Canvas';
import { CopyButton } from '@/components/site/CopyButton';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';

const API_URL = 'https://api.credoscreening.com';

export const metadata: Metadata = pageMetadata({
  title: 'API Documentation',
  description: 'Integrate Credo Screening via REST API. Screen against OFAC, sanctions, and PEP lists with webhooks, batch jobs, and sub-3-second response times.',
  path: '/docs',
  keywords: ['sanctions screening API', 'OFAC API', 'AML API', 'PEP screening API'],
});

const NAV = [
  { id: 'authentication', label: 'Authentication' },
  { id: 'create-screening', label: 'POST /screenings' },
  { id: 'get-screening', label: 'GET /screenings/:id' },
  { id: 'match-levels', label: 'Match Levels' },
  { id: 'list-types', label: 'List Types' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'errors', label: 'Error Codes' },
  { id: 'rate-limits', label: 'Rate Limits & Quotas' },
];

const REQUEST_FIELDS = [
  { field: 'firstName', type: 'string', req: true, desc: 'First name of the person to screen' },
  { field: 'lastName', type: 'string', req: true, desc: 'Last name of the person to screen' },
  { field: 'dateOfBirth', type: 'string', req: false, desc: 'Date of birth (YYYY-MM-DD). Improves match accuracy' },
  { field: 'nationality', type: 'string', req: false, desc: 'ISO 3166-1 alpha-2 country code (e.g., US, CA, GB)' },
  { field: 'address', type: 'string', req: false, desc: 'Full address for additional matching context' },
  { field: 'idNumber', type: 'string', req: false, desc: 'Passport or national ID number' },
  { field: 'externalRef', type: 'string', req: false, desc: 'Your reference ID. Returned in webhooks as referenceId' },
];

const MATCH_LEVELS = [
  { level: 'EXACT', range: '0.95 - 1.0', desc: 'Near-identical name match. High confidence.' },
  { level: 'STRONG', range: '0.85 - 0.94', desc: 'Strong match with minor variations (spelling, transliteration).' },
  { level: 'PARTIAL', range: '0.70 - 0.84', desc: 'Partial match. Manual review recommended.' },
  { level: 'WEAK', range: '0.50 - 0.69', desc: 'Low confidence. Likely a different person.' },
];

const LIST_TYPES = [
  { type: 'ofac', title: 'OFAC', desc: 'US Treasury OFAC sanctions — SDN, Consolidated, SSI, and FSE lists.' },
  { type: 'sanction', title: 'SANCTION', desc: 'Global sanctions — EU, UN, UK OFSI, Australia, Canada, Switzerland, Japan, Singapore, and more.' },
  { type: 'pep', title: 'PEP', desc: 'Politically Exposed Persons — heads of state, parliament members, senior government officials worldwide.' },
];

const WEBHOOK_EVENTS = [
  { event: 'screening.completed', desc: 'Screening finished — no watchlist matches found' },
  { event: 'screening.matched', desc: 'Screening finished — one or more watchlist matches found' },
];

const WEBHOOK_HEADERS = [
  { header: 'X-Webhook-Signature', desc: 'HMAC-SHA256 signature of timestamp + payload' },
  { header: 'X-Webhook-Timestamp', desc: 'Unix timestamp of when the webhook was sent' },
  { header: 'X-Webhook-ID', desc: 'Unique ID for this webhook delivery' },
];

const ERRORS = [
  { code: '200', meaning: 'Success', action: 'Parse the response body' },
  { code: '400', meaning: 'Bad request', action: 'Check required fields (firstName, lastName)' },
  { code: '401', meaning: 'Unauthorized', action: 'Check your x-api-key header' },
  { code: '429', meaning: 'Rate limit / quota exceeded', action: 'Wait or upgrade your plan' },
  { code: '500', meaning: 'Server error', action: 'Retry with exponential backoff' },
];

const PLANS = [
  { plan: 'Pay as you go', screenings: 'Credit-based', rate: '5,000 req/15min', api: true },
  { plan: 'Enterprise', screenings: 'Custom', rate: 'Custom', api: true },
];

const inlineCode = 'rounded bg-foreground/[0.05] px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground';
const prose = 'max-w-2xl text-base leading-[1.75] text-muted';
const th = 'border-b border-border-emphasized px-4 py-2.5 text-left text-xs font-medium text-tertiary first:pl-0';
const td = 'px-4 py-3 align-top first:pl-0';

function Code({ children, label }: { children: ReactNode; label: string }) {
  const text = typeof children === 'string' ? children : null;
  return (
    <div className="relative max-w-full">
      <pre
        tabIndex={0}
        aria-label={label}
        className="max-w-full overflow-x-auto rounded-lg bg-night p-5 pr-20 font-mono text-[0.8125rem] leading-[1.65] text-white/85"
      >
        {children}
      </pre>
      {text ? <CopyButton text={text} label={`Copy ${label.toLowerCase()}`} /> : null}
    </div>
  );
}

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="Scrollable table">
      <table className="w-full min-w-[34rem] border-collapse text-[0.9375rem]">{children}</table>
    </div>
  );
}

function DocSection({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border px-6 py-14 md:px-8 md:py-16">
      {children}
    </section>
  );
}

function Endpoint({ method, path }: { method: 'GET' | 'POST'; path: string }) {
  return (
    <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-lg tracking-normal sm:text-xl">
      <span className={method === 'POST' ? 'text-teal-ink' : 'text-foreground'}>{method}</span>
      <code className="break-all text-foreground-highlight">{path}</code>
    </h2>
  );
}

const h2 = 'text-xl leading-snug sm:text-2xl';
const h3 = 'mb-3 mt-10 text-base leading-snug tracking-[-0.015em]';

export default function DocsPage() {
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
                <span className="text-muted">Docs</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">API Documentation</h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">Everything you need to integrate {BRAND.name} into your application.</p>
              <dl className="mt-8 flex max-w-2xl flex-col gap-3 border-y border-border py-4 text-sm sm:flex-row sm:items-baseline sm:gap-6">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <dt className="font-medium text-foreground">Base URL:</dt>
                  <dd className="min-w-0 break-all font-mono text-[0.8125rem] text-foreground">{API_URL}/api/v1</dd>
                </div>
                <div className="text-muted">
                  Need an API key? <Link href="/register" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">Create a free account</Link>
                </div>
              </dl>
            </div>
          </Container>
        </section>

        <section className="border-t border-border px-0 md:px-12">
          <Container className="grid lg:grid-cols-12">
            <nav aria-label="API reference" className="hidden border-r border-border lg:col-span-3 lg:block">
              <ul className="sticky top-20 space-y-0.5 px-8 py-14 text-sm">
                {NAV.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className={`block rounded py-1.5 text-muted transition-colors hover:text-foreground ${n.label.startsWith('POST') || n.label.startsWith('GET') ? 'font-mono text-[0.8125rem]' : ''}`}
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 lg:col-span-9">
              {/* Authentication */}
              <DocSection id="authentication">
                <h2 className={h2}>Authentication</h2>
                <p className={`mt-4 mb-6 ${prose}`}>
                  All requests require an API key passed in the <code className={inlineCode}>x-api-key</code> header.
                </p>
                <Code label="Authentication example">
{`curl -H "x-api-key: YOUR_API_KEY" \\
     ${API_URL}/api/v1/screenings`}
              </Code>
                <p className="mt-4 text-sm text-tertiary">
                  Your API key is available on your <Link href="/dashboard" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">dashboard</Link> after registration.
                </p>
              </DocSection>

              {/* Screen a Person */}
              <DocSection id="create-screening">
                <Endpoint method="POST" path="/api/v1/screenings" />
                <p className={`mt-4 ${prose}`}>
                  Screen a person against 1.2M+ entities from OFAC, sanctions, PEP, and 80+ watchlists. Returns results instantly.
                </p>

                <h3 className={h3}>Request Body</h3>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" className={th}>Field</th>
                      <th scope="col" className={th}>Type</th>
                      <th scope="col" className={th}>Required</th>
                      <th scope="col" className={th}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REQUEST_FIELDS.map((f) => (
                      <tr key={f.field} className="border-b border-border">
                        <td className={td}><code className="font-mono text-[0.8125rem] text-foreground">{f.field}</code></td>
                        <td className={`${td} font-mono text-[0.8125rem] text-tertiary`}>{f.type}</td>
                        <td className={td}>{f.req ? <span className="font-medium text-foreground">Yes</span> : <span className="text-tertiary">No</span>}</td>
                        <td className={`${td} text-muted`}>{f.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <h3 className={h3}>Example Request</h3>
                <Code label="Example request">
{`curl -X POST ${API_URL}/api/v1/screenings \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "firstName": "Vladimir",
    "lastName": "Putin",
    "nationality": "RU"
  }'`}
              </Code>

                <h3 className={h3}>Response — No Match</h3>
                <Code label="Response with no match">
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
              </Code>

                <h3 className={h3}>Response — Match Found</h3>
                <Code label="Response with a match">
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
              </Code>
              </DocSection>

              {/* Get Result */}
              <DocSection id="get-screening">
                <Endpoint method="GET" path="/api/v1/screenings/:id" />
                <p className={`mt-4 mb-6 ${prose}`}>Retrieve a previously completed screening result by its ID.</p>
                <Code label="Get screening example">
{`curl ${API_URL}/api/v1/screenings/a1b2c3d4-... \\
  -H "x-api-key: YOUR_API_KEY"`}
              </Code>
              </DocSection>

              {/* Match Levels */}
              <DocSection id="match-levels">
                <h2 className={h2}>Match Levels</h2>
                <p className={`mt-4 mb-8 ${prose}`}>
                  Each matched entity includes a <code className={inlineCode}>score</code> (0.0 to 1.0)
                  and a <code className={inlineCode}>matchLevel</code> classification.
                </p>
                <dl className="border-t border-border">
                  {MATCH_LEVELS.map((m) => (
                    <div key={m.level} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[7rem_7rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[0.8125rem] font-medium text-foreground">{m.level}</dt>
                      <dd className="font-mono text-[0.8125rem] text-tertiary">{m.range}</dd>
                      <dd className="text-[0.9375rem] leading-[1.65] text-muted">{m.desc}</dd>
                    </div>
                  ))}
                </dl>
              </DocSection>

              {/* List Types */}
              <DocSection id="list-types">
                <h2 className={h2}>List Types</h2>
                <dl className="mt-8 border-t border-border">
                  {LIST_TYPES.map((t) => (
                    <div key={t.type} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[0.8125rem] font-medium text-foreground">{t.title}</dt>
                      <dd className="text-[0.9375rem] leading-[1.65] text-muted">{t.desc}</dd>
                    </div>
                  ))}
                </dl>
              </DocSection>

              {/* Webhooks */}
              <DocSection id="webhooks">
                <h2 className={h2}>Webhooks</h2>
                <p className={`mt-4 ${prose}`}>
                  Configure a webhook URL to receive screening results asynchronously. Contact us to set up your webhook endpoint.
                </p>

                <h3 className={h3}>Event Types</h3>
                <dl className="border-t border-border">
                  {WEBHOOK_EVENTS.map((e) => (
                    <div key={e.event} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
                      <dt><code className="font-mono text-[0.8125rem] text-foreground">{e.event}</code></dt>
                      <dd className="text-[0.9375rem] leading-[1.65] text-muted">{e.desc}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className={h3}>Webhook Payload</h3>
                <Code label="Webhook payload example">
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
              </Code>

                <h3 className={h3}>Signature Verification</h3>
                <p className={`mb-4 ${prose}`}>
                  All webhook payloads are signed with HMAC-SHA256. Verify using these headers:
                </p>
                <dl className="border-t border-border">
                  {WEBHOOK_HEADERS.map((h) => (
                    <div key={h.header} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
                      <dt><code className="font-mono text-[0.8125rem] text-foreground">{h.header}</code></dt>
                      <dd className="text-[0.9375rem] leading-[1.65] text-muted">{h.desc}</dd>
                    </div>
                  ))}
                </dl>
              </DocSection>

              {/* Errors */}
              <DocSection id="errors">
                <h2 className={`mb-8 ${h2}`}>Error Codes</h2>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" className={th}>Status</th>
                      <th scope="col" className={th}>Meaning</th>
                      <th scope="col" className={th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ERRORS.map((e) => (
                      <tr key={e.code} className="border-b border-border">
                        <td className={td}><code className={`font-mono text-[0.8125rem] font-medium ${e.code === '200' ? 'text-teal-ink' : 'text-foreground'}`}>{e.code}</code></td>
                        <td className={`${td} text-foreground`}>{e.meaning}</td>
                        <td className={`${td} text-muted`}>{e.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </DocSection>

              {/* Rate Limits */}
              <DocSection id="rate-limits">
                <h2 className={`mb-8 ${h2}`}>Rate Limits &amp; Quotas</h2>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col" className={th}>Plan</th>
                      <th scope="col" className={th}>Screenings/month</th>
                      <th scope="col" className={th}>Rate limit</th>
                      <th scope="col" className={th}>API access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLANS.map((p) => (
                      <tr key={p.plan} className="border-b border-border">
                        <td className={`${td} font-medium text-foreground`}>{p.plan}</td>
                        <td className={`${td} text-muted`}>{p.screenings}</td>
                        <td className={`${td} font-mono text-[0.8125rem] text-muted`}>{p.rate}</td>
                        <td className={td}>{p.api ? <><CheckGlyph /><span className="sr-only">Yes</span></> : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </DocSection>

              {/* CTA */}
              <section className="px-6 py-14 md:px-8 md:py-16">
                <h2 className={h2}>Ready to integrate?</h2>
                <p className={`mt-3 ${prose}`}>Create a free account and get your API key in 30 seconds.</p>
                <div className="mt-6">
                  <Action href="/register" arrow>Get API Key</Action>
                </div>
              </section>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
