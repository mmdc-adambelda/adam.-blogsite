/**
 * Central SEO + site configuration.
 * Update metadata, social links, and brand copy here — pages read from this file.
 */
export const site = {
  name: "Adam Belda",
  domain: "https://adambelda.com",
  tagline: "Travel Far. Live Fully. Remember Everything.",
  description:
    "Personal stories about destinations, food, family, culture, gaming, and the moments that make every journey meaningful.",
  author: {
    name: "Adam Belda",
    role: "Traveller, storyteller, technology professional, and gamer",
    location: "Philippines",
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
