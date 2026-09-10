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
    // Don't force a fetch cache mode here: admin pages already opt out of caching
    // via `export const dynamic = "force-dynamic"` (so their reads are always
    // fresh), while the public /blog pages rely on cacheable fetches for static
    // generation + ISR (`revalidate`). Forcing "no-store" globally breaks that
    // static generation with a "Dynamic server usage" build error.
    client = neon(process.env.DATABASE_URL);
  }
  return client;
}
