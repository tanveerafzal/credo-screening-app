import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Container, Section } from '@/components/site/Canvas';
import { BRAND, legalOperatorLine } from '@/lib/brand';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description: `Terms of service for ${BRAND.name} AML screening, identity verification, and related compliance services.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="px-0 md:px-12">
        <Container>
          <div className="px-6 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
            <p className="mb-6 text-sm text-tertiary">
              <Link href="/" className="hover:text-foreground">Credo</Link>
              <span className="mx-2 text-border-hover">/</span>
              <span className="text-muted">Legal</span>
            </p>
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Terms of Service</h1>
            <p className="mt-6 font-mono text-xs text-tertiary">Last updated: October 2026</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section innerClassName="px-6 md:px-8">
          <div className="legal-document max-w-2xl space-y-14 text-base leading-[1.75] text-muted">

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">1. Acceptance of Terms</h2>
              <p>
                By accessing or using {BRAND.name} and related services operated by {BRAND.legalEntity}{' '}
                (carrying on business as {BRAND.registeredName}) (&quot;Services&quot;), you agree to be bound
                by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use
                the Services.
              </p>
              <p className="mt-3">
                These Terms apply to all users of the Services, including registered account holders, API consumers,
                and visitors using the free screening tool.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">2. Description of Services</h2>
              <p>{BRAND.name} provides background screening and compliance services that include:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>Watchlist screening against OFAC, sanctions, PEP, and 80+ global databases</li>
                <li>Fuzzy name matching with composite confidence scoring</li>
                <li>Real-time screening results via API and web interface</li>
                <li>Webhook-based asynchronous result delivery</li>
                <li>Screening history and reporting dashboard</li>
                <li>API access for integration with third-party applications</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">3. Account Registration</h2>
              <p>To use our Services, you must register for an account. You agree to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your API keys and account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Not share API keys publicly or commit them to version control</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">4. Acceptable Use</h2>
              <p>You agree to use the Services only for lawful compliance purposes, including:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>AML/KYC compliance screening</li>
                <li>Customer due diligence and onboarding</li>
                <li>Employee background checks (where legally permitted)</li>
                <li>Third-party risk management and vendor screening</li>
              </ul>
              <p className="mt-4">You may <strong className="font-medium text-foreground">not</strong> use the Services to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>Discriminate against individuals based on race, religion, gender, or other protected characteristics</li>
                <li>Stalk, harass, or intimidate any person</li>
                <li>Support or operate adult entertainment, gambling or betting, or alcohol sales or distribution businesses</li>
                <li>Resell or redistribute screening data without authorization</li>
                <li>Circumvent rate limits, quotas, or access controls</li>
                <li>Reverse-engineer our matching algorithms or databases</li>
                <li>Bulk-download, scrape, or systematically extract watchlist data</li>
                <li>Use the Services for any illegal or unauthorized purpose</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">5. Data Processing</h2>
              <p>By using our Services, you acknowledge that:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>We will process personal data as described in our <Link href="/privacy" className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">Privacy Policy</Link></li>
                <li>Screening data is matched against publicly available government and international watchlists</li>
                <li>You have obtained necessary consents from individuals being screened</li>
                <li>You will comply with all applicable data protection laws (GDPR, CCPA, PIPEDA, etc.)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">6. Fees and Payment</h2>
              <ul className="space-y-2 list-disc pl-5 marker:text-tertiary">
                <li><strong className="font-medium text-foreground">First Month Free:</strong> New accounts receive 10 free credits during the first calendar month after registration. Each credit covers one ID verification or one Trusted Signatures envelope, or ten background screenings (so 10 credits cover up to 100 screenings). Unused credits do not roll over. Standard per-use rates apply after the first month or once the free allocation is exhausted.</li>
                <li><strong className="font-medium text-foreground">Pay Per Use:</strong> After the free period, you purchase credits and pay per check according to our published rates</li>
                <li>Unused credits do not roll over to the next billing period</li>
                <li>You agree to provide accurate billing information and authorize charges</li>
                <li>Prices are subject to change with 30 days written notice</li>
                <li>You may cancel at any time; no refunds for partial billing periods</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">7. API Usage</h2>
              <ul className="space-y-2 list-disc pl-5 marker:text-tertiary">
                <li>API keys are confidential and must not be shared publicly or embedded in client-side code</li>
                <li>Rate limits apply: 5,000 requests per 15-minute window per API key</li>
                <li>We reserve the right to throttle or suspend accounts that abuse the API</li>
                <li>API responses must not be cached for longer than 24 hours</li>
                <li>You must handle webhook signatures to verify payload authenticity</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">8. Data Accuracy Disclaimer</h2>
              <p>
                <strong className="font-medium text-foreground">Screening results are provided &quot;as is&quot; for informational purposes only.</strong> While we strive
                to maintain accurate and current data, we do not guarantee that screening results are complete,
                error-free, or up-to-date at all times.
              </p>
              <p className="mt-3">
                Our data is sourced from publicly available government and international organization databases,
                including data aggregated by OpenSanctions. You are solely responsible for making compliance
                decisions based on screening results. A &quot;no match&quot; result means no match was found in our databases
                at the time of the search — it does not guarantee the person is not on any watchlist globally.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">9. Intellectual Property</h2>
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
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">10. Disclaimer of Warranties</h2>
              <p className="text-sm uppercase leading-[1.75]">
                THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICES WILL BE
                UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">11. Limitation of Liability</h2>
              <p className="text-sm uppercase leading-[1.75]">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREDOSCREENING SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA,
                OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
              <p className="mt-3">
                Our total liability for any claim arising from these Terms shall not exceed the amount you paid us
                in the 12 months preceding the claim.
              </p>
              <p className="mt-3">
                Without limiting the foregoing, Credo Screening shall not be liable for any claims arising from
                your use of the Services in connection with adult entertainment, gambling or betting, or alcohol
                sales or distribution.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Credo and its officers, directors, employees, and
                agents from any claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising
                out of your use of the Services, violation of these Terms, or infringement of any rights of a
                third party. This includes defending and paying Credo Screening for claims arising because you used
                the Services for adult entertainment, gambling or betting, or alcohol sales or distribution in
                violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">13. Termination</h2>
              <p>
                We may terminate or suspend your access to the Services at any time for violation of these Terms,
                with or without notice. You may delete your account at any time by contacting support.
                Upon termination, your API keys are immediately revoked and your right to use the Services
                will immediately cease.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated
                via email or a notice on our website at least 30 days before they take effect. Your continued
                use of the Services after such changes constitutes acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">15. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Province of
                Ontario, Canada, without regard to its conflict of law provisions. Any disputes arising from
                these Terms shall be resolved in the courts of Toronto, Ontario.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-xl leading-snug sm:text-2xl">16. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mt-3">
                <strong className="font-medium text-foreground">Email:</strong> <a href={`mailto:${BRAND.supportEmail}`} className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">{BRAND.supportEmail}</a><br />
                <strong className="font-medium text-foreground">Website:</strong> <a href={BRAND.website} className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-foreground/70">credoscreening.com</a><br />
                <strong className="font-medium text-foreground">Legal entity:</strong> {BRAND.legalEntity}<br />
                <strong className="font-medium text-foreground">Registered business name:</strong> {BRAND.registeredName}<br />
                <strong className="font-medium text-foreground">Address:</strong> Toronto, Ontario, Canada
              </p>
            </div>

          </div>
      </Section>

      <Footer />
    </>
  );
}
