import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Container, Section } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';
import { SUPPORTED_COUNTRIES } from '@/lib/supported-documents';

export const metadata: Metadata = pageMetadata({
  title: 'Supported Documents',
  description:
    'Identity documents Credo accepts, listed by country. Canada and the United States include local cards. Other countries are verified with a passport.',
  path: '/supported-documents',
  keywords: [
    'supported ID documents',
    'Canadian driver licence verification',
    'US driver license verification',
    'passport verification',
  ],
});

export default function SupportedDocumentsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-0 md:px-12">
          <div className="absolute inset-0 opacity-70" aria-hidden="true">
            <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
          </div>
          <Container className="relative">
            <div className="max-w-2xl px-6 pb-16 pt-32 md:px-8 md:pb-24 md:pt-44">
              <p className="mb-6 text-sm text-tertiary">
                <Link href="/" className="hover:text-foreground">Credo</Link>
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-muted">Resources</span>
                <span className="mx-2 text-border-hover">/</span>
                <span className="text-muted">Supported documents</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Supported documents</h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                The ID types a person can scan, starting with Canada, then the United States, then everywhere else.
                Canada and the United States include local cards. Other countries use a passport.
              </p>
            </div>
          </Container>
        </section>

        <Section innerClassName="pb-0 md:pb-0">
          <div className="border-t border-border">
            {SUPPORTED_COUNTRIES.map((country) => (
              <section key={country.id} id={country.id} className="border-b border-border last:border-b-0">
                <div className="grid gap-8 px-6 py-12 md:grid-cols-12 md:px-8 md:py-16">
                  <div className="md:col-span-4">
                    <h2 className="text-[1.5rem] leading-tight tracking-[-0.03em]">{country.name}</h2>
                    <p className="mt-3 max-w-sm text-[0.9375rem] leading-[1.7] text-muted">{country.summary}</p>
                  </div>
                  <ul className="md:col-span-8">
                    {country.documents.map((document) => (
                      <li key={document.name} className="border-t border-border py-5 first:border-t-0 first:pt-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="text-base leading-snug tracking-[-0.015em]">{document.name}</h3>
                          <span className="font-mono text-xs text-tertiary">{document.capture}</span>
                        </div>
                        <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">{document.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
