# Redesign changes — Rudra Gokarna Adventures

Branch `redesign`, seven phases (plus your hero change in `c3666da`; the Phase 7 work in progress was committed in `af41608`). Every number below was measured on a production build (`npm run build && npx next start`) with the scripts in `scripts/qa/`. Raw reports go to `artifacts/qa/` (git-ignored).

## Results: target vs achieved

| Target | Achieved | |
| --- | --- | --- |
| Mobile page ≈ 10 screens (≤ ~8,500 px at 375×812) | **7,385 px** (9.1 screens). Booking starts at 4,364 px (was ~22 screens down) | ✅ |
| Desktop ≈ 7 screens at 1440×900 | **6,369 px** (7.1 screens), with 96 px section padding | ✅ |
| LCP < 2.0 s on mobile 4G | **0.87 s home, 1.05 s /packages, 0.93 s /adventures** measured with real DevTools throttling (9 Mbps / 1.5 Mbps, 165 ms latency, 4× CPU). Lighthouse's default *simulated* Slow 4G (1.6 Mbps, 150 ms RTT) estimates 2.5–2.9 s; see the note below | ✅ on 4G, ⚠️ simulated |
| CLS < 0.05 | **0.000** on every page and preset | ✅ |
| INP < 200 ms | Worst of 18 real interactions **160 ms** at 4× CPU (Event Timing; lab stand-in, since Lighthouse can't measure INP) | ✅ |
| Initial transfer < 1 MB (excl. hero video) | **724 KB** phone, **637 KB** desktop. There's no hero video now | ✅ |
| Lighthouse 95+ (desktop) | **100 / 100 / 100 / 100** (Performance / Accessibility / Best Practices / SEO) on `/`, `/packages`, `/adventures` | ✅ |
| Lighthouse 95+ (mobile) | Accessibility, Best Practices, SEO **100** on all pages. Performance median: `/packages` **97**, `/adventures` **97**, home **94** (7 runs: 75, 91, 93, 94, 95, 95, 97) | ⚠️ home 1 point short |
| WCAG AA contrast everywhere | axe: 0 contrast issues. Muted text on navy 11.7:1, on navy-700 8.9:1, on sand 7.0:1; navy on gold 9.2:1 | ✅ |
| Tap targets ≥ 44 px | 0 interactive elements under 44×44 (3 pages × 6 widths) | ✅ |
| Text ≥ 14 px, body 16–18 px | 0 text nodes under 14 px | ✅ |
| No horizontal scroll at 360 px | 0 px overflow at 360, 375, 390, 768, 1024 and 1440 | ✅ |
| Booking reachable in one tap | Navbar "Book" at every width, plus the phone bottom bar (Call / WhatsApp) | ✅ |
| One primary CTA per section | One gold button per section; the rest are secondary or text links | ✅ |
| axe: zero serious/critical | **0 issues at any impact** across 15 scans (pages + open menu, sheets, lightbox, form errors) | ✅ |
| Build, lint, type-check | `next build` 0 warnings, `eslint --max-warnings=0` clean, `tsc --noEmit` clean | ✅ |
| WhatsApp links and booking form | 39/39 checks: all 38 wa.me links use 917019745857 with a message, all 16 tel: links are +917019745857, all 10 pick-up links use the Maps short link in a new tab; booking-form output verified for package and custom trips | ✅ |

**About mobile Performance and simulated LCP.** Lighthouse's default mobile run doesn't throttle the page; it *simulates* Slow 4G from a fast local trace. It counts every script that starts running before the first paint as render-blocking. On `localhost` the ~130 KB of Next.js/React JavaScript downloads before the first paint, so the simulation adds roughly a second to LCP. On a real network the HTML, CSS and hero image paint first: with real 4G throttling LCP is under 1 s on all three pages. Scores on this Windows laptop also swing from run to run (one home run scored 75 on an unchanged build), so treat single runs with caution. Running PageSpeed Insights against the deployed site (HTTP/2, real network) is the most representative check.

Real-4G measurements (3 runs each, median): home LCP 0.87 s (FCP 0.82 s), `/packages` LCP 1.05 s, `/adventures` LCP 0.93 s; CLS 0 throughout. This mode also applies the 4× CPU slowdown for real on this laptop (headless, software rendering), so its Total Blocking Time (354–450 ms) is harsher than the simulated run's 90–160 ms.

## Audit items and how each was fixed

| # | Audit finding | Fix |
| --- | --- | --- |
| 1 | Header transparent with no blur; logo overlaps headings while scrolling | Fixed 64 px navbar: `.glass-dark` over the hero, `.glass-light` after it (IntersectionObserver), with a solid fallback where `backdrop-filter` isn't supported. `scroll-padding-top: 80px`, so anchored headings land clear of the bar. |
| 2 | Page far too long (~25 screens on a phone, ~18 on desktop); contact ~22 screens down | 14 home sections → 9. The comparison, places, planner, intro, video wall and contact sections merged or went away. Home is now 7,385 px at 375×812 and 6,369 px at 1440×900. Booking starts at 4,364 px on a phone and is one tap away from anywhere (navbar "Book", mobile bar). |
| 3 | Premium card 1200×790 full width, others stacked; packages 3.8 phone screens | Four equal cards (Premium gets a gold ring and "Most popular" badge, same size). Scroll-snap carousel at 85vw on phones with dot buttons; four columns from 1024 px. |
| 4 | Floating "Book on WhatsApp" bar (760 px) covers content | Removed. Phones get a 56 px glass Call / WhatsApp bar that hides over the hero, `#book` and the footer and respects the safe area. Nothing floats on desktop. |
| 5 | Scroll-pinned boat section blank and overlapping on phones | `.boat-scroll-stage`, its pinned logic and framer-motion are gone. Replaced by a static viewer: main render plus four thumbnail buttons that crossfade, labelled "Design render". |
| 6 | Subtitle `rgb(71,85,105)` on navy ≈ 1.5:1 | Muted text on navy is `#CBD5E1`: 11.7:1 on navy-900, 8.9:1 on navy-700. axe finds no contrast issues. |
| 7 | 5 section background colours, 6 button styles | Two section tones only (navy-900, sand-50). Three button variants (primary, secondary, text), all 48 px pills. Tailwind's default palette and type scale are cleared in `@theme`, so off-system colours and 12 px text can't be used. |
| 8 | Hero poster 698 KB, unoptimised; 5.1 MB hero video autoplays on every device | The hero is now your chosen still image, pre-sized AVIF/WebP at 828w and 1600w (67–112 KB), plus a 46 KB 3:4 phone crop, preloaded with `fetchpriority=high`. No video downloads at all. The desktop-only, pause-able loop (9 s, 1.0–2.0 MB, skipped on phones, reduced motion and Save-Data) is still in the code and comes back with one switch. |
| 9 | 10 of 25 images requested at w=3840 on a phone; `rudra-coast.jpeg` 1.5 MB | `images.deviceSizes` capped at 1920, so 3840 can't be requested. Every image has a measured `sizes`. Widest request on a phone is now 1080w. `rudra-coast.jpeg` is 242 KB (1200×1600). Portrait stock photos are cropped to 4:3 masters, so cards no longer download pixels CSS crops away. |
| 10 | All 25 images lazy, including logo and hero | Only the logo and hero poster load eagerly (hero preloaded at high priority). Everything else is lazy. |
| 11 | 55 of 100 interactive elements under 40 px; 11–13 px text; 12 px nav links | No interactive element under 44×44 at any of 6 widths on any page; inline links inside sentences are the WCAG exception. Smallest text 14 px, body 16–18 px, nav links 15 px. |
| 12 | ~20 WhatsApp CTAs, 14 "Enquire"; four identical boat "Enquire" links | 9 WhatsApp links on the phone home page (fewer on desktop, where there's no bottom bar), all through `buildWhatsAppLink()` with a context-specific message: hero, one per package (accessible names say which package), boat, events, footer, mobile bar. The booking form opens WhatsApp itself. One primary CTA per section. |
| 13 | Three overlapping forms (planner, enquiry, booking bar) with duplicate fields | One 3-step form in `#book`: trip chips (Custom reveals place chips and a 2/3/4-hour control), date (min today) and a 1–20 guest stepper, then name and an Indian mobile number. Inline errors, `aria-live` status, and it never claims the message was sent. |
| 14 | Duplicated content: activities repeated across cards, table, Places and Experiences; "Sightseeing around Gokarna" heading twice | One highlights dictionary drives cards, comparison (now behind "Compare all packages"), tiles and the FAQ. Experiences and Places merged into one tabbed section. "Included in" is computed from package data. No heading text repeats on any page (checked). |
| 15 | Guests shown as "—" on packages and in the planner | Stepper starts at 2 (1–20). The package "guests" line is hidden while `maxGuests` is null. |
| 16 | Stock images with "Representative…" alt under a heading claiming photos of the boat; clip 03 duplicates the hero | Alt text describes each scene (checked against the actual crops; river-trips alt corrected). A visible note says activity and place photos are illustrative. The gallery holds owner media only and nothing repeats the hero: two photos plus clips 01, 03, 04 and 05, each with a caption describing what it shows. Clip 02 (a byte-identical copy of clip 01) is dropped. |
| 17 | `<title>` "Gokarna boat adventures"; no `twitter:image:alt`; minimal LocalBusiness JSON-LD | Title "Gokarna Boat Trips, Kayaking & Dolphin Tours \| Rudra Gokarna Adventures", 154-character description, OG/Twitter with a real 1200×630 image and `og:image:alt` / `twitter:image:alt`. JSON-LD: LocalBusiness (PostalAddress, both phones, image, logo, map; price range, hours, geo, sameAs and postcode added automatically once filled in), an ItemList of TouristTrip, FAQPage, breadcrumbs. `sitemap.xml` and `robots.txt`; canonical from `NEXT_PUBLIC_SITE_URL`. |

## Updates after the redesign

- **Developer credit (`fd0b874`):** the footer's bottom bar shows "Designed & developed by Dishan Web Wings", linked to the agency site in a new tab. The text lives in `data/site.ts` under `footer.credit`.
- **Contact details:** the business now has **one number for calls and WhatsApp, +91 70197 45857**. Both previous numbers, and the "Alternate" row they needed, are gone from the site, the JSON-LD and the QA script. With one number, the Book section shows it without repeating its "Call or WhatsApp" heading. LocalBusiness `telephone` is the single string `+917019745857`.
- **Pick-up map:** every pick-up link (footer, Book section, and the trust strip's "Pick-up from Gokarna Beach", which is now a link) goes to the Google Maps pin `https://maps.app.goo.gl/s4jSzvA6cUZmsFzZ6` in a new tab with `rel="noopener"`. The same URL is the LocalBusiness `hasMap`.

## Decisions and deviations from the brief

- **Secondary pages (D1, as approved):** `/packages` and `/adventures` kept and restyled with their own title, description and JSON-LD, linked from the home sections. `/contact`, `/about`, `/gallery`, `/new-year` and `/guides` 308-redirect to the matching home anchor.
- **Hero (your change in `c3666da`):** a still image (the boat on blue water), no background video. I kept that and only made it reproducible: `scripts/optimize-assets.mjs` builds the `hero-blue-*` files from `assets-src/images/rudra-boat-showcase.jpeg` within the 120 KB cap, with a 50 KB budget for the phone crop because it's the phone LCP image. The source is 1600×901, so the phone crop is its native 676px wide; the earlier 828/1242 crops were upscaled copies of it. The 1600w WebP needs quality 30 to fit (very detailed image), but it's only a fallback, since every supported browser gets the AVIF.
- **Gallery after the hero change:** the showcase photo left the gallery (it's the hero now), and clip 01 joined it, since it no longer duplicates anything. The unused hero-loop videos are no longer generated or deployed.
- **If the video comes back:** set `HERO_VIDEO = true` in the script and fill `hero.video`. The loop is cut from clip 01, the only landscape clip; clip 03 is a portrait cave walk that would crop badly. Every supplied clip is 720p and the script never upscales, so the loop would be 720p + 540p (1080p automatically from a 1080p source).
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

- **Prices:** `price` for each package. The card shows "From ₹X" once set.
- **Group sizes:** `maxGuests` per package (the "Up to N guests" line appears once set) and the licensed `capacity`.
- **Rating and reviews:** `business.rating`, `business.reviewCount`, and the trust-strip "rating" label.
- **Safety and crew:** trust-strip "safety" and "crew" labels, `boatLicence`, `crewAbout`.
- **Contact:** `replyTime`, business `email`, pick-up `postalCode`, exact `geo` pin.
- **Opening hours** (`openingHours`, schema.org format) and **price range** (`priceRange`).
- **Social links:** `socials` (Instagram, Google Maps listing, Facebook). They also feed `sameAs`.
- **Policies and timing:** `cancellationPolicy`, `season` (incl. monsoon closure), `bioluminescenceTiming`.
- **Hero image (D4):** confirm whether `rudra-boat-showcase.jpeg` (now the hero) is a photograph or a render. The alt text stays neutral until then.
- **Media:** a vector logo (`vectorLogo`), higher-resolution boat renders (`boatRenders`), real trip photos to replace the illustrative stock images (`tripPhotos`), and a larger hero source (`heroClip`) if the video background ever comes back.

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
