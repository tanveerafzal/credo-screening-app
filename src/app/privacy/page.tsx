import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-white">
        <article className="max-w-3xl mx-auto px-4 prose prose-gray prose-sm">
          <h1>Privacy Policy</h1>
          <p className="text-gray-500">Last updated: April 15, 2026</p>

          <p>
            CredoScreening ("we", "us", "our") operates the credoscreening.com website and screening API service.
            This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>Account Information</h3>
          <p>When you register, we collect your name, email address, company name, and phone number (optional). This information is used to create your account and provide customer support.</p>

          <h3>Screening Data</h3>
          <p>When you perform a screening, we process the name, date of birth, nationality, and other identifiers you provide. This data is used solely to match against our watchlist databases and return results.</p>

          <h3>Usage Data</h3>
          <p>We automatically collect information about how you use our service, including IP addresses, browser type, pages visited, and API usage metrics.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide and maintain the screening service</li>
            <li>Process screening requests and return results</li>
            <li>Manage your account and API access</li>
            <li>Send transactional emails (account confirmation, screening alerts)</li>
            <li>Improve our service and develop new features</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Data Retention</h2>
          <p>
            Screening request records are retained for 7 years to comply with AML/KYC regulatory requirements.
            Account information is retained for as long as your account is active. You may request account deletion
            by contacting us at <a href="mailto:support@credoscreening.com">support@credoscreening.com</a>.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul>
            <li>All data transmitted over HTTPS/TLS encryption</li>
            <li>API keys and secrets stored securely with bcrypt hashing</li>
            <li>Webhook payloads signed with HMAC-SHA256</li>
            <li>Database encryption at rest</li>
            <li>Access controls and audit logging</li>
          </ul>

          <h2>5. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul>
            <li><strong>Service providers:</strong> Cloud hosting (Google Cloud Platform), email delivery (Resend), database (Neon)</li>
            <li><strong>Legal requirements:</strong> When required by law, regulation, or legal process</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
          </ul>

          <h2>6. Watchlist Data Sources</h2>
          <p>
            The screening data we match against is sourced from publicly available government and international
            organization databases, including OFAC, EU, UN, UK, and other sanctions lists. We aggregate data from
            OpenSanctions and other public sources. We do not create or maintain our own watchlists.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise these rights, contact <a href="mailto:support@credoscreening.com">support@credoscreening.com</a>.</p>

          <h2>8. Cookies</h2>
          <p>
            We use essential cookies for authentication and session management. We use localStorage to track
            free-tier screening usage (daily limit). We do not use third-party tracking cookies.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our service is not directed at individuals under 18. We do not knowingly collect personal information
            from children.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant changes by email
            or by posting a notice on our website.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:<br />
            <strong>Email:</strong> <a href="mailto:support@credoscreening.com">support@credoscreening.com</a><br />
            <strong>Address:</strong> Toronto, Ontario, Canada
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
