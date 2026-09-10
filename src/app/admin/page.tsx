import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/posts";
import LogoutButton from "./LogoutButton";
import DeletePostButton from "./DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await getAllPostsAdmin();

  return (
    <main className="min-h-screen bg-night px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-cream">Blog admin</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts/new"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-ember px-4 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
            >
              <Plus size={16} /> New post
            </Link>
            <LogoutButton />
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-charcoal p-8 text-center text-cream/60">
            No posts yet. Create your first one.
          </p>
        ) : (
          <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/10 bg-charcoal">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "published"
                          ? "bg-jungle/30 text-sand"
                          : "bg-white/10 text-cream/60"
                      }`}
                    >
                      {post.status}
                    </span>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="cursor-pointer truncate text-cream hover:text-sand"
                    >
                      {post.title}
                    </Link>
                  </div>
                  <p className="mt-1 truncate text-xs text-cream/40">/blog/{post.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="cursor-pointer rounded-full px-3 py-1.5 text-sm text-cream/70 transition-colors hover:bg-white/[0.06] hover:text-cream"
                  >
                    Edit
                  </Link>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
