/**
 * Canonical brand, legal entity, and public URLs for credoscreening.com.
 */
export const BRAND = {
  /** Public marketing / SEO brand */
  name: 'Credo Screening',
  shortName: 'Credo Screening',
  tagline: 'Your trusted AML and sanctions screening partner.',
  description:
    'Screen individuals and businesses against 1.2M+ entities from OFAC, global sanctions, PEP databases, and 80+ watchlists.',
  website: 'https://credoscreening.com',
  supportEmail: 'support@credoscreening.com',
  salesEmail: 'sales@credoscreening.com',
  apiUrl: 'https://api.credoscreening.com',

  /** Ontario incorporation */
  legalEntity: 'NUMBER COMPANY 2002846 ONTARIO INC.',
  /** Registered business name (Ontario) */
  registeredName: 'Trust Credo',

  /** Product infrastructure — keep on trustcredo.com subdomains */
  partnerPortal: 'https://partner.trustcredo.com',
  sdkUrl: 'https://sdk.trustcredo.com',
  verifyUrl: 'https://verify.trustcredo.com',
} as const;

export function copyrightLine(year = new Date().getFullYear()): string {
  return `© ${year} ${BRAND.legalEntity} · Operating as ${BRAND.registeredName}`;
}

export function legalOperatorLine(): string {
  return `${BRAND.name} is operated by ${BRAND.legalEntity}, carrying on business under the registered name ${BRAND.registeredName}.`;
}
