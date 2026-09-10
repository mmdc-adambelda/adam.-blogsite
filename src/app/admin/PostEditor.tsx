"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, CircleAlert, MinusCircle } from "lucide-react";
import type { Post, PostStatus } from "@/lib/posts";
import { slugify } from "@/lib/slug";
import { analyzeSeo, seoScore, type SeoCheckStatus } from "@/lib/seoAnalysis";

type Draft = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  status: PostStatus;
};

function toDraft(post?: Post): Draft {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    category: post?.category ?? "",
    tags: post?.tags.join(", ") ?? "",
    seoTitle: post?.seoTitle ?? "",
    metaDescription: post?.metaDescription ?? "",
    focusKeyphrase: post?.focusKeyphrase ?? "",
    status: post?.status ?? "draft",
  };
}

const statusIcon: Record<SeoCheckStatus, JSX.Element> = {
  good: <CheckCircle2 size={16} className="shrink-0 text-jungle" />,
  ok: <MinusCircle size={16} className="shrink-0 text-gold" />,
  bad: <CircleAlert size={16} className="shrink-0 text-ember" />,
  neutral: <MinusCircle size={16} className="shrink-0 text-cream/40" />,
};

export default function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(toDraft(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function onTitleChange(value: string) {
    set("title", value);
    if (!slugTouched) set("slug", slugify(value));
  }

  const checks = useMemo(
    () =>
      analyzeSeo({
        focusKeyphrase: draft.focusKeyphrase,
        seoTitle: draft.seoTitle || draft.title,
        metaDescription: draft.metaDescription,
        slug: draft.slug,
        content: draft.content,
      }),
    [draft.focusKeyphrase, draft.seoTitle, draft.title, draft.metaDescription, draft.slug, draft.content]
  );
  const { score, label } = seoScore(checks);

  async function onSubmit(e: React.FormEvent, publish?: boolean) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        title: draft.title.trim(),
        slug: draft.slug,
        excerpt: draft.excerpt,
        content: draft.content,
        coverImage: draft.coverImage || null,
        category: draft.category || null,
        tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
        seoTitle: draft.seoTitle.trim() || draft.title.trim(),
        metaDescription: draft.metaDescription,
        focusKeyphrase: draft.focusKeyphrase,
        status: publish === undefined ? draft.status : publish ? "published" : "draft",
      };

      const res = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
        method: post ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save post.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        {error && (
          <p className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">{error}</p>
        )}

        <Field label="Title">
          <input
            value={draft.title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
            className="input"
          />
        </Field>

        <Field label="Slug" hint={`/blog/${draft.slug || "your-post-slug"}`}>
          <input
            value={draft.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
            required
            className="input font-mono text-sm"
          />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the blog listing page.">
          <textarea
            value={draft.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={2}
            className="input resize-y"
          />
        </Field>

        <Field label="Content" hint="Markdown supported (headings, bold, links, lists…).">
          <textarea
            value={draft.content}
            onChange={(e) => set("content", e.target.value)}
            rows={20}
            required
            className="input resize-y font-mono text-sm leading-relaxed"
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Cover image URL">
            <input
              value={draft.coverImage}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="/images/blog/my-post/cover.jpg"
              className="input"
            />
          </Field>
          <Field label="Category">
            <input value={draft.category} onChange={(e) => set("category", e.target.value)} className="input" />
          </Field>
        </div>

        <Field label="Tags" hint="Comma-separated.">
          <input value={draft.tags} onChange={(e) => set("tags", e.target.value)} className="input" />
        </Field>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-charcoal p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream/60">Publish</h2>
          <div className="space-y-3">
            <select
              value={draft.status}
              onChange={(e) => set("status", e.target.value as PostStatus)}
              className="input"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => onSubmit(e, false)}
                disabled={saving}
                className="flex-1 cursor-pointer rounded-full border border-white/15 px-4 py-2.5 text-sm text-cream/80 transition-colors hover:bg-white/[0.06] disabled:opacity-60"
              >
                Save draft
              </button>
              <button
                type="button"
                onClick={(e) => onSubmit(e, true)}
                disabled={saving}
                className="flex-1 cursor-pointer rounded-full bg-ember px-4 py-2.5 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-charcoal p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-cream/60">SEO (Yoast-style)</h2>
          <Field label="Focus keyphrase">
            <input
              value={draft.focusKeyphrase}
              onChange={(e) => set("focusKeyphrase", e.target.value)}
              className="input"
            />
          </Field>
          <div className="mt-4">
            <Field label="SEO title" hint={`${(draft.seoTitle || draft.title).length} characters`}>
              <input value={draft.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className="input" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Meta description" hint={`${draft.metaDescription.length} characters`}>
              <textarea
                value={draft.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                rows={3}
                className="input resize-y"
              />
            </Field>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                score >= 80 ? "bg-jungle" : score >= 50 ? "bg-gold" : "bg-ember"
              }`}
            />
            <span className="text-sm font-medium text-cream">
              SEO score: {score}/100 — {label}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {checks.map((c) => (
              <li key={c.id} className="flex items-start gap-2 text-sm text-cream/70">
                {statusIcon[c.status]}
                <span>{c.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #050505;
          padding: 0.65rem 0.9rem;
          color: #f7f3ee;
          outline: none;
        }
        .input:focus {
          border-color: #d72638;
        }
      `}</style>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm text-cream/70">{label}</span>
      {children}
      {hint && <span className="block text-xs text-cream/40">{hint}</span>}
    </label>
  );
}
