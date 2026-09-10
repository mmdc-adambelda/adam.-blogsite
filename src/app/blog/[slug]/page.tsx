import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";
import { pageMetadata, personSchema } from "@/lib/seo";
import { absoluteUrl, site } from "@/data/site";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!process.env.DATABASE_URL) return [];
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.coverImage ?? undefined,
    }),
    openGraph: {
      type: "article",
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [site.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: absoluteUrl(post.coverImage) }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    author: personSchema(),
    publisher: personSchema(),
    keywords: post.tags.join(", "),
    articleSection: post.category ?? undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <main className="container-site py-section">
      <article className="mx-auto max-w-3xl">
        {post.category && (
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-ember">{post.category}</p>
        )}
        <h1 className="font-display text-4xl text-cream">{post.title}</h1>
        {post.publishedAt && (
          <time dateTime={post.publishedAt} className="mt-3 block text-sm text-cream/50">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt={post.title} className="my-8 w-full rounded-2xl object-cover" />
        )}
        <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-sand">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-cream/70">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
