# Redesign changes — Rudra Gokarna Adventures

Branch `redesign`, seven phases, one commit each. Every number below was measured on a production build (`npm run build && npx next start`) with the scripts in `scripts/qa/`. Raw reports go to `artifacts/qa/` (git-ignored).

## Results: target vs achieved

{{RESULTS}}

## Audit items and how each was fixed

| # | Audit finding | Fix |
| --- | --- | --- |
| 1 | Header transparent with no blur; logo overlaps headings while scrolling | Fixed 64 px navbar: `.glass-dark` over the hero, `.glass-light` after it (IntersectionObserver), with a solid fallback where `backdrop-filter` isn't supported. `scroll-padding-top: 80px`, so anchored headings land clear of the bar. |
| 2 | Page far too long (~25 screens on a phone, ~18 on desktop); contact ~22 screens down | 14 home sections → 9. The comparison, places, planner, intro, video wall and contact sections merged or went away. Home is now {{H375}} px at 375×812 and {{H1440}} px at 1440×900. Booking starts at {{BOOK375}} px on a phone and is one tap away from anywhere (navbar "Book", mobile bar). |
| 3 | Premium card 1200×790 full width, others stacked; packages 3.8 phone screens | Four equal cards (Premium gets a gold ring and "Most popular" badge, same size). Scroll-snap carousel at 85vw on phones with dot buttons; four columns from 1024 px. |
| 4 | Floating "Book on WhatsApp" bar (760 px) covers content | Removed. Phones get a 56 px glass Call / WhatsApp bar that hides over the hero, `#book` and the footer and respects the safe area. Nothing floats on desktop. |
| 5 | Scroll-pinned boat section blank and overlapping on phones | `.boat-scroll-stage`, its pinned logic and framer-motion are gone. Replaced by a static viewer: main render plus four thumbnail buttons that crossfade, labelled "Design render". |
| 6 | Subtitle `rgb(71,85,105)` on navy ≈ 1.5:1 | Muted text on navy is `#CBD5E1`: 11.7:1 on navy-900, 8.9:1 on navy-700. axe finds no contrast issues. |
| 7 | 5 section background colours, 6 button styles | Two section tones only (navy-900, sand-50). Three button variants (primary, secondary, text), all 48 px pills. Tailwind's default palette and type scale are cleared in `@theme`, so off-system colours and 12 px text can't be used. |
| 8 | Hero poster 698 KB, unoptimised; 5.1 MB hero video autoplays on every device | Poster is pre-sized AVIF/WebP: 24–102 KB landscape, and a 42 KB 3:4 crop for phones, preloaded with `fetchpriority=high`. The video is desktop-only (not on phones, reduced motion or Save-Data), starts after `load`, is a 9 s silent loop of 1.0–2.0 MB, and has a pause button (WCAG 2.2.2). |
| 9 | 10 of 25 images requested at w=3840 on a phone; `rudra-coast.jpeg` 1.5 MB | `images.deviceSizes` capped at 1920, so 3840 can't be requested. Every image has a measured `sizes`. Widest request on a phone is now {{MAXW375}}w. `rudra-coast.jpeg` is 242 KB (1200×1600). Portrait stock photos are cropped to 4:3 masters, so cards no longer download pixels CSS crops away. |
| 10 | All 25 images lazy, including logo and hero | Only the logo and hero poster load eagerly (hero preloaded at high priority). Everything else is lazy. |
| 11 | 55 of 100 interactive elements under 40 px; 11–13 px text; 12 px nav links | No interactive element under 44×44 at any of 6 widths on any page; inline links inside sentences are the WCAG exception. Smallest text 14 px, body 16–18 px, nav links 15 px. |
| 12 | ~20 WhatsApp CTAs, 14 "Enquire"; four identical boat "Enquire" links | {{WACOUNT}} WhatsApp links on the phone home page (fewer on desktop, where there's no bottom bar), all through `buildWhatsAppLink()` with a context-specific message: hero, one per package (accessible names say which package), boat, events, footer, mobile bar. The booking form opens WhatsApp itself. One primary CTA per section. |
| 13 | Three overlapping forms (planner, enquiry, booking bar) with duplicate fields | One 3-step form in `#book`: trip chips (Custom reveals place chips and a 2/3/4-hour control), date (min today) and a 1–20 guest stepper, then name and an Indian mobile number. Inline errors, `aria-live` status, and it never claims the message was sent. |
| 14 | Duplicated content: activities repeated across cards, table, Places and Experiences; "Sightseeing around Gokarna" heading twice | One highlights dictionary drives cards, comparison (now behind "Compare all packages"), tiles and the FAQ. Experiences and Places merged into one tabbed section. "Included in" is computed from package data. No heading text repeats on any page (checked). |
| 15 | Guests shown as "—" on packages and in the planner | Stepper starts at 2 (1–20). The package "guests" line is hidden while `maxGuests` is null. |
| 16 | Stock images with "Representative…" alt under a heading claiming photos of the boat; clip 03 duplicates the hero | Alt text describes each scene (checked against the actual crops; river-trips alt corrected). A visible note says activity and place photos are illustrative. The gallery holds owner media only. The hero loop and gallery never share a clip, and clip 02 (a byte-identical copy of clip 01) is dropped. |
| 17 | `<title>` "Gokarna boat adventures"; no `twitter:image:alt`; minimal LocalBusiness JSON-LD | Title "Gokarna Boat Trips, Kayaking & Dolphin Tours \| Rudra Gokarna Adventures", 154-character description, OG/Twitter with a real 1200×630 image and `og:image:alt` / `twitter:image:alt`. JSON-LD: LocalBusiness (PostalAddress, both phones, image, logo, map; price range, hours, geo, sameAs and postcode added automatically once filled in), an ItemList of TouristTrip, FAQPage, breadcrumbs. `sitemap.xml` and `robots.txt`; canonical from `NEXT_PUBLIC_SITE_URL`. |

## Decisions and deviations from the brief

- **Secondary pages (D1, as approved):** `/packages` and `/adventures` kept and restyled with their own title, description and JSON-LD, linked from the home sections. `/contact`, `/about`, `/gallery`, `/new-year` and `/guides` 308-redirect to the matching home anchor.
- **Hero video source:** the loop is cut from **clip 01**, not clip 03. Clip 03 is a portrait phone video of a dark cave walk that would be cropped and blurred as a landscape background; clip 01 is the only landscape clip (a slow pan from a cove to the boat at sea). The gallery therefore shows clips 03, 04 and 05. Switching back is one constant in `scripts/optimize-assets.mjs` plus the paths in `data/site.ts`.
- **Hero loop resolution:** 720p plus a 540p version, not 1080p plus 720p. Every supplied clip is 1280×720, and the script never upscales. It produces 1080p and 720p automatically from a 1080p source.
- **Clip 05** encodes at 540×960 to stay under 3 MB (busy, glittering water barely compresses), instead of a very high CRF at full size.
- **Hero poster:** served from the pre-sized AVIF/WebP files via `getImageProps` in a `<picture>`, preloaded with React's `preload()`. Next 16 deprecates `priority`; this keeps the LCP bytes fixed and CDN-cached.
- **`<Img>` instead of `<Image>`:** `next/image`'s component hydrates every instance. `components/ui/Img.tsx` uses `getImageProps` (same optimiser URLs, `srcset`, `sizes`, lazy loading) on a plain `<img>`, which cut hydration work noticeably.
- **Focus ring (D5):** 2 px gold plus a navy halo. Gold alone on sand is 1.7:1; the navy halo is 16:1.
- **Desktop section padding:** 96 px instead of 112 px, after content trims, to bring home to about 7 screens. This is the floor you set.
- **Tried and reverted:** `experimental.inlineCss` made the mobile score worse (the CSS is then shipped twice: in the HTML and in the RSC payload) and prints an "Experiments" notice at build time.
- **Fraunces** loads one static weight (600, the only display weight used) instead of the variable font.
- **`browserslist`** is set to Tailwind v4's own browser floor (Chrome/Edge 111, Firefox 128, Safari 16.4).
- **Logo:** stays PNG (no vector source exists, and tracing would lose quality), 40 px tall, eager, explicit size.

## Remaining TODO(owner)

All live in `data/site.ts` as `null`. The UI and JSON-LD ignore them until filled in.

{{TODOS}}

## How to re-run the checks

```bash
npm run build && npx next start -p 3100
node scripts/qa/screens.mjs      # screenshots at 360–1440, overflow, overlaps, tap targets, text size, headings, heights
node scripts/qa/axe.mjs          # axe-core WCAG 2.2 AA, pages plus open menu/sheets/lightbox/form errors
node scripts/qa/links.mjs        # every wa.me/tel link, booking form output, dialogs and keyboard
node scripts/qa/network.mjs      # initial transfer and image widths
node scripts/qa/inp.mjs          # interaction latency at 4× CPU
QA_RUNS=5 node scripts/qa/lighthouse.mjs                       # mobile + desktop
QA_PRESETS=mobile-4g node scripts/qa/lighthouse.mjs            # real 4G throttling
npm run optimize-assets          # rebuild public/ media from assets-src/
```
