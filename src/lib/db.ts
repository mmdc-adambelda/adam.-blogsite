import { neon } from "@neondatabase/serverless";

/** Lazily created so builds without DATABASE_URL set (no posts yet) don't crash at import time. */
let client: ReturnType<typeof neon> | null = null;

export function sql() {
  if (!client) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. Add it to .env.local (see .env.example) and in Vercel → Settings → Environment Variables."
      );
    }
    // Next.js patches global fetch and caches it by default; Neon's driver queries
    // over HTTP, so without this every request would be cached and reads would
    // never see fresh data (e.g. a post published a moment ago).
    client = neon(process.env.DATABASE_URL, { fetchOptions: { cache: "no-store" } });
  }
  return client;
}
