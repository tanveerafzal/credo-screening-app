const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';

export interface AuthResponse {
  token: string;
  partner: {
    id: string;
    companyName: string;
    contactEmail: string;
    apiKey: string;
    apiSecret: string;
  };
}

export async function register(data: {
  email: string;
  password: string;
  companyName: string;
  contactName: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/v1/partners/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Registration failed');
  return json.data || json;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/v1/partners/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Login failed');
  return json.data || json;
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/api/v1/partners/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to load profile');
  return json.data || json;
}

export function saveAuth(token: string, partner: AuthResponse['partner']) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cs_token', token);
  localStorage.setItem('cs_partner', JSON.stringify(partner));
}

export function getAuth(): { token: string; partner: AuthResponse['partner'] } | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('cs_token');
  const partner = localStorage.getItem('cs_partner');
  if (!token || !partner) return null;
  try {
    return { token, partner: JSON.parse(partner) };
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cs_token');
  localStorage.removeItem('cs_partner');
}
