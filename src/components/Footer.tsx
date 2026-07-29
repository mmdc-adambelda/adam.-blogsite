import Link from "next/link";
import { Facebook, Instagram, Music2 } from "lucide-react";
import { site } from "@/data/site";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/travel-stories", label: "Travel Stories" },
      { href: "/destinations", label: "Destinations" },
      { href: "/food-and-culture", label: "Food & Culture" },
      { href: "/gaming-journeys", label: "Gaming Journeys" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/about", label: "About Adam" },
      { href: "/photo-journal", label: "Photo Journal" },
      { href: "/lifestyle", label: "Lifestyle" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-use", label: "Terms of Use" },
      { href: "/rss.xml", label: "RSS Feed" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-section overflow-hidden border-t border-white/[0.06] bg-charcoal">
      {/* Decorative flight path */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-30"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,80 C300,20 600,90 900,40 S1150,60 1200,30"
          fill="none"
          stroke="#C99A3D"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <path d="M1180,32 l16,-6 -7,15 -5,-4 -5,2 z" fill="#D72638" />
      </svg>

      <div className="container-site relative grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            {site.description}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Adam Belda on Facebook" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-cream/70 transition-all duration-200 hover:border-ember hover:text-ember">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Adam Belda on Instagram" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-cream/70 transition-all duration-200 hover:border-ember hover:text-ember">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Adam Belda on TikTok" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-cream/70 transition-all duration-200 hover:border-ember hover:text-ember">
              <Music2 className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {cols.map((col) => (
            <nav key={col.title} aria-label={`Footer — ${col.title}`}>
              <h2 className="font-display text-sm uppercase tracking-[0.18em] text-sand">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="cursor-pointer text-sm text-cream/60 transition-colors hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container-site border-t border-white/[0.06] py-10">
        <div className="max-w-md">
          <h2 className="font-display text-lg text-cream">Stories From the Road</h2>
          <p className="mt-1 text-sm text-cream/55">
            New stories, food discoveries, and reflections — straight from Adam.
          </p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-cream/40">{site.copyright}</p>
      </div>
    </footer>
  );
}
