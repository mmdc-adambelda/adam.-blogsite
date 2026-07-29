import { davao2016 } from "@/data/articles/davao-2016";
import { davaoChampion2024 } from "@/data/articles/davao-champion-2024";
import { macauHongKong2025 } from "@/data/articles/macau-hongkong-2025";
import { hoChiMinh2026 } from "@/data/articles/ho-chi-minh-2026";
import { boracay2024 } from "@/data/articles/boracay-2024";
import type { Article } from "@/data/articles/types";
export { articleUrl } from "@/data/articles/types";
export type { Article, Category } from "@/data/articles/types";

/** All articles, newest travel first. Add new articles to this list. */
export const articles: Article[] = [
  hoChiMinh2026,
  macauHongKong2025,
  boracay2024,
  davaoChampion2024,
  davao2016,
];

export const featuredArticles = articles.filter((a) => a.featured);

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const getArticlesByBase = (basePath: Article["basePath"]) =>
  articles.filter((a) => a.basePath === basePath);

export const getRelated = (article: Article) =>
  article.related
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => Boolean(a));

export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort();
export const allYears = Array.from(new Set(articles.map((a) => a.travelYear))).sort(
  (a, b) => b - a
);
export const allDestinations = Array.from(
  new Set(articles.map((a) => a.destination))
);
export const allCategories = Array.from(
  new Set(articles.flatMap((a) => a.categories))
);

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((a) =>
    [
      a.title,
      a.excerpt,
      a.destination,
      a.country,
      a.tags.join(" "),
      a.categories.join(" "),
      a.intro.join(" "),
      a.sections.map((s) => `${s.heading} ${s.paragraphs.join(" ")}`).join(" "),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}
