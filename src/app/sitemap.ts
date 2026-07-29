import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { articles } from "@/lib/articles";
import { articleUrl } from "@/data/articles/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/travel-stories",
    "/destinations",
    "/food-and-culture",
    "/lifestyle",
    "/gaming-journeys",
    "/photo-journal",
    "/contact",
    "/search",
    "/privacy-policy",
    "/terms-of-use",
  ].map((p) => ({
    url: `${site.domain}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const articlePaths = articles.map((a) => ({
    url: `${site.domain}${articleUrl(a)}`,
    lastModified: new Date(a.updatedDate),
    changeFrequency: "yearly" as const,
    priority: 0.9,
  }));

  return [...staticPaths, ...articlePaths];
}
