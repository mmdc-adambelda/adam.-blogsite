"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export default function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const results = useMemo(() => searchArticles(q), [q]);

  return (
    <div>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream/40" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            router.replace(`/search?q=${encodeURIComponent(e.target.value)}`, { scroll: false });
          }}
          placeholder="Search destinations, food, stories…"
          aria-label="Search the site"
          autoFocus
          className="min-h-[52px] w-full rounded-full border border-white/12 bg-charcoal pl-12 pr-5 text-cream placeholder:text-cream/35 focus:border-ember"
        />
      </div>
      <p role="status" className="mt-4 text-sm text-cream/50">
        {q.trim()
          ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${q}”`
          : "Type to search every story on the site."}
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
