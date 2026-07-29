import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { site, absoluteUrl } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";
import JsonLd from "@/components/JsonLd";
import { personSchema, websiteSchema } from "@/lib/seo";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", weight: ["500", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — Travel, Food, Family & Gaming Stories`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: site.branding.favicon },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.domain,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: absoluteUrl(site.branding.socialPreview), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [absoluteUrl(site.branding.socialPreview)],
  },
  alternates: {
    types: { "application/rss+xml": `${site.domain}/rss.xml` },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ember focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
