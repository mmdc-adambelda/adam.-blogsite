# adambelda.com — Personal Travel & Lifestyle Blog

A production-ready Next.js website for **Adam Belda**: travel stories, food discoveries,
family journeys, and gaming milestones, wrapped in a dark cinematic tropical identity.

**Tagline:** Travel Far. Live Fully. Remember Everything.

---

## Stack

- **Next.js 14 (App Router)** + **TypeScript**
- **Tailwind CSS** (brand tokens in `tailwind.config.ts`)
- **Framer Motion** (scroll reveals, parallax hero, timeline plane, lightbox)
- **Lucide icons**, `next/font` (Fraunces display · Inter body · Caveat accents)
- Static, typed content — no CMS or database required

## Requirements

- Node.js 18.17+ (20 LTS recommended)
- npm 9+

## Install & run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check
npm run lint       # Next.js lint
```

## Project structure

```
src/
  app/                 # routes (App Router) + sitemap/robots/rss
    travel-stories/[slug]/   # travel article pages
    gaming-journeys/[slug]/  # gaming article pages
  components/          # UI (home sections, article layout, forms, lightbox…)
  data/
    site.ts            # SEO + brand + social config (edit here first)
    articles/          # one typed file per article
    journeys.ts        # map destinations, timeline, foods, photo journal
    image-guide.ts     # master list of every image placeholder
  lib/
    articles.ts        # article registry + search/filter helpers
    seo.ts             # metadata + JSON-LD schema builders
public/images/         # all image placeholders (see IMAGE-REPLACEMENT-GUIDE.md)
```

---

## Content management

### Add a new article
1. Copy any file in `src/data/articles/` (e.g. `boracay-2024.ts`) and rename it.
2. Fill in the fields — title, seoTitle, metaDescription, slug, basePath
   (`travel-stories` or `gaming-journeys`), dates, categories, tags, sections, FAQs.
3. Register it in `src/lib/articles.ts` (add the import and append to the `articles` array).
4. Add its image placeholders to `src/data/image-guide.ts` and create the folder under
   `public/images/blog/<article>/`.
That's it — listing pages, search, filters, sitemap, and RSS pick it up automatically.

### Update an existing article
Edit its file in `src/data/articles/` and bump `updatedDate`.

### Add a destination (map + destinations page)
Append an entry to `destinations` in `src/data/journeys.ts` (set `x`/`y` as percentage
coordinates on the abstract map).

### Edit homepage featured stories
Toggle each article's `featured: true/false` flag.

### Change social links / SEO defaults
Everything lives in `src/data/site.ts`.

### Replace images
See **IMAGE-REPLACEMENT-GUIDE.md** — drop correctly named files into `/public/images/`.

### Connect the newsletter / contact form
Both currently use placeholder handlers. Replace the marked `submit` functions in
`src/components/NewsletterForm.tsx` and `src/components/ContactForm.tsx` with calls to
your provider (MailerLite, Mailchimp, Resend, Formspree, or a Next.js route handler).

---

## Deployment (Vercel)

1. Push this folder to a GitHub repository.
2. In [vercel.com](https://vercel.com), **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). No env vars required. Deploy.

### Connect adambelda.com
1. Vercel → Project → **Settings → Domains** → add `adambelda.com` and `www.adambelda.com`.
2. At your registrar, point DNS as Vercel instructs:
   - `A` record for `adambelda.com` → `76.76.21.21`
   - `CNAME` for `www` → `cname.vercel-dns.com`
3. Wait for DNS propagation; Vercel provisions SSL automatically.

---

## SEO checklist after launch

1. **Verify metadata:** every page has unique titles/descriptions (`src/lib/seo.ts` +
   per-page `metadata`); view-source to confirm Open Graph tags and JSON-LD
   (Person, WebSite, BlogPosting, FAQPage, BreadcrumbList).
2. **Google Search Console:** add `https://adambelda.com` as a Domain property, verify via
   the DNS TXT record your registrar provides.
3. **Submit the sitemap:** GSC → Sitemaps → submit `https://adambelda.com/sitemap.xml`.
4. **robots.txt** is served at `/robots.txt`; **RSS** at `/rss.xml`.
5. **Rich results:** test an article URL at https://search.google.com/test/rich-results.

## Analytics (placeholder)

No analytics are installed. To add one later, drop the provider's script/component into
`src/app/layout.tsx` (Vercel Analytics: `npm i @vercel/analytics` and render
`<Analytics />` in the layout).

## Accessibility & performance notes

- Skip-to-content link, visible focus rings, keyboard-navigable menus/lightbox, labeled
  forms with inline errors, alt text on meaningful images, `aria-hidden` on decoration.
- `prefers-reduced-motion` disables/simplifies all large animations.
- Images are lazy-loaded with reserved aspect ratios (no layout shift); fonts are
  self-optimised via `next/font`.

© 2026 Adam Belda. All rights reserved.
