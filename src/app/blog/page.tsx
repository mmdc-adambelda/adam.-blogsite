import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const revalidate = 60;

export const metadata: Metadata = pageMetadata({
  title: `Blog — Latest Posts From ${site.name}`,
  description: "Latest posts and updates from Adam Belda.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  // Degrade gracefully if the database isn't provisioned yet (e.g. first deploy).
  const posts = process.env.DATABASE_URL ? await getPublishedPosts().catch(() => []) : [];

  return (
    <main className="container-site py-section">
      <h1 className="font-display text-4xl text-cream">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-6 text-cream/60">No posts published yet — check back soon.</p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className="group rounded-2xl border border-white/10 bg-charcoal p-5">
              <Link href={`/blog/${post.slug}`} className="cursor-pointer">
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="mb-4 aspect-[16/10] w-full rounded-xl object-cover"
                  />
                )}
                <h2 className="font-display text-xl text-cream group-hover:text-sand">{post.title}</h2>
                {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-cream/70">{post.excerpt}</p>}
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="mt-3 block text-xs uppercase tracking-wide text-cream/40"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
