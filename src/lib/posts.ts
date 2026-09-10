import { sql } from "@/lib/db";

export type PostStatus = "draft" | "published";

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  coverImage: string | null;
  category: string | null;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface PostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string | null;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  focusKeyphrase: string;
  status: PostStatus;
}

interface PostRow {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string | null;
  tags: string[];
  seo_title: string;
  meta_description: string;
  focus_keyphrase: string;
  status: PostStatus;
  published_at: string | null;
  updated_at: string;
  created_at: string;
}

function rowToPost(r: PostRow): Post {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.cover_image,
    category: r.category,
    tags: r.tags ?? [],
    seoTitle: r.seo_title,
    metaDescription: r.meta_description,
    focusKeyphrase: r.focus_keyphrase,
    status: r.status,
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
    createdAt: r.created_at,
  };
}

export async function getPublishedPosts(): Promise<Post[]> {
  const db = sql();
  const rows = (await db`
    select * from posts where status = 'published' order by published_at desc
  `) as PostRow[];
  return rows.map(rowToPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const db = sql();
  const rows = (await db`
    select * from posts where slug = ${slug} and status = 'published' limit 1
  `) as PostRow[];
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const db = sql();
  const rows = (await db`select * from posts order by updated_at desc`) as PostRow[];
  return rows.map(rowToPost);
}

export async function getPostById(id: number): Promise<Post | null> {
  const db = sql();
  const rows = (await db`select * from posts where id = ${id} limit 1`) as PostRow[];
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
  const db = sql();
  const rows = (excludeId
    ? await db`select id from posts where slug = ${slug} and id <> ${excludeId} limit 1`
    : await db`select id from posts where slug = ${slug} limit 1`) as { id: number }[];
  return rows.length > 0;
}

export async function createPost(input: PostInput): Promise<Post> {
  const db = sql();
  const publishedAt = input.status === "published" ? new Date().toISOString() : null;
  const rows = (await db`
    insert into posts
      (title, slug, excerpt, content, cover_image, category, tags, seo_title,
       meta_description, focus_keyphrase, status, published_at)
    values
      (${input.title}, ${input.slug}, ${input.excerpt}, ${input.content}, ${input.coverImage},
       ${input.category}, ${input.tags}, ${input.seoTitle}, ${input.metaDescription},
       ${input.focusKeyphrase}, ${input.status}, ${publishedAt})
    returning *
  `) as PostRow[];
  return rowToPost(rows[0]);
}

export async function updatePost(id: number, input: PostInput): Promise<Post | null> {
  const existing = await getPostById(id);
  if (!existing) return null;
  const publishedAt =
    input.status === "published" ? existing.publishedAt ?? new Date().toISOString() : null;
  const db = sql();
  const rows = (await db`
    update posts set
      title = ${input.title},
      slug = ${input.slug},
      excerpt = ${input.excerpt},
      content = ${input.content},
      cover_image = ${input.coverImage},
      category = ${input.category},
      tags = ${input.tags},
      seo_title = ${input.seoTitle},
      meta_description = ${input.metaDescription},
      focus_keyphrase = ${input.focusKeyphrase},
      status = ${input.status},
      published_at = ${publishedAt},
      updated_at = now()
    where id = ${id}
    returning *
  `) as PostRow[];
  return rows[0] ? rowToPost(rows[0]) : null;
}

export async function deletePost(id: number): Promise<void> {
  const db = sql();
  await db`delete from posts where id = ${id}`;
}
