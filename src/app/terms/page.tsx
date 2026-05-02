import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Terms of Service</h1>
          <p className="mt-3 text-gray-500">Last updated: April 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="legal-document space-y-8 text-gray-700 text-[15px] leading-relaxed">

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Credo's background screening services ("Services"), you agree to be bound
                by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use
                the Services.
              </p>
              <p className="mt-3">
                These Terms apply to all users of the Services, including registered account holders, API consumers,
                and visitors using the free screening tool.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Services</h2>
              <p>Credo provides background screening services that include:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Watchlist screening against OFAC, sanctions, PEP, and 80+ global databases</li>
                <li>Fuzzy name matching with composite confidence scoring</li>
                <li>Real-time screening results via API and web interface</li>
                <li>Webhook-based asynchronous result delivery</li>
                <li>Screening history and reporting dashboard</li>
                <li>API access for integration with third-party applications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account Registration</h2>
              <p>To use our Services, you must register for an account. You agree to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your API keys and account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share API keys publicly or commit them to version control</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use</h2>
              <p>You agree to use the Services only for lawful compliance purposes, including:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>AML/KYC compliance screening</li>
                <li>Customer due diligence and onboarding</li>
                <li>Employee background checks (where legally permitted)</li>
                <li>Third-party risk management and vendor screening</li>
              </ul>
              <p className="mt-4">You may <strong>not</strong> use the Services to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Discriminate against individuals based on race, religion, gender, or other protected characteristics</li>
                <li>Stalk, harass, or intimidate any person</li>
                <li>Resell or redistribute screening data without authorization</li>
                <li>Circumvent rate limits, quotas, or access controls</li>
                <li>Reverse-engineer our matching algorithms or databases</li>
                <li>Bulk-download, scrape, or systematically extract watchlist data</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Processing</h2>
              <p>By using our Services, you acknowledge that:</p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>We will process personal data as described in our <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link></li>
                <li>Screening data is matched against publicly available government and international watchlists</li>
                <li>You have obtained necessary consents from individuals being screened</li>
                <li>You will comply with all applicable data protection laws (GDPR, CCPA, PIPEDA, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Fees and Payment</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong>First Month Free:</strong> New accounts on the Starter and Professional plans receive up to 10 ID verifications and 10 background screenings at no cost during the first calendar month after registration. Unused free checks do not roll over. Standard per-use rates apply after the first month or once the free allocation is exhausted</li>
                <li><strong>Paid Plans:</strong> Billed monthly according to your selected pricing plan</li>
                <li>Unused screenings do not roll over to the next billing period</li>
                <li>You agree to provide accurate billing information and authorize charges</li>
                <li>Prices are subject to change with 30 days written notice</li>
                <li>You may cancel at any time; no refunds for partial billing periods</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. API Usage</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>API keys are confidential and must not be shared publicly or embedded in client-side code</li>
                <li>Rate limits apply: 5,000 requests per 15-minute window per API key</li>
                <li>We reserve the right to throttle or suspend accounts that abuse the API</li>
                <li>API responses must not be cached for longer than 24 hours</li>
                <li>You must handle webhook signatures to verify payload authenticity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data Accuracy Disclaimer</h2>
              <p>
                <strong>Screening results are provided "as is" for informational purposes only.</strong> While we strive
                to maintain accurate and current data, we do not guarantee that screening results are complete,
                error-free, or up-to-date at all times.
              </p>
              <p className="mt-3">
                Our data is sourced from publicly available government and international organization databases,
                including data aggregated by OpenSanctions. You are solely responsible for making compliance
                decisions based on screening results. A "no match" result means no match was found in our databases
                at the time of the search — it does not guarantee the person is not on any watchlist globally.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Intellectual Property</h2>
              <p>
                The Services, including the Credo name, logo, website design, API, and matching algorithms,
                are owned by Credo and are protected by copyright, trademark, and other intellectual
                property laws. You may not copy, modify, distribute, or create derivative works without our
                express written permission.
              </p>
              <p className="mt-3">
                Screening results may be used in your compliance workflows but may not be redistributed as a
                standalone data product.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Disclaimer of Warranties</h2>
              <p className="uppercase text-sm">
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE
                UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">11. Limitation of Liability</h2>
              <p className="uppercase text-sm">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREDOSCREENING SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA,
                OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
              <p className="mt-3">
                Our total liability for any claim arising from these Terms shall not exceed the amount you paid us
                in the 12 months preceding the claim.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Credo and its officers, directors, employees, and
                agents from any claims, damages, losses, or expenses (including reasonable attorneys' fees) arising
                out of your use of the Services, violation of these Terms, or infringement of any rights of a
                third party.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">13. Termination</h2>
              <p>
                We may terminate or suspend your access to the Services at any time for violation of these Terms,
                with or without notice. You may delete your account at any time by contacting support.
                Upon termination, your API keys are immediately revoked and your right to use the Services
                will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated
                via email or a notice on our website at least 30 days before they take effect. Your continued
                use of the Services after such changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">15. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Province of
                Ontario, Canada, without regard to its conflict of law provisions. Any disputes arising from
                these Terms shall be resolved in the courts of Toronto, Ontario.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">16. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-3">
                <strong>Email:</strong> <a href="mailto:support@credoscreening.com" className="text-indigo-600 hover:underline">support@credoscreening.com</a><br />
                <strong>Website:</strong> <a href="https://credoscreening.com" className="text-indigo-600 hover:underline">credoscreening.com</a><br />
                <strong>Address:</strong> Toronto, Ontario, Canada
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
