'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Action, CheckGlyph, Container, Tag, cx } from '@/components/site/Canvas';
import { getAuth } from '@/lib/auth';
import { FREE_TRIAL, PRODUCT_PRICES, formatUsd } from '@/lib/pricing';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://id-verify-api-test-857526422891.northamerica-northeast2.run.app';

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
const STORAGE_KEY = 'credo_daily';

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

const listTypeBadge: Record<string, { label: string }> = {
  ofac: { label: 'OFAC' },
  sanction: { label: 'SANCTION' },
  pep: { label: 'PEP' },
};

const inputClass =
  'h-11 w-full rounded-lg border border-border-emphasized bg-background px-3.5 text-[0.9375rem] text-foreground placeholder:text-tertiary transition-colors focus:outline-none focus-visible:border-teal-ink focus-visible:ring-4 focus-visible:ring-teal-wash';

export default function ScreeningPage() {
  const router = useRouter();

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
  const [upgradeReason, setUpgradeReason] = useState<'limit' | 'credits'>('limit');
  const [limitInfo, setLimitInfo] = useState<{ used: number; limit: number } | null>(null);

  const remaining = DAILY_LIMIT - getDailyUsage().count;

  /**
   * Best-effort admin alert so we can monitor how many people try the free
   * screening tool. Fire-and-forget — never blocks or breaks the screening.
   */
  const notifyAdminOfAttempt = (loggedIn: boolean) => {
    try {
      const auth = getAuth();
      const payload = JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: dob.trim() || undefined,
        nationality: nationality.trim() || undefined,
        company: auth?.partner?.companyName,
        loggedIn,
      });
      // keepalive lets the request finish even if the page navigates.
      fetch('/api/screening-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* ignore — alerting must never affect the user */
    }
  };

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

    const auth = getAuth();
    const loggedIn = Boolean(auth && auth.partner?.apiKey);

    // Let the admin know someone tried a screening (fire-and-forget).
    notifyAdminOfAttempt(loggedIn);

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

      if (res.status === 429 || (data.error && String(data.error).toLowerCase().includes('limit'))) {
        setLimitInfo({ used: data.used || 10, limit: data.limit || 10 });
        setUpgradeReason('limit');
        setShowUpgradePrompt(true);
        return;
      }

      if (res.status === 401) {
        saveScreeningInput();
        setShowAuthPrompt(true);
        return;
      }

      // 402 = no screening credits (e.g. legacy / exhausted balance). Show a
      // friendly prompt to buy credits or start free instead of a raw error.
      if (
        res.status === 402 ||
        (data.error && /credit/i.test(String(data.error))) ||
        (data.message && /credit/i.test(String(data.message)))
      ) {
        setUpgradeReason('credits');
        setShowUpgradePrompt(true);
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

      <main className="flex min-h-screen flex-col bg-background">
        <section className="flex flex-1 flex-col px-0 md:px-12">
          <Container className="grid flex-1 content-start gap-12 px-6 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40 lg:grid-cols-12">
            {/* Header */}
            <div className="lg:col-span-5">
              <p className="mb-6 text-sm text-tertiary">
                <Link href="/" className="hover:text-foreground">Credo</Link>
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-muted">Free Screening Tool</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Screen Against 1.2M+ Entities</h1>
              <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.7] text-muted">
                Check any name against OFAC, global sanctions, PEP databases, and 80+ watchlists.
              </p>
              <p className="mt-5 font-mono text-xs text-tertiary">
                {remaining > 0
                  ? `${remaining} free screening${remaining !== 1 ? 's' : ''} remaining today`
                  : 'Daily limit reached. Sign up for unlimited access.'}
              </p>
            </div>

            <div className="lg:col-span-7">
              {/* Form */}
              <form onSubmit={handleScreen} className="rounded-lg border border-border bg-background p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="screen-first-name" className="mb-2 block text-sm font-medium text-foreground">
                      First Name <span className="text-teal-ink">*</span>
                    </label>
                    <input
                      id="screen-first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Vladimir"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="screen-last-name" className="mb-2 block text-sm font-medium text-foreground">
                      Last Name <span className="text-teal-ink">*</span>
                    </label>
                    <input
                      id="screen-last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Putin"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="screen-dob" className="mb-2 block text-sm font-medium text-foreground">Date of Birth</label>
                    <input
                      id="screen-dob"
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="YYYY-MM-DD"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="screen-nationality" className="mb-2 block text-sm font-medium text-foreground">Nationality</label>
                    <input
                      id="screen-nationality"
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      placeholder="e.g. RU, US, CA"
                      className={inputClass}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-medium text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[var(--ink-hover)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Screening...</>
                  ) : (
                    'Run Screening'
                  )}
                </button>
              </form>

              {/* Auth Prompt */}
              {showAuthPrompt && (
                <div className="mt-6 rounded-lg border border-border bg-surface-elevated p-6 sm:p-8">
                  <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em]">Sign in to run your screening</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">
                    Create a free account to screen against 1.2M+ entities. Your screening details have been saved.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Action href="/login?redirect=/screening">Sign In</Action>
                    <Action href="/register?redirect=/screening" variant="secondary">Create Free Account</Action>
                  </div>
                  <p className="mt-5 text-sm text-tertiary">{FREE_TRIAL.cta}</p>
                </div>
              )}

              {/* Upgrade Prompt */}
              {showUpgradePrompt && (
                <div className="mt-6 rounded-lg border border-border bg-surface-elevated p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    <h3 className="text-[1.0625rem] leading-snug tracking-[-0.015em]">
                      {upgradeReason === 'credits'
                        ? 'Screening credits required'
                        : 'Monthly screening limit reached'}
                    </h3>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">
                    {upgradeReason === 'credits'
                      ? 'Your account is out of screening credits. Add credits to continue — or create a free account to get started.'
                      : 'You’ve reached the screening limit. Upgrade to continue screening.'}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Action href={upgradeReason === 'credits' ? '/register?redirect=/screening' : '/#pricing'}>
                      {upgradeReason === 'credits' ? 'Create Free Account' : 'View Plans'}
                    </Action>
                    <Action href="/contact?plan=corporate" variant="secondary">Contact Sales</Action>
                  </div>
                  <p className="mt-5 text-sm text-tertiary">
                    {upgradeReason === 'credits'
                      ? `${FREE_TRIAL.cta} Or buy credits — ${formatUsd(PRODUCT_PRICES.screening.amount)} per screening.`
                      : `Buy credits to continue — ${formatUsd(PRODUCT_PRICES.screening.amount)} per screening.`}
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div role="alert" className="mt-6 flex items-start gap-3 rounded-lg border border-danger/30 px-4 py-3.5">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                  <p className="text-sm text-danger">{error}</p>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="mt-6 rounded-lg border border-border bg-background" aria-live="polite">
                  {/* Subject Information */}
                  <div className="border-b border-border px-6 py-5 sm:px-8">
                    <h3 className="text-sm font-medium text-foreground">Subject Information</h3>
                    <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                      {[
                        ['First Name', firstName.trim()],
                        ['Last Name', lastName.trim()],
                        ['Date of Birth', dob.trim() || '—'],
                        ['Nationality', nationality.trim() || '—'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <dt className="text-tertiary">{label}</dt>
                          <dd className="font-medium text-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Screening Result */}
                  <div className="flex items-start gap-3 border-b border-border px-6 py-5 sm:px-8">
                    {result.hasMatch ? (
                      <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                    ) : (
                      <CheckGlyph className="mt-1.5" />
                    )}
                    <div>
                      <h2 className={cx('text-xl leading-snug tracking-[-0.02em]', result.hasMatch ? 'text-danger' : 'text-teal-ink')}>
                        {result.hasMatch
                          ? `${result.totalMatches} Match${result.totalMatches > 1 ? 'es' : ''} Found`
                          : 'All Clear'}
                      </h2>
                      <p className="mt-1 text-sm text-muted">
                        Screened: {result.queriedName}
                      </p>
                    </div>
                  </div>

                  {result.hasMatch && result.matchedLists.map((list, i) => {
                    const badge = listTypeBadge[list.listType] || listTypeBadge.sanction;
                    return (
                      <div key={i} className="border-b border-border px-6 py-5 sm:px-8">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-sm font-medium text-foreground">{list.name}</span>
                          <Tag>{badge.label}</Tag>
                          {list.countryCode && (
                            <span className="font-mono text-xs text-tertiary">{list.countryCode}</span>
                          )}
                        </div>
                        <ul className="mt-3">
                          {list.entities.map((entity, j) => (
                            <li key={j} className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 text-sm">
                              <div className="min-w-0">
                                <span className="text-foreground">{entity.name}</span>
                                {entity.birthdate && (
                                  <span className="ml-2 font-mono text-xs text-tertiary">DOB: {entity.birthdate}</span>
                                )}
                              </div>
                              <div className="flex shrink-0 items-baseline gap-3">
                                <span className="text-xs text-tertiary">{entity.matchLevel}</span>
                                <span className={cx('font-mono text-xs tabular-nums', entity.score >= 0.9 ? 'font-medium text-danger' : 'text-foreground')}>
                                  {(entity.score * 100).toFixed(0)}%
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}

                  <p className="px-6 py-4 font-mono text-xs text-tertiary sm:px-8">
                    Screening ID: {result.screeningId} | Provider: {result.provider}
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
