import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-gray-500">Last updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="legal-document space-y-8 text-gray-700 text-[15px] leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Credo ("we," "us," or "our") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                you use our background screening services (the "Service").
              </p>
              <p className="mt-3">
                This Privacy Policy is divided into two parts. The first applies to individuals whose names are
                submitted for screening by our business customers ("Customers"). The second applies to our
                Customers and visitors to our website.
              </p>
              <p className="mt-3">
                Please read this Privacy Policy carefully. By using our Services, you consent to the data practices
                described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Privacy Policy for Individuals Being Screened</h2>
              <p>
                Our Customers use Credo to screen individuals against watchlists as part of their
                compliance obligations (AML, KYC, sanctions screening). When a screening is performed:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li><strong>Data collected:</strong> Name, date of birth, nationality, and optionally address and identification numbers, as provided by the Customer</li>
                <li><strong>How it's used:</strong> Matched against publicly available government and international watchlist databases to determine if a match exists</li>
                <li><strong>Data retention:</strong> Screening records are retained for 7 years to comply with AML/KYC regulatory requirements</li>
                <li><strong>Data sharing:</strong> Screening results are returned to the Customer who initiated the request. We do not share your data with any other third party</li>
              </ul>
              <p className="mt-3">
                Credo acts as a data processor on behalf of our Customers. The Customer is the data
                controller and is responsible for ensuring they have a lawful basis to submit your information
                for screening.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Privacy Policy for Customers and Website Visitors</h2>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Information We Collect</h3>

              <p><strong>Account Information:</strong> When you register, we collect your name, email address,
              company name, and phone number (optional). This information is used to create your account,
              provide customer support, and communicate service updates.</p>

              <p className="mt-3"><strong>Screening Data:</strong> When you perform a screening, we process the names
              and identifiers you submit. This data is used solely to match against our watchlist databases and
              return results to you.</p>

              <p className="mt-3"><strong>Usage Data:</strong> We automatically collect information about how you use
              our service, including IP addresses, browser type, pages visited, API usage metrics, and
              screening volumes.</p>

              <p className="mt-3"><strong>Payment Information:</strong> If you subscribe to a paid plan, payment
              information is processed by our third-party payment processor. We do not store credit card
              numbers on our servers.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc pl-6">
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
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>Screening records:</strong> Retained for 7 years (AML/KYC regulatory compliance)</li>
                <li><strong>Account information:</strong> Retained for as long as your account is active</li>
                <li><strong>Webhook delivery logs:</strong> Retained for 90 days</li>
                <li><strong>Usage logs:</strong> Retained for 12 months</li>
              </ul>
              <p className="mt-3">
                You may request account deletion by contacting us at{' '}
                <a href="mailto:support@credoscreening.com" className="text-indigo-600 hover:underline">support@credoscreening.com</a>.
                Note that screening records may be retained as required by law even after account deletion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>All data transmitted over HTTPS/TLS encryption</li>
                <li>API keys stored with cryptographic hashing</li>
                <li>Webhook payloads signed with HMAC-SHA256 for authenticity verification</li>
                <li>Database encryption at rest on Google Cloud Platform</li>
                <li>Access controls, audit logging, and principle of least privilege</li>
                <li>Regular security assessments and monitoring</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Data Sharing</h2>
              <p>We do not sell your personal information. We may share data with:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li><strong>Service providers:</strong> Google Cloud Platform (hosting), Neon (database), Resend (email delivery), Vercel (website hosting)</li>
                <li><strong>Legal requirements:</strong> When required by law, regulation, subpoena, or legal process</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Watchlist Data Sources</h2>
              <p>
                The screening data we match against is sourced from publicly available government and international
                organization databases. Our primary data source is{' '}
                <a href="https://opensanctions.org" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenSanctions</a>,
                which aggregates data from OFAC, EU, UN, UK, and 80+ other official sources.
              </p>
              <p className="mt-3">
                We do not create or maintain proprietary watchlists. All screening data originates from
                official government publications and is updated automatically on a regular schedule.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Your Rights</h2>
              <p>Depending on your jurisdiction (GDPR, CCPA, PIPEDA), you may have the right to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
                <li><strong>Objection:</strong> Object to or restrict certain types of processing</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Withdraw consent:</strong> Where processing is based on consent, withdraw it at any time</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, contact{' '}
                <a href="mailto:support@credoscreening.com" className="text-indigo-600 hover:underline">support@credoscreening.com</a>.
                We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Cookies and Local Storage</h2>
              <p>
                We use essential cookies for authentication and session management. We use browser localStorage
                to track free-tier screening usage (daily limit counter) and authentication state.
                We do not use third-party advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">11. Children's Privacy</h2>
              <p>
                Our Service is intended for business use and is not directed at individuals under 18 years of age.
                We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">12. International Data Transfers</h2>
              <p>
                Our services are hosted on Google Cloud Platform in North America. If you access the Service
                from outside North America, your data may be transferred to and processed in Canada or the
                United States. We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">13. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be communicated via
                email or by posting a notice on our website at least 30 days before they take effect.
                Your continued use of the Service after changes constitutes acceptance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">14. Contact Information</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-3">
                <strong>Email:</strong> <a href="mailto:support@credoscreening.com" className="text-indigo-600 hover:underline">support@credoscreening.com</a><br />
                <strong>Website:</strong> <a href="https://credoscreening.com" className="text-indigo-600 hover:underline">credoscreening.com</a><br />
                <strong>Address:</strong> Toronto, Ontario, Canada
              </p>
              <p className="mt-3">
                Credo is a sister company of{' '}
                <a href="https://trustcredo.com" className="text-indigo-600 hover:underline">TrustCredo</a> (Identity Verification).
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
