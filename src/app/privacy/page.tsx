import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Container, Section } from '@/components/site/Canvas';
import { Breadcrumb } from '@/components/marketing/Breadcrumb';
import { BRAND, legalOperatorLine } from '@/lib/brand';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${BRAND.name} collects, uses, and protects data for AML screening and identity verification services.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="px-0 md:px-12">
        <Container>
          <div className="px-6 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
            <Breadcrumb items={[{ label: 'Privacy' }]} />
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Privacy Policy</h1>
            <p className="mt-6 font-mono text-xs text-tertiary">Last updated: April 2026</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section innerClassName="px-6 md:px-8">
          <div className="legal-document max-w-2xl space-y-14 text-base leading-[1.75] text-muted">

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">1. Introduction</h2>
              <p>
                {legalOperatorLine()}{' '}This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you use our background screening and related compliance services (the &quot;Service&quot;).
              </p>
              <p className="mt-3">
                This Privacy Policy is divided into two parts. The first applies to individuals whose names are
                submitted for screening by our business customers (&quot;Customers&quot;). The second applies to our
                Customers and visitors to our website.
              </p>
              <p className="mt-3">
                Please read this Privacy Policy carefully. By using our Services, you consent to the data practices
                described in this policy.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">2. Privacy Policy for Individuals Being Screened</h2>
              <p>
                Our Customers use Credo to screen individuals against watchlists as part of their
                compliance obligations (AML, KYC, sanctions screening). When a screening is performed:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li><strong className="font-medium text-foreground">Data collected:</strong> Name, date of birth, nationality, and optionally address and identification numbers, as provided by the Customer</li>
                <li><strong className="font-medium text-foreground">How it&apos;s used:</strong> Matched against publicly available government and international watchlist databases to determine if a match exists</li>
                <li><strong className="font-medium text-foreground">Data retention:</strong> Screening records are retained for 7 years to comply with AML/KYC regulatory requirements</li>
                <li><strong className="font-medium text-foreground">Data sharing:</strong> Screening results are returned to the Customer who initiated the request. We do not share your data with any other third party</li>
              </ul>
              <p className="mt-3">
                Credo acts as a data processor on behalf of our Customers. The Customer is the data
                controller and is responsible for ensuring they have a lawful basis to submit your information
                for screening.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">3. Privacy Policy for Customers and Website Visitors</h2>

              <h3 className="mb-2 mt-6 text-[1.0625rem] leading-snug tracking-[-0.015em]">Information We Collect</h3>

              <p><strong className="font-medium text-foreground">Account Information:</strong> When you register, we collect your name, email address,
              company name, and phone number (optional). This information is used to create your account,
              provide customer support, and communicate service updates.</p>

              <p className="mt-3"><strong className="font-medium text-foreground">Screening Data:</strong> When you perform a screening, we process the names
              and identifiers you submit. This data is used solely to match against our watchlist databases and
              return results to you.</p>

              <p className="mt-3"><strong className="font-medium text-foreground">Usage Data:</strong> We automatically collect information about how you use
              our service, including IP addresses, browser type, pages visited, API usage metrics, and
              screening volumes.</p>

              <p className="mt-3"><strong className="font-medium text-foreground">Payment Information:</strong> If you subscribe to a paid plan, payment
              information is processed by our third-party payment processor. We do not store credit card
              numbers on our servers.</p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">4. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>Provide and maintain the screening service</li>
                <li>Process screening requests and return results</li>
                <li>Manage your account and API access</li>
                <li>Send transactional emails (account confirmation, screening alerts, usage notifications)</li>
                <li>Enforce rate limits and usage quotas</li>
                <li>Improve our matching algorithms and service quality</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">5. Data Retention</h2>
              <ul className="space-y-2 list-disc pl-5 marker:text-tertiary">
                <li><strong className="font-medium text-foreground">Screening records:</strong> Retained for 7 years (AML/KYC regulatory compliance)</li>
                <li><strong className="font-medium text-foreground">Account information:</strong> Retained for as long as your account is active</li>
                <li><strong className="font-medium text-foreground">Webhook delivery logs:</strong> Retained for 90 days</li>
                <li><strong className="font-medium text-foreground">Usage logs:</strong> Retained for 12 months</li>
              </ul>
              <p className="mt-3">
                You may request account deletion by contacting us at{' '}
                <a href="mailto:support@credoscreening.com" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">support@credoscreening.com</a>.
                Note that screening records may be retained as required by law even after account deletion.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">6. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>All data transmitted over HTTPS/TLS encryption</li>
                <li>API keys stored with cryptographic hashing</li>
                <li>Webhook payloads signed with HMAC-SHA256 for authenticity verification</li>
                <li>Database encryption at rest on Google Cloud Platform</li>
                <li>Access controls, audit logging, and principle of least privilege</li>
                <li>Regular security assessments and monitoring</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">7. Data Sharing</h2>
              <p>We do not sell your personal information. We may share data with:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li><strong className="font-medium text-foreground">Service providers:</strong> Google Cloud Platform (hosting), Neon (database), Resend (email delivery), Vercel (website hosting)</li>
                <li><strong className="font-medium text-foreground">Legal requirements:</strong> When required by law, regulation, subpoena, or legal process</li>
                <li><strong className="font-medium text-foreground">Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">8. Watchlist Data Sources</h2>
              <p>
                The screening data we match against is sourced from publicly available government and international
                organization databases. Our primary data source is{' '}
                <a href="https://opensanctions.org" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70" target="_blank" rel="noopener noreferrer">OpenSanctions</a>,
                which aggregates data from OFAC, EU, UN, UK, and 80+ other official sources.
              </p>
              <p className="mt-3">
                We do not create or maintain proprietary watchlists. All screening data originates from
                official government publications and is updated automatically on a regular schedule.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">9. Your Rights</h2>
              <p>Depending on your jurisdiction (GDPR, CCPA, PIPEDA), you may have the right to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li><strong className="font-medium text-foreground">Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="font-medium text-foreground">Correction:</strong> Request correction of inaccurate data</li>
                <li><strong className="font-medium text-foreground">Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
                <li><strong className="font-medium text-foreground">Objection:</strong> Object to or restrict certain types of processing</li>
                <li><strong className="font-medium text-foreground">Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong className="font-medium text-foreground">Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact{' '}
                <a href="mailto:support@credoscreening.com" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">support@credoscreening.com</a>.
                We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">10. Cookies and Local Storage</h2>
              <p>
                We use essential cookies for authentication and session management. We use browser localStorage
                to track free-tier screening usage (daily limit counter) and authentication state.
                We do not use third-party advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">11. Children&apos;s Privacy</h2>
              <p>
                Our Service is intended for business use and is not directed at individuals under 18 years of age.
                We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">12. International Data Transfers</h2>
              <p>
                Our services are hosted on Google Cloud Platform in North America. If you access the Service
                from outside North America, your data may be transferred to and processed in Canada or the
                United States. We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated via
                email or by posting a notice on our website at least 30 days before they take effect.
                Your continued use of the Service after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">14. Contact Information</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-3">
                <strong className="font-medium text-foreground">Email:</strong> <a href="mailto:support@credoscreening.com" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">support@credoscreening.com</a><br />
                <strong className="font-medium text-foreground">Website:</strong> <a href="https://credoscreening.com" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">credoscreening.com</a><br />
                <strong className="font-medium text-foreground">Address:</strong> Toronto, Ontario, Canada
              </p>
              <p className="mt-3">
                <strong className="font-medium text-foreground">Legal entity:</strong> {BRAND.legalEntity}<br />
                <strong className="font-medium text-foreground">Registered business name:</strong> {BRAND.registeredName}
              </p>
            </div>

          </div>
      </Section>

      <Footer />
    </>
  );
}
