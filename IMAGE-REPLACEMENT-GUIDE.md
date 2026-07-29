# Image Replacement Guide — adambelda.com

Every image on this site is a **named placeholder**. Until you add a real file, the site
shows a styled placeholder card displaying the exact filename, recommended dimensions, and
suggested alt text — so you always know what goes where, and the layout never shifts.

The complete machine-readable list also lives in `src/data/image-guide.ts`.

## 1. How replacement works

1. Prepare your photo (see §7 for optimisation).
2. Rename it to **exactly** the filename shown on the placeholder (including `.webp`).
3. Drop it into the matching folder under `/public/images/`.
4. Refresh — the real photo appears automatically. No code changes needed.

## 2. Folder map

| Folder | Contents |
|---|---|
| `/public/images/branding/` | Logo, favicon, social preview |
| `/public/images/home/` | Homepage hero |
| `/public/images/about/` | Your portrait |
| `/public/images/blog/davao-2016/` | Article 1 images |
| `/public/images/blog/davao-champion-2024/` | Article 2 images |
| `/public/images/blog/macau-hongkong-2025/` | Article 3 images |
| `/public/images/blog/ho-chi-minh-2026/` | Article 4 images |
| `/public/images/blog/boracay-2024/` | Article 5 images |

## 3. Replacing the logo

- The live logo is a React component (`src/components/Logo.tsx`) with an animated airplane.
- To use your own logo: save it as `/public/images/branding/adambelda-logo-placeholder.svg`,
  then follow the comment inside `Logo.tsx` to swap the component for an `<Image>` tag.
- Reserved variants (referenced in `src/data/site.ts`):
  - `adambelda-logo-dark.png` (600x160) — for light surfaces
  - `adambelda-logo-light.png` (600x160) — for dark surfaces
  - `adambelda-favicon.png` (512x512)
  - `adambelda-social-preview.jpg` (1200x630) — used in Open Graph/Twitter cards

## 4. Homepage images

| File | Size | Used in |
|---|---|---|
| `/images/home/adambelda-tropical-hero-placeholder.webp` | 1920x1080 | Hero background |
| Featured story cards | — | Pull each article's featured image automatically |

## 5. Per-article images

Each article's placeholders are listed with dimensions and alt text in
`src/data/image-guide.ts` (grouped by article). Featured images per article:

- Davao 2016 → `samal-island-beach-placeholder.webp` (1600x1000)
- Grand Chase 2024 → `champion-title-placeholder.webp` (1600x1000)
- Macau & HK 2025 → `macau-skyline-placeholder.webp` (1600x1000)
- Ho Chi Minh 2026 → `district-1-street-placeholder.webp` (1600x1000)
- Boracay 2024 → `boracay-sunset-placeholder.webp` (1600x1067)

## 6. Updating alt text

Alt text lives with the content, not in components:
- Article images → edit the article file in `src/data/articles/`
- Photo journal → `src/data/journeys.ts` (`journalPhotos`)
- Map thumbnails → `src/data/journeys.ts` (`destinations`)
- Master reference → `src/data/image-guide.ts`

Write alt text that describes the photo for someone who can't see it. Decorative flourishes
(waves, palms, flight paths) are already marked `aria-hidden` and need no alt.

## 7. Optimising before upload

1. Export as **WebP** (or AVIF) — `.jpg` works but is larger.
2. Resize to the recommended dimensions — don't upload 6000px camera originals.
3. Target under ~250 KB for article images, under ~400 KB for the hero.
4. Free tools: [Squoosh](https://squoosh.app) (browser) or `cwebp -q 80 in.jpg -o out.webp`.

## 8. Avoiding layout problems

- Keep the **same aspect ratio** as the recommended dimensions — the layout reserves space
  from those numbers (this is what prevents layout shift).
- Don't rename files to different names; the code references these exact paths.
- After replacing, hard-refresh (Ctrl/Cmd+Shift+R) if you still see the placeholder.
