import { NextRequest, NextResponse } from "next/server";
import { createPost, getAllPostsAdmin, isSlugTaken, type PostInput } from "@/lib/posts";
import { slugify } from "@/lib/slug";

export async function GET() {
  const posts = await getAllPostsAdmin();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const slug = slugify(typeof body.slug === "string" && body.slug ? body.slug : body.title);
  if (!slug) {
    return NextResponse.json({ error: "Could not derive a valid slug from the title." }, { status: 400 });
  }
  if (await isSlugTaken(slug)) {
    return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 });
  }

  const input: PostInput = {
    title: body.title.trim(),
    slug,
    excerpt: String(body.excerpt ?? ""),
    content: String(body.content ?? ""),
    coverImage: body.coverImage ? String(body.coverImage) : null,
    category: body.category ? String(body.category) : null,
    tags: Array.isArray(body.tags) ? body.tags.map(String).filter(Boolean) : [],
    seoTitle: String(body.seoTitle ?? body.title).trim(),
    metaDescription: String(body.metaDescription ?? ""),
    focusKeyphrase: String(body.focusKeyphrase ?? ""),
    status: body.status === "published" ? "published" : "draft",
  };

  const post = await createPost(input);
  return NextResponse.json({ post }, { status: 201 });
}
