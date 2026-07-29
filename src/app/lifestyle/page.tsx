import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ArticleCard from "@/components/ArticleCard";
import { articles } from "@/lib/articles";

export const metadata: Metadata = pageMetadata({
  title: "Lifestyle — Reflections, Family & Everything Between Trips | Adam Belda",
  description:
    "Lifestyle writing from Adam Belda: family experiences, personal reflections, budget travel thinking, and the life that happens between journeys.",
  path: "/lifestyle",
});

export default function LifestylePage() {
  const items = articles.filter((a) =>
    a.categories.some((c) => c === "Personal Reflections" || c === "Family Travel" || c === "Lifestyle")
  );
  return (
    <div className="container-site py-16">
      <p className="eyebrow">Between journeys</p>
      <h1 className="h-display mt-1 text-4xl font-bold sm:text-5xl">Lifestyle</h1>
      <p className="mt-3 max-w-2xl text-cream/65">
        Travel is only part of the story. This is where I write about family, reflection,
        and the way journeys change ordinary life — the celebrations, the griefs, and the
        lessons that come home with you.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
