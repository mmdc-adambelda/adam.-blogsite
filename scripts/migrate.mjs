// One-time (and re-runnable) schema setup for the blog's Postgres database.
// Usage: node scripts/migrate.mjs   (reads DATABASE_URL from .env.local)
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadDotEnvLocal() {
  try {
    const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
    }
  } catch {
    // .env.local not present — assume env vars are already set (e.g. in CI)
  }
}

loadDotEnvLocal();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  create table if not exists posts (
    id serial primary key,
    title text not null,
    slug text unique not null,
    excerpt text not null default '',
    content text not null default '',
    cover_image text,
    category text,
    tags text[] not null default '{}',
    seo_title text not null default '',
    meta_description text not null default '',
    focus_keyphrase text not null default '',
    status text not null default 'draft' check (status in ('draft', 'published')),
    published_at timestamptz,
    updated_at timestamptz not null default now(),
    created_at timestamptz not null default now()
  )
`;

await sql`create index if not exists posts_status_published_idx on posts (status, published_at desc)`;

console.log("posts table is ready.");
