// Browser calls same-origin API routes to avoid CORS against id-verify-api Cloud Run.
const API_URL = '/api';

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

export interface PendingSignupResponse {
  pendingApproval: true;
  message: string;
  partner: {
    id: string;
    email: string;
    companyName: string;
    contactName: string;
  };
}

export type RegisterResponse = PendingSignupResponse | AuthResponse;

export function isPendingSignup(data: RegisterResponse): data is PendingSignupResponse {
  return 'pendingApproval' in data && data.pendingApproval === true;
}

export interface SignupApproval {
  partnerId: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  products: { idVerification?: boolean; watchlistScreening?: boolean; creditReport?: boolean };
  creditBalance: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export async function register(data: {
  email: string;
  password: string;
  companyName: string;
  contactName: string;
  restrictedIndustryWarrantyAccepted: boolean;
}): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}/partners/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Registration failed');
  return json.data || json;
}

export async function getSignupApproval(token: string): Promise<SignupApproval> {
  const res = await fetch(`${API_URL}/partners/signup-approval?token=${encodeURIComponent(token)}`);
  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to load approval');
  return json.data || json;
}

export async function reviewSignupApproval(
  token: string,
  action: 'approve' | 'reject'
): Promise<{ status: string; companyName: string; email: string }> {
  const res = await fetch(`${API_URL}/partners/signup-approval`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, action }),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to review signup');
  return json.data || json;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/partners/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Login failed');
  return json.data || json;
}

export async function getProfile(token: string) {
  const res = await fetch(`${API_URL}/partners/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to load profile');
  return json.data || json;
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/partners/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to send reset email');
  return json;
}

export async function resetPassword(token: string, password: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/partners/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  const json = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
  if (!res.ok) throw new Error(json.error || json.message || 'Failed to reset password');
  return json;
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
