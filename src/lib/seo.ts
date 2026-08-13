import type { Metadata } from "next";
import { site, absoluteUrl } from "@/data/site";
import type { Article, Faq } from "@/data/articles/types";
import { articleUrl } from "@/data/articles/types";
import { publications } from "@/data/publications";

/** Stable identifier for the Adam Belda Person entity, reused across schema blocks. */
export const personId = `${site.domain}/#person`;

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
  "@id": personId,
  name: site.author.name,
  alternateName: site.author.alternateName,
  url: site.domain,
  description: site.author.role,
  jobTitle: site.author.jobTitle,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: site.author.knowsAbout,
  sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok, site.previousDomain],
});

/**
 * Richer Person entity for the /about page: adds occupation history and
 * third-party publications (subjectOf) on top of the sitewide personSchema.
 * Shares the same @id so it's read as the same real-world entity.
 */
export const personProfileSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: site.author.name,
  alternateName: site.author.alternateName,
  url: absoluteUrl("/about"),
  image: absoluteUrl("/images/about/adam-belda-profile-placeholder.webp"),
  description: site.author.role,
  jobTitle: site.author.jobTitle,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: site.author.knowsAbout,
  hasOccupation: site.author.occupations.map((name) => ({ "@type": "Occupation", name })),
  sameAs: [site.social.facebook, site.social.instagram, site.social.tiktok, site.previousDomain],
  subjectOf: publications.map((p) => ({
    "@type": "Article",
    headline: p.title,
    url: p.url,
    publisher: { "@type": "Organization", name: p.publisher },
  })),
});

export const profilePageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `About ${site.author.name}`,
  url: absoluteUrl("/about"),
  mainEntity: { "@id": personId },
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

export const faqSchemaFor = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const faqSchema = (a: Article) => faqSchemaFor(a.faqs);

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
