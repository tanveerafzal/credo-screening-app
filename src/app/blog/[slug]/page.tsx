import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CTABanner } from '@/components/marketing/CTABanner';
import { JsonLd } from '@/components/JsonLd';
import { BLOG_POSTS, getBlogPost } from '@/lib/blog';
import { BRAND } from '@/lib/brand';
import { pageMetadata } from '@/lib/seo';
import { ArrowGlyph, Container } from '@/components/site/Canvas';
import { AsciiField } from '@/components/site/AsciiField';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      keywords: post.keywords,
    }),
    openGraph: {
      title: `${post.title} | ${BRAND.name}`,
      description: post.description,
      url: `${BRAND.website}/blog/${post.slug}`,
      siteName: BRAND.name,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Person', name: post.author, jobTitle: post.authorTitle },
          publisher: {
            '@type': 'Organization',
            name: BRAND.registeredName,
            url: BRAND.website,
          },
          mainEntityOfPage: `${BRAND.website}/blog/${post.slug}`,
        }}
      />
      <Navbar />
      <main>
        <article>
          <section className="relative overflow-hidden px-0 md:px-12">
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <AsciiField focus={[0.86, 0.5]} fadeLeft={0.42} />
            </div>
            <Container className="relative">
              <div className="max-w-2xl px-6 pb-12 pt-32 md:px-8 md:pb-16 md:pt-44">
                <p className="mb-6 text-sm text-tertiary">
                  <Link href="/" className="hover:text-foreground">Credo</Link>
                  <span className="mx-2 text-border-hover">/</span>
                  <Link href="/blog" className="hover:text-foreground">Blogs</Link>
                  <span className="mx-2 text-border-hover">/</span>
                  <span className="text-muted">{post.category}</span>
                </p>
                <h1 className="text-[2.05rem] leading-[1.12] sm:text-[2.75rem]">{post.title}</h1>
                <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-muted">{post.subtitle}</p>
                <p className="mt-6 font-mono text-xs text-tertiary">
                  {post.dateLabel} · {post.author}, {post.authorTitle}
                </p>
              </div>
            </Container>
          </section>

          <section className="border-t border-border px-0 md:px-12">
            <Container>
              <div className="max-w-2xl space-y-6 px-6 py-14 text-base leading-[1.8] text-muted md:px-8 md:py-20">
                {post.body.map((block, i) => {
                  if (block.type === 'h2') {
                    return (
                      <h2 key={i} className="pt-6 text-xl leading-snug text-foreground sm:text-2xl">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === 'ul') {
                    return (
                      <ul key={i} className="list-disc space-y-2 pl-5">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{block.text}</p>;
                })}
                <p className="pt-4">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-ink hover:underline hover:underline-offset-4"
                  >
                    <span className="rotate-180"><ArrowGlyph /></span>
                    All blogs
                  </Link>
                </p>
              </div>
            </Container>
          </section>
        </article>
        <CTABanner
          title="Verify more legitimate people digitally"
          subtitle="Government ID, selfie, and liveness checks — without relying on a credit file."
          primaryLabel="Start Free"
          primaryHref="/register"
          secondaryLabel="ID Verification"
          secondaryHref="/credo-id-verification"
        />
      </main>
      <Footer />
    </>
  );
}
