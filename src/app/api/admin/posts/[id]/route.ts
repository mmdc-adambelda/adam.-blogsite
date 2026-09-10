import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById, isSlugTaken, updatePost, type PostInput } from "@/lib/posts";
import { slugify } from "@/lib/slug";

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const slug = slugify(typeof body.slug === "string" && body.slug ? body.slug : body.title);
  if (!slug) {
    return NextResponse.json({ error: "Could not derive a valid slug from the title." }, { status: 400 });
  }
  if (await isSlugTaken(slug, id)) {
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

  const post = await updatePost(id, input);
  if (!post) return NextResponse.json({ error: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid post id." }, { status: 400 });
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
