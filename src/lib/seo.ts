import type { Metadata } from "next";
import { site, absoluteUrl } from "@/data/site";
import type { Article } from "@/data/articles/types";
import { articleUrl } from "@/data/articles/types";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? site.branding.socialPreview);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      images: [{ url: image }],
      type: "website",
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.author.name,
  url: site.domain,
  description: site.author.role,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.domain,
  description: site.description,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.domain}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const articleSchema = (a: Article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.metaDescription,
  image: absoluteUrl(a.featuredImage.src),
  url: absoluteUrl(articleUrl(a)),
  datePublished: a.publishedDate,
  dateModified: a.updatedDate,
  author: personSchema(),
  publisher: personSchema(),
  keywords: a.tags.join(", "),
  articleSection: a.category,
  mainEntityOfPage: absoluteUrl(articleUrl(a)),
});

export const faqSchema = (a: Article) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: a.faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});
