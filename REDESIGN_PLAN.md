# Redesign plan — Rudra Gokarna Adventures

Status: **approved with changes** (see section 0). Work happens on the `redesign` branch.

---

## 0. Approved changes (supersede the sections below where they differ)

- **D1, revised:** keep pages with unique content, restyle them with the new system, give each its own title, meta and JSON-LD, and link to them from the matching home section. Redirect (308) the pages that only duplicate home content.

  | Page | Words | Decision |
  | --- | --- | --- |
  | `/packages` | 401 | **Keep** as the package detail page. Linked from home Packages. |
  | `/adventures` | 269 | **Keep** as the "Things to do" page, with every activity and place in visible text. Linked from home Experiences. |
  | `/contact` | 280 | Redirect → `/#book` |
  | `/about` | 103 | Redirect → `/#boat` (its boat description moves into the home boat section) |
  | `/gallery` | 58 | Redirect → `/#gallery` |
  | `/new-year` | 32 | Redirect → `/#events` |
  | `/guides` | 31 | Redirect → `/` |
- **D2:** devDependencies only. framer-motion is removed only once every animation is CSS.
- **D3, D5–D8:** as recommended.
- **D4:** the owner's answer (photo or render) is still pending. The showcase image keeps a neutral caption and a TODO(owner) until it arrives.
- **OG image:** the optimize script makes a proper 1200×630 crop and the metadata matches it.
- **Desktop height:** trim copy and card heights first. Desktop section padding stays at least 96px.

---

## 1. What's in the repo today

| Area | Current state |
| --- | --- |
| Stack | Next **16.4.6** (App Router, `next build --webpack`), React 19.3, Tailwind **4.3** (imported but barely used), framer-motion 12, lucide-react 1.72, TypeScript 6. |
| Baseline | `npm run build`, `eslint .` and `tsc --noEmit` all pass clean right now. |
| Routes | `/` plus 7 secondary pages: `/about`, `/adventures`, `/contact`, `/gallery`, `/guides` (empty, unpublished), `/new-year`, `/packages`. Also `robots.ts`, `sitemap.ts`, icons. |
| Home page | `HomeSections.tsx` stacks 14 sections: Hero, Intro, Packages, Comparison, BoatScroll (pinned), Experiences, Places, Planner, Gallery, Videos, Custom events, Good to know, FAQ, Contact. `BookingBar` is fixed on every page. |
| Content | Spread across 10 files in `lib/` (`site`, `confirm`, `siteInfo`, `packages`, `experiences`, `places`, `faq`, `images`, `guides`, `metadata`), with some copy hard-coded in components. |
| Styles | One 35 KB `globals.css` of hand-written classes: 5 section colours and about 6 button styles. |
| Forms | `PackagePlanner`, `ContactForm` and `BookingBar` overlap. The two guest steppers start at `null` and show "—". |

