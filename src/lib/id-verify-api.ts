export const ID_VERIFY_TEST_API =
  'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';
export const ID_VERIFY_PROD_API =
  'https://id-verify-api-440170004655.northamerica-northeast2.run.app';
export const PARTNER_DASHBOARD_TEST = 'https://partner-test.trustcredo.com';
export const PARTNER_DASHBOARD_PROD = 'https://partner.trustcredo.com';

export function isTestApiUrl(url: string): boolean {
  return url.includes('-test-');
}

/** API used for register/login — must match partner portal VITE_API_BASE_URL. */
export function resolveRegistrationApiUrl(): string {
  if (process.env.ID_VERIFY_API_URL) return process.env.ID_VERIFY_API_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  return ID_VERIFY_TEST_API;
}

/** Server-side id-verify API base URL (Next.js API route proxy). */
export function getIdVerifyApiUrl(): string {
  return resolveRegistrationApiUrl();
}

/** Partner portal URL — must match the API that issued the JWT. */
export function getPartnerDashboardUrl(): string {
  if (process.env.NEXT_PUBLIC_PARTNER_DASHBOARD_URL) {
    return process.env.NEXT_PUBLIC_PARTNER_DASHBOARD_URL.replace(/\/$/, '');
  }

  return isTestApiUrl(resolveRegistrationApiUrl())
    ? PARTNER_DASHBOARD_TEST
    : PARTNER_DASHBOARD_PROD;
}
