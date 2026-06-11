const WORKING_API =
  'https://id-verify-api-test-214036150009.northamerica-northeast2.run.app';
// Cloud Run returns 403 (no public invoker) — browser shows as CORS failure.
const BLOCKED_PROD_API =
  'https://id-verify-api-214036150009.northamerica-northeast2.run.app';

/** Server-side id-verify API base URL (used by Next.js API routes). */
export function getIdVerifyApiUrl(): string {
  if (process.env.ID_VERIFY_API_URL) return process.env.ID_VERIFY_API_URL;

  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicUrl && publicUrl !== BLOCKED_PROD_API) return publicUrl;

  return WORKING_API;
}
