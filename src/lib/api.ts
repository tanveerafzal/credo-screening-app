const API_BASE_URL = process.env.NEXT_PUBLIC_ID_VERIFY_BACKEND || 'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';

export interface ScreeningResult {
  screeningId: string;
  hasMatch: boolean;
  provider: string;
  queriedName: string;
  totalMatches: number;
  matchedLists: Array<{
    name: string;
    listType: 'pep' | 'sanction' | 'ofac';
    countryCode?: string;
    url?: string;
    entities: Array<{
      name: string;
      birthdate?: string;
      score: number;
      matchLevel: string;
    }>;
    matchTypes: string[];
  }>;
}

export async function runScreening(params: {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nationality?: string;
}, apiKey: string): Promise<ScreeningResult> {
  const res = await fetch(`${API_BASE_URL}/api/v1/screenings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || err.message || 'Screening failed');
  }

  return res.json();
}

export interface WatchlistSource {
  id: string;
  display_name: string;
  category: string;
  jurisdiction: string;
  is_active: boolean;
  entry_count: number;
}

export async function getWatchlists(): Promise<WatchlistSource[]> {
  const SCREENING_ENGINE_URL = process.env.NEXT_PUBLIC_SCREENING_ENGINE_URL || 'https://screening-engine-214036150009.us-central1.run.app';
  const res = await fetch(`${SCREENING_ENGINE_URL}/internal/lists`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}