### Findings beyond the audit
1. **`rudra-boat-01.mp4` and `rudra-boat-02.mp4` are byte-identical** (same MD5). Clip 03 is the hero, so only clips **01, 04 and 05** are unique.
2. **`rudra-boat-showcase.jpeg` looks like a composite or render, not a photograph**: palm trees, a mirror-perfect reflection and a studio-clean hull. `CREDITS.md` lists it as a "photograph". I'll caption it neutrally until you confirm (see D4).
3. **The OG image dimensions are wrong.** Metadata says 1200×630, but the file is 1600×901. The asset script will make a real 1200×630 JPEG.
4. **The boat renders are small** (328–1008 px wide, on a light-grey studio background). I'll show them `object-contain` on a light stage so they don't get blurry from upscaling. Higher-res renders become a TODO(owner).
5. **The logo PNG is 656 KB at 1164×491.** It's raster artwork with no vector source, so tracing it to SVG *would* lose quality. Plan: keep the PNG, serve it through next/image at 40 px tall (≈95×40 CSS px, eager, explicit width/height), and add a TODO(owner) for a vector logo. The navy wordmark has a white outline, so it reads on both `.glass-dark` and `.glass-light`.
6. **Next 16 deprecates `<Image priority>`** in favour of `preload`, and the docs say not to combine `preload` with `fetchPriority`. Using `priority` would print a deprecation warning, which breaks the "no warnings" rule. For the hero poster I'll use `loading="eager"` + `fetchPriority="high"`, which is the docs' recommended equivalent. Next 16 also *requires* `images.qualities`.
7. **A looping background video longer than 5 s needs a pause control** (WCAG 2.2.2), or the a11y target fails. See D6.
8. **A gold focus ring on sand fails non-text contrast** (#F2B134 on #F7F5F0 ≈ 1.7:1; WCAG 1.4.11 wants 3:1). See D5.
9. **No ffmpeg, Playwright or Lighthouse is installed.** `sharp` and `axe-core` are already in `node_modules` as transitive deps. See D2.

---

## 2. Decisions I need from you (my recommended default first)

| # | Decision | Recommended default | Alternative |
| --- | --- | --- | --- |
| D1 | **Secondary routes** (`/about`, `/adventures`, `/contact`, `/gallery`, `/guides`, `/new-year`, `/packages`). They'd duplicate the new one-page design and keep the old components alive. | **Delete them and add permanent (308) redirects** in `next.config.ts`: `/packages→/#packages`, `/adventures→/#experiences`, `/about→/#boat`, `/gallery→/#gallery`, `/contact→/#book`, `/new-year→/#events`, `/guides→/`. The sitemap becomes just `/`. | Keep them as thin pages built from the new sections. More code, plus duplicate-content SEO risk. |
| D2 | **Dev tools to install** (all `devDependencies`, all from npm). | `ffmpeg-static` (downloads an ffmpeg binary, ~70 MB, from its GitHub release on install), `sharp` (pin explicitly; it's already present), `playwright` + `npx playwright install chromium` (~150 MB browser download), `@axe-core/playwright`, `lighthouse`. Remove `framer-motion` (motion becomes CSS-only). | Use a system ffmpeg you install yourself; the script reads `FFMPEG_PATH` first either way. |
| D3 | **Originals vs. optimised files.** | `git mv` the originals into `/assets-src/` (a rename, so the repo doesn't grow). Write optimised outputs to `/public`, **keeping the same URL** where one exists (`rudra-coast.jpeg`, `rudra-boat-showcase.jpeg`, clips 01/04/05) so old links and cached OG cards still resolve. New files: `/images/hero/hero-{828,1600}.{webp,avif}`, `/videos/hero-loop-{1080,720}.{mp4,webm}`, `/videos/posters/*.webp`, `/images/og.jpg`. Clip 02 (duplicate) and clip 03 (hero source) live only in `/assets-src`. | Leave the originals in `/public` too. Bigger deploy, but every old URL still works. |
| D4 | **How to label `rudra-boat-showcase.jpeg`.** | Show it in the gallery captioned "The Rudra Gokarna" with no "photograph" claim, plus `// TODO(owner): confirm whether this is a photo or a render`. | Label it "Design render" like the boat renders. |
| D5 | **Focus ring.** | 2 px gold outline **plus a 2 px navy-900 outer halo**, so it passes 3:1 on sand and white as well as on navy. | Gold only, exactly as specced (fails 1.4.11 on sand). |
| D6 | **Hero video pause control.** | Add a 44 px `.glass-dark` pause/play button at the hero's bottom-right (desktop only, since the video only plays there). | None. That fails WCAG 2.2.2. |
| D7 | **Styling approach.** | **Tailwind v4** (already installed): tokens in `@theme`, so only the spec colours exist as utilities. `.glass-dark` and `.glass-light` become `@utility` rules. A small `globals.css` holds the base styles, focus ring, reduced motion and the `@supports` fallback. | Rewrite `globals.css` as hand-written classes, like today. |
| D8 | **Stock-photo honesty on activity/place tiles.** | Alt text describes the scene (e.g. "Person paddling a red kayak on calm sea"), plus one muted line under the Experiences intro: "Activity and place photos are illustrative." The **Gokarna coastline** tile uses the real `rudra-coast.jpeg`, not stock. | Alt text only, with no visible note. |

Minor points I'll just handle unless you object:
- The hero chip "Gokarna Beach pick-up" and the trust item "Pick-up from Gokarna Beach" say the same thing (both are in the spec). With every other trust item `null`, the strip will show **one** item. It renders as a slim centred line and grows as you fill in `site.ts`.
- The **guest stepper caps at 20** (from the spec). That's a UI limit, not a stated capacity. `maxGuests` stays `null` and nothing on the page claims a capacity.
- **Gallery "View all":** after the de-duplication there are exactly 6 unique items (3 images + clips 01/04/05). "View all" opens the lightbox at item 1. If you add more media later, the grid still shows 6 and the lightbox holds the rest.
- The booking-form **date `min`** is set on the client after mount. A static build would otherwise freeze "today" at build time.

---

## 3. Target file tree

```
app/
  layout.tsx          REWRITE  fonts (Fraunces + Inter via next/font), metadata, JSON-LD, Navbar/MobileBar/Footer
  page.tsx            REWRITE  composes the 10 sections in order
  globals.css         REWRITE  Tailwind @theme tokens, 2 glass utilities, base, focus, motion
  sitemap.ts          REWRITE  single URL from NEXT_PUBLIC_SITE_URL
  robots.ts           REWRITE  same base URL
  about/ adventures/ contact/ gallery/ guides/ new-year/ packages/   DELETE (D1)
  icon.png apple-icon.png favicon.ico                                KEEP
data/
  site.ts             NEW      all typed content (section 4)
lib/
  whatsapp.ts         NEW      buildWhatsAppLink(message) + per-context message builders
  url.ts              NEW      siteUrl() from NEXT_PUBLIC_SITE_URL, fallback https://therudragokarna.vercel.app
  seo.ts              NEW      JSON-LD builders (LocalBusiness, ItemList<TouristTrip>, FAQPage)
  hooks.ts            NEW      useInView / useActiveSection (IntersectionObserver), useMediaQuery
  site.ts confirm.ts siteInfo.ts packages.ts experiences.ts places.ts faq.ts images.ts guides.ts metadata.ts   DELETE (moved into data/site.ts)
components/
  ui/Button.tsx       NEW      3 variants: primary | secondary | text; 48 px; renders <a> or <button>
  ui/Container.tsx    NEW      max 1200 px, 16/24/32 px gutters
  ui/Section.tsx      NEW      tone="navy" | "sand", id, labelled H2, 64/112 px padding
  ui/Dialog.tsx       NEW      native <dialog> wrapper: modal, Esc, focus trap, return focus, variants sheet | fullscreen | popover
  ui/Reveal.tsx       REWRITE  CSS fade-up 16 px once via IntersectionObserver; off for reduced motion
  ui/Accordion.tsx    REWRITE  <details name="faq"> exclusive accordion (zero JS, keyboard native)
  ui/Media.tsx PhoneActions.tsx SectionHeading.tsx   DELETE
  layout/Navbar.tsx   REWRITE  64 px fixed, glass-dark→glass-light after hero, active-section highlight
  layout/MobileMenu.tsx NEW    full-screen glass sheet (Dialog), 48 px links
  layout/MobileBar.tsx  NEW    <768 px only, Call + WhatsApp, shows after hero, hides at #book/footer, safe-area
  layout/Footer.tsx   REWRITE  3 columns + bottom bar
  layout/BookingBar.tsx   DELETE
  sections/Hero.tsx + HeroMedia.tsx (client)   NEW
  sections/TrustStrip.tsx                      NEW
  sections/Packages.tsx + PackageCard.tsx + CompareTable.tsx   NEW (replaces PackagesSection.tsx)
  sections/Experiences.tsx (tabs + bento + tile Dialog)        NEW (replaces ExperienceGrid + PlacesSection)
  sections/BoatViewer.tsx                      NEW (replaces BoatScroll.tsx)
  sections/Gallery.tsx + Lightbox.tsx          NEW (replaces GalleryWall + VideoGallery)
  sections/BookingForm.tsx + Book.tsx          NEW (replaces PackagePlanner + ContactForm + ContactSection)
  sections/Events.tsx                          NEW (replaces CustomEventsSection)
  sections/FaqGoodToKnow.tsx                   NEW (replaces GoodToKnowSection + PackagesFaqSection)
  sections/HomeSections.tsx BoatScroll.tsx PackagePlanner.tsx ContactForm.tsx ContactSection.tsx
          ExperienceGrid.tsx PlacesSection.tsx GalleryWall.tsx VideoGallery.tsx PackagesSection.tsx   DELETE
scripts/
  optimize-assets.mjs NEW      reproducible: sharp + ffmpeg-static, idempotent, prints a size report
  qa/screens.mjs      NEW      Playwright screenshots, overflow/overlap checks, document heights
  qa/axe.mjs          NEW      axe-core at 375 and 1440, menu/sheet/lightbox open states too
  qa/links.mjs        NEW      collects every wa.me/tel: href and checks number + decoded message; drives the form
  qa/lighthouse.mjs   NEW      mobile + desktop, 3 runs each, median
assets-src/           NEW      originals (D3)
OWNER_TODO.md         DELETE   its items move into data/site.ts as null + TODO(owner) and get listed in CHANGES.md
CHANGES.md            NEW      phase 7
next.config.ts        REWRITE  images config, redirects (D1)
package.json          EDIT     devDeps (D2), remove framer-motion, add "typecheck" and "qa:*" scripts
```

QA output (screenshots, reports) goes to `artifacts/`, which is already git-ignored.

---

## 4. `data/site.ts`: the data model

Everything the UI renders comes from here. Unknowns are `null` with a `// TODO(owner):` comment, and every component checks for `null` before rendering.

```ts
type HighlightId = "sightseeing" | "lighthouse" | "kayaking" | "snorkelling" | "swimming" | "dolphins"
  | "mystery-cave" | "fishing-harbour" | "sea-river" | "fishing-trips" | "bioluminescence"
  | "mangrove-views" | "mangrove-kayaking";

business   { name, tagline, description, url, logo, image, priceRange: null, rating: null, reviewCount: null,
             hours: null, geo: null, socials: null }                                   // TODO(owner) each
contact    { whatsapp: "919591556869", phones: [{ display, tel, label: "Call / WhatsApp", primary }, { …, "Alternate" }],
             pickup: { label: "Gokarna Beach, Gokarna, Karnataka", mapsUrl }, replyTime: null, email: null }
highlights Record<HighlightId, string>        // single source of labels; the comparison table is built from these
packages   [{ id, name, shortName, durationHours, featured, image, imageAlt, highlights: HighlightId[],
              price: null, maxGuests: null }]                                          // Premium, Standard, Exclusive, River Trips
activities [{ id, title, description, image, alt, highlightIds, note? }]               // 5; dolphins note "Sightings not guaranteed"
places     [{ id, title, description, image, alt, highlightIds }]                      // 6
trust      [{ id, label: string | null, icon }]                                        // rating, safety, crew = null; pick-up always
events     { copy, pills: ["Couples", "Family", "New Year", "Other occasions"], message }
goodToKnow [{ icon, text }] × 4
faq        [{ question, answer }] × 4                                                   // answers only from the content in this brief
gallery    [{ kind: "image" | "video", src, poster?, alt/caption, width, height }] × 6
boat       [{ id, label: "Front quarter" | "Side" | "Rear side" | "Front", src, alt: "Design render of the boat, side view" }]
hero       { posterSrc, videoSources: { "1080": {mp4, webm}, "720": {mp4, webm} } }
pending    { licence, capacity, cancellationPolicy, season, bioluminescenceTiming, crewAbout, vectorLogo }: null  // from OWNER_TODO.md
```

"Included in: …" on activity and place tiles is **computed**: `packages.filter(p => p.highlights.some(h => item.highlightIds.includes(h)))`. Nothing is hard-coded.

---

## 5. Section notes (only where I'm making a call)

- **Section backgrounds** alternate between exactly two tones: Hero navy, Trust navy (attached to the hero), Packages sand, Experiences navy, Boat sand (the renders have light backgrounds), Gallery navy, Book sand, Events navy, FAQ sand, Footer navy.
- **Hero media:** server-render the next/image poster (eager, `fetchPriority="high"`, `sizes="100vw"`). A small client component mounts the `<video>` only when `(min-width:768px)`, motion isn't reduced and `!navigator.connection?.saveData`. It picks 1080p or 720p by viewport width × DPR, puts WebM before MP4, and fades in on `playing`. The video has no `poster` attribute, so the image isn't downloaded twice.
- **Book section:** sand background. On desktop the glass-light card overlaps a lazy-loaded real photo, so the blur has something to show. On mobile the photo is hidden and the card is effectively white. It's a 3-step wizard with Back/Next and a 3-dot progress bar. Each step validates before advancing, to keep the mobile height down.
- **Phone validation:** strips spaces and dashes, then accepts `^(?:\+?91|0)?[6-9]\d{9}$`. The message is a multi-line block (package or custom places + hours, date, guests, name, phone). Submit calls `window.open(wa.me…)` and shows "Opening WhatsApp…" in an `aria-live` region, plus a fallback link in case a popup blocker stops it. It never says the message was sent.
- **Dialogs** (compare sheet on mobile, experience tile sheet, mobile menu, lightbox) all use one native `<dialog>` wrapper. `showModal()` makes the rest of the page inert, Esc closes, and focus returns to the opener explicitly.
- **Tabs:** WAI-ARIA tabs with roving tabindex and ←/→/Home/End keys.
- **Bento:** Activities (5) is one 2×2 tile plus 4 small ones. Places (6) is two wide tiles plus 4 small ones, so the 4×2 grid stays rectangular. Mobile uses a 2-column grid of square tiles.
- **Motion:** no framer-motion. CSS transitions plus an IntersectionObserver that adds `.is-in` once. Content only hides when the `html.js` class is set, so it's visible without JS and the hero is never hidden.
- **Number of WhatsApp CTAs:** hero 1, package cards 4, boat 1, form 1, events 1, footer 1, mobile bar 1. The navbar "Book now" scrolls to `#book`.

### Page-height budget (my estimate, to check in QA)
| | Mobile 375 | Desktop 1440 |
| --- | --- | --- |
| Hero + trust | 870 | 960 |
| Packages | 870 | 900 |
| Experiences | 900 | 980 |
| Boat | 650 | 740 |
| Gallery | 850 | 850 |
| Book | 900 | 820 |
| Events | 400 | 350 |
| FAQ + Good to know | 930 | 620 |
| Footer | 600 | 350 |
| **Total** | **≈ 7,970 (target ≤ 8,500)** | **≈ 6,570 (target ≈ 6,300)** |

Desktop is tight against the spec's 112 px section padding. If QA comes in over, I'll trim intro copy and card heights first and leave the padding alone.

---

## 6. Next 16 specifics I'll follow
- Use `loading="eager"` + `fetchPriority="high"` (or `preload` alone), not `priority` (deprecated in 16).
- `images`: `formats: ["image/avif","image/webp"]`, `deviceSizes: [640, 750, 828, 1080, 1200, 1920]` (so a 3840 request can't happen), `imageSizes: [32, 48, 64, 96, 128, 256, 384]`, `qualities: [60, 75]` (required in 16).
- The ESLint CLI (`eslint .`) is already used; `next lint` is gone in 16.
- Keep `next build --webpack` as it is. The baseline is clean with it and switching bundlers is out of scope.
- JSON-LD goes in a `<script type="application/ld+json">` in `layout.tsx`/`page.tsx` with `<` escaped, following the bundled guide.

---

## 7. Phases (branch `redesign`, one commit per phase, `npm run build` + lint + `tsc` clean after each)

| Phase | Work | Files |
| --- | --- | --- |
| **1 Design system** | Tokens in `@theme`, Fraunces + Inter, the 2 glass utilities with `@supports` fallback, focus ring, reduced motion. `Button`, `Container`, `Section`, `Dialog`, `Reveal`. `data/site.ts`, `lib/whatsapp.ts`, `lib/url.ts`, `lib/hooks.ts`. The old page still renders (the old CSS stays until phase 4). | `app/globals.css`, `app/layout.tsx` (fonts only), `components/ui/*`, `data/site.ts`, `lib/*` (new) |
| **2 Shell** | Navbar + MobileMenu, Hero + HeroMedia (current assets for now), TrustStrip, Footer, MobileBar. Remove BookingBar. | `components/layout/*`, `components/sections/{Hero,HeroMedia,TrustStrip}.tsx`, `app/layout.tsx`, `app/page.tsx` |
| **3 Core content** | Packages + PackageCard + CompareTable (carousel, dots, sheet/inline). Experiences (tabs, bento, tile dialog). BoatViewer. Delete the old comparison section. | `components/sections/{Packages,PackageCard,CompareTable,Experiences,BoatViewer}.tsx`, `app/page.tsx` |
| **4 Conversion + cleanup** | Gallery + Lightbox, Book + BookingForm, Events, FaqGoodToKnow. Delete all old sections and components, old `lib/*`, secondary routes + redirects (D1), `OWNER_TODO.md`, framer-motion. | `components/sections/*`, `app/*/page.tsx` (delete), `lib/*` (delete), `next.config.ts`, `package.json` |
| **5 Assets** | Install tools (D2). `scripts/optimize-assets.mjs`: hero poster 828/1600 WebP+AVIF ≤120 KB, hero loop 8–10 s 1080p ≤3 MB + 720p ≤1.5 MB (MP4 + WebM, `-an`, faststart), coast/showcase ≤1600w ≤250 KB, clips 01/04/05 ≤3 MB + WebP posters, OG 1200×630, logo variants. Move the originals (D3). Audit `sizes` on every next/image and set the `next.config` images block. | `scripts/optimize-assets.mjs`, `assets-src/`, `public/**`, `data/site.ts` (paths), `next.config.ts` |
| **6 SEO** | Title, ~150-char description, OG/Twitter + `twitter:image:alt`, canonical from `NEXT_PUBLIC_SITE_URL`. JSON-LD: LocalBusiness (PostalAddress, both phones, image, url; priceRange/openingHours/geo/sameAs only when non-null), ItemList of TouristTrip, FAQPage. `sitemap.ts`, `robots.ts`. | `app/layout.tsx`, `app/page.tsx`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts` |
| **7 QA + CHANGES.md** | Build/lint/types clean. Playwright screenshots at 360/390/768/1024/1440 with overflow and overlap checks, plus heights at 375×812 and 1440×900. Lighthouse mobile + desktop against `next start` (median of 3), fixing anything under 95. axe at zero serious/critical, including open menu, sheet and lightbox. Every wa.me/tel link and the form's message output checked. `CHANGES.md`: every audit item → fix, every remaining TODO(owner), and a target-vs-achieved table. | `scripts/qa/*`, `CHANGES.md` |

## 8. Risks
- **Lighthouse on this Windows laptop is noisy.** I'll report the median of 3 runs and say so. Simulated "Slow 4G" in Lighthouse is harsher than real 4G, so LCP under 2.0 s there is a conservative check.
- **Hero poster ≤120 KB at 1600w:** the photo is hazy and low-contrast, so AVIF should get well under. WebP may need quality ~60, which is why `qualities` includes 60.
- **Hero loop length:** I'll confirm clip 03's duration with ffprobe and pick the 8–10 s segment that loops most cleanly. If it can't be cut seamlessly, I'll use a short crossfade at the loop point.
- **The desktop height target** may need copy trims (section 5).
