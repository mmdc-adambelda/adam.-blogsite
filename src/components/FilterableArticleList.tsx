"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, X } from "lucide-react";
import type { Article } from "@/data/articles/types";
import ArticleCard from "./ArticleCard";

interface Props {
  items: Article[];
  destinations: string[];
  categories: string[];
  years: number[];
  tags: string[];
}

const PAGE = 6;

export default function FilterableArticleList({ items, destinations, categories, years, tags }: Props) {
  const [q, setQ] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [tag, setTag] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [limit, setLimit] = useState(PAGE);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((a) => {
      if (destination && a.destination !== destination) return false;
      if (category && !a.categories.includes(category as Article["category"])) return false;
      if (year && String(a.travelYear) !== year) return false;
      if (tag && !a.tags.includes(tag)) return false;
      if (query && !`${a.title} ${a.excerpt} ${a.destination} ${a.tags.join(" ")}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [items, q, destination, category, year, tag]);

  const visible = filtered.slice(0, limit);
  const hasFilters = q || destination || category || year || tag;

  const selectCls =
    "min-h-[44px] cursor-pointer rounded-full border border-white/12 bg-charcoal px-4 text-sm text-cream focus:border-ember";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search stories…"
            aria-label="Search stories"
            className="min-h-[46px] w-full rounded-full border border-white/12 bg-charcoal pl-11 pr-4 text-sm text-cream placeholder:text-cream/35 focus:border-ember"
          />
        </div>
        <select aria-label="Filter by destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={selectCls}>
          <option value="">All destinations</option>
          {destinations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select aria-label="Filter by year" value={year} onChange={(e) => setYear(e.target.value)} className={selectCls}>
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <select aria-label="Filter by tag" value={tag} onChange={(e) => setTag(e.target.value)} className={selectCls}>
          <option value="">All tags</option>
          {tags.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <div className="ml-auto flex gap-1 rounded-full border border-white/12 p-1" role="group" aria-label="Layout">
          <button type="button" onClick={() => setView("grid")} aria-pressed={view === "grid"} aria-label="Grid view" className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors ${view === "grid" ? "bg-wine/60 text-sand" : "text-cream/50 hover:text-cream"}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} aria-label="List view" className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors ${view === "list" ? "bg-wine/60 text-sand" : "text-cream/50 hover:text-cream"}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-sm text-cream/50">
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"} found
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setDestination("");
              setCategory("");
              setYear("");
              setTag("");
            }}
            className="flex cursor-pointer items-center gap-1 text-ember hover:text-sand"
          >
            <X className="h-3.5 w-3.5" /> Clear filters
          </button>
        )}
      </div>

      <div className={`mt-8 grid gap-6 ${view === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
        {visible.map((a) => (
          <ArticleCard key={a.slug} article={a} list={view === "list"} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-cream/50">
          No stories match those filters yet — try clearing one or two.
        </p>
      )}

      {visible.length < filtered.length && (
        <div className="mt-10 text-center">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="btn-secondary">
            Load more stories
          </button>
        </div>
      )}
    </div>
  );
}
