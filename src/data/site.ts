/**
 * Central SEO + site configuration.
 * Update metadata, social links, and brand copy here — pages read from this file.
 */
export const site = {
  name: "Adam Belda",
  domain: "https://adambelda.com",
  /** Retired domain — kept for entity/schema continuity after the .net → .com migration. */
  previousDomain: "https://adambelda.net",
  tagline: "Travel Far. Live Fully. Remember Everything.",
  description:
    "Personal stories about destinations, food, family, culture, gaming, and the moments that make every journey meaningful.",
  author: {
    name: "Adam Belda",
    alternateName: "Adam Raymond Belda",
    role: "IT professional, professional dancer, esports competitor, and travel blogger",
    location: "Philippines",
    jobTitle: "IT Professional & Head of Operations",
    knowsAbout: [
      "IT operations and technology leadership",
      "Professional dance",
      "League of Legends esports",
      "Wild Rift esports",
      "Travel blogging",
      "Philippine food and culture",
    ],
    occupations: [
      "IT Professional & Head of Operations (New Zealand client)",
      "Professional Dancer, 2014–2022",
      "Professional League of Legends & Wild Rift Esports Player, 2018–2022",
      "Travel, Food & Lifestyle Blogger since 2012",
    ],
  },
  social: {
    facebook: "https://facebook.com/adambeldablogs",
    instagram: "https://instagram.com/adambelda",
    tiktok: "https://tiktok.com/@adam.g.b",
  },
  branding: {
    logoDark: "/images/branding/adambelda-logo-dark.png",
    logoLight: "/images/branding/adambelda-logo-light.png",
    favicon: "/images/branding/adambelda-favicon.png",
    socialPreview: "/images/branding/adambelda-social-preview.jpg",
  },
  copyright: "© 2026 Adam Belda. All rights reserved.",
} as const;

export const absoluteUrl = (path: string) =>
  `${site.domain}${path.startsWith("/") ? path : `/${path}`}`;
