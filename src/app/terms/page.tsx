import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-white">
        <article className="max-w-3xl mx-auto px-4 prose prose-gray prose-sm">
          <h1>Terms of Service</h1>
          <p className="text-gray-500">Last updated: April 15, 2026</p>

          <p>
            These Terms of Service ("Terms") govern your use of the CredoScreening website and API service
            operated by CredoScreening ("we", "us", "our"). By using our service, you agree to these Terms.
          </p>

          <h2>1. Service Description</h2>
          <p>
            CredoScreening provides a background screening service that checks names against global sanctions lists,
            PEP databases, criminal watchlists, and regulatory debarment lists. Results are provided for informational
            and compliance purposes.
          </p>

          <h2>2. Account Registration</h2>
          <ul>
            <li>You must provide accurate and complete registration information</li>
            <li>You are responsible for maintaining the security of your API keys and credentials</li>
            <li>You must notify us immediately of any unauthorized access to your account</li>
            <li>One account per person or organization unless expressly approved</li>
          </ul>

          <h2>3. Acceptable Use</h2>
          <p>You agree to use CredoScreening only for lawful purposes, including:</p>
          <ul>
            <li>AML/KYC compliance screening</li>
            <li>Customer due diligence</li>
            <li>Employee background checks (where legally permitted)</li>
            <li>Third-party risk management</li>
          </ul>
          <p>You may <strong>not</strong> use the service to:</p>
          <ul>
            <li>Discriminate against individuals based on race, religion, gender, or other protected characteristics</li>
            <li>Stalk, harass, or intimidate any person</li>
            <li>Resell screening data without authorization</li>
            <li>Circumvent rate limits or access controls</li>
            <li>Reverse-engineer our matching algorithms or databases</li>
            <li>Bulk-download or scrape watchlist data</li>
          </ul>

          <h2>4. Pricing & Billing</h2>
          <ul>
            <li><strong>Free Tier:</strong> 10 screenings per month, no credit card required</li>
            <li><strong>Paid Plans:</strong> Billed monthly. Unused screenings do not roll over</li>
            <li>Prices are subject to change with 30 days notice</li>
            <li>You may cancel at any time; no refunds for partial months</li>
          </ul>

          <h2>5. API Usage</h2>
          <ul>
            <li>API keys are confidential and must not be shared publicly</li>
            <li>Rate limits apply: 5,000 requests per 15-minute window</li>
            <li>We reserve the right to throttle or suspend accounts that abuse the API</li>
            <li>API responses must not be cached for longer than 24 hours</li>
          </ul>

          <h2>6. Data Accuracy Disclaimer</h2>
          <p>
            <strong>Screening results are provided "as is" for informational purposes.</strong> While we strive for
            accuracy, we do not guarantee that screening data is complete, current, or error-free. Our data is
            sourced from publicly available government and international databases.
          </p>
          <p>
            You are responsible for making your own compliance decisions based on screening results.
            A "no match" result does not guarantee that a person is not on any watchlist — it means no match
            was found in the databases we screen against at the time of the search.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, CredoScreening shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including loss of profits, data, or business opportunities,
            arising from your use of the service.
          </p>
          <p>
            Our total liability for any claim arising from these Terms shall not exceed the amount you paid us
            in the 12 months preceding the claim.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless CredoScreening and its officers, directors, employees, and
            agents from any claims, damages, or expenses arising from your use of the service or violation of
            these Terms.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            The CredoScreening name, logo, website design, API, and matching algorithms are our intellectual property.
            Screening results may be used in your compliance workflows but may not be redistributed as a standalone
            data product.
          </p>

          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your account at any time for violation of these Terms, with or without notice.
            You may delete your account at any time by contacting support. Upon termination, your API keys are
            immediately revoked.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Province of Ontario, Canada. Any disputes shall be resolved
            in the courts of Toronto, Ontario.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will be communicated via email or
            a notice on the website at least 30 days before they take effect.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these Terms? Contact us at:<br />
            <strong>Email:</strong> <a href="mailto:support@credoscreening.com">support@credoscreening.com</a><br />
            <strong>Address:</strong> Toronto, Ontario, Canada
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
