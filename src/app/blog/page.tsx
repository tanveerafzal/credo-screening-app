import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';
import { BLOG_POSTS } from '@/lib/blog';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowGlyph, Container, Section } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description: `Articles from ${BRAND.registeredName} on identity verification, digital onboarding, and inclusive verification journeys.`,
  path: '/blog',
  keywords: ['identity verification blog', 'digital onboarding', 'KYC'],
});

export default function BlogIndexPage() {
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
                <span className="text-muted">Blogs</span>
              </p>
              <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl">Blogs</h1>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">
                Notes on identity verification, digital onboarding, and how to verify more legitimate people without weakening security.
              </p>
            </div>
          </Container>
        </section>

        <Section innerClassName="pb-0 md:pb-0">
          <ul className="border-t border-border">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug} className="border-b border-border last:border-b-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 px-6 py-10 transition-colors hover:bg-foreground/[0.02] md:grid-cols-12 md:items-baseline md:gap-6 md:px-8"
                >
                  <div className="font-mono text-xs text-tertiary md:col-span-3">
                    <p>{post.category}</p>
                    <p className="mt-1">{post.dateLabel}</p>
                    <p className="mt-1">{post.author}, {post.authorTitle}</p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="text-[1.25rem] leading-snug tracking-[-0.02em] group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-4">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.7] text-muted">{post.subtitle}</p>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-ink">
                      Read article <ArrowGlyph />
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
