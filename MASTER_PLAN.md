# Master plan: SEO, answer engines and technical quality

Status: **Phase 0, waiting for approval.** Nothing has been edited apart from this file and `OWNER_QUESTIONS.md`.
Site: https://www.therudraadventure.com · deploys from `main` via Vercel's GitHub integration.

---

## 1. What Phase 0 found

| Area | Finding | Phase |
| --- | --- | --- |
| **Hidden content (critical)** | The live home page HTML has **7 `<div hidden id="S:n">` blocks revealed by `$RC` scripts**. The footer comes *before* the packages section in the raw HTML (byte 15,753 vs 21,855). Crawlers that don't run JavaScript see every section after the hero hidden and out of order. Cause: the `<Suspense>` boundaries I added in the redesign's Phase 7 to cut mobile TBT (6 in `app/page.tsx`, 1 in `app/layout.tsx`). | 1a |
| Content only after interaction | Activity and place descriptions exist only inside the tile dialog, so they're not in the HTML. Gallery captions exist only in the lightbox. The home comparison table renders only when opened (it is server-rendered on `/packages`). FAQ answers are in the HTML but collapsed. | 1b, 2d, 4 |
| Thin content | Home has no About copy. Package cards list highlights but no description. Tiles show a title only. Five FAQs. | 1b |
| Security headers | The live site sends only Vercel's default `Strict-Transport-Security`. No CSP, X-Frame-Options, nosniff, Referrer-Policy or Permissions-Policy. | 2a |
| Titles/descriptions | Home title is 72 chars, description 154 chars. The other pages are within limits. No automated check. | 2b |
| Image weight | `brand/` PNGs are 124–932 KB (logo 644 KB, emblem 412 KB). `app/icon.png` is 125 KB. Eight stock WebPs are 160–396 KB. `rudra-coast.jpeg` and `rudra-boat-showcase.jpeg` are 244 KB. | 2c |
| Unused public files | `brand/rudra-gokarn-adventures-logo.png` (932 KB), `brand/rudra_gokarna_favicon_no_R.png`, `images/rudra-boat-showcase.jpeg` (the hero now uses the `hero-blue-*` files), `images/stock/place-sightseeing.webp`, and the three credit/verify `.md` files (served publicly from `/images`). | 2c |
| Alt text | Gallery grid images and video posters use `alt=""` with the description in the button's `aria-label`. The Book photo is decorative `alt=""`. | 2d |
| Outbound links | wa.me and Maps links use `rel="noopener noreferrer"` or `"noopener"`, with no `nofollow`. | 2e |
| 404 | Default Next.js 404 page. | 2f |
| Routes | `/`, `/packages`, `/adventures`. `/guides` 308-redirects to `/`; it will point to the guide hub instead. | 3, 5 |
| Structured data | LocalBusiness, ItemList of TouristTrip, FAQPage and BreadcrumbList already come from data. No Organization, Article, Dataset, areaServed or knowsAbout. | 6a |
| Crawlers/feeds | Sitemap has 3 URLs and no images or lastModified. robots.txt allows `*`. No llms.txt, IndexNow or analytics. | 6 |
| Tooling | QA scripts exist (`scripts/qa/*`): screens, axe, links, network, inp, lighthouse. No `.github/` yet. | 8 |

---

## 2. Trade-offs and decisions I need from you

| # | Topic | My recommendation |
| --- | --- | --- |
| **A1** | **Removing `<Suspense>` (1a) costs mobile TBT.** Those boundaries took the mobile Lighthouse median from ~94 to ~96. Without them, React hydrates in one longer task. | Remove them (correct content for crawlers matters more). Offset the cost by shipping less client JS: the home comparison table and lightbox load on first use via `next/dynamic` and need no JS until opened, and some small client islands get trimmed. If mobile Performance still lands below 95 (median of 3), I'll report the number honestly rather than bring the boundaries back. |
| **A2** | **GA4 and Lighthouse.** `gtag.js` (~90 KB) with `afterInteractive` typically costs 2–5 mobile Performance points. That would break rule 5 once `NEXT_PUBLIC_GA_ID` is set. | Load GA4 with `strategy="lazyOnload"` (after the page has loaded). Events still fire, because clicks are queued in `dataLayer`. Phase 8's Lighthouse runs measure **with** a GA ID set, so the cost is visible. Say if you specifically want `afterInteractive`. |
| **A3** | **Page length.** About section + package descriptions + tile lines + visible FAQ answers. Home on a phone grows from ~7,400 px to an estimated ~10,000–11,000 px (over the redesign's ~8,500 px target). | Accept it: the new goal favours content. I'll keep sections tight and keep the desktop FAQ in two columns. |
| **A4** | **"First FAQ open" (1b) vs "visible, not collapsed-only" (4).** | Phase 1 opens the first `<details>`. Phase 4 replaces the accordion with visible question headings (H3) and answers on every page. |
| **A5** | **Branded OG images (6c)** need a TTF font, because `next/og` doesn't accept woff2. | Download **Fraunces SemiBold TTF** (SIL Open Font License) once from the google/fonts GitHub repo, about 150 KB, into `assets/fonts/`, committed. Alternative: the default `next/og` font, with no download but no brand serif. |
| **A6** | **Landing-page and guide copy length (3, 5).** With prices, timings, routes and ages unknown, 600–900 *honest* words per page is a stretch. | Write from known facts plus true general guidance (what to carry, sea-state caveats, what bioluminescence is). Pages may land at the low end (~600) until you answer `OWNER_QUESTIONS.md`. Missing facts never show as placeholders: they're `null` and the line is hidden. Everything goes to `SEO_COPY.md` for your approval (Phase 7) before the final copy commit. |
| **A7** | **Nav link to the guide hub.** Desktop nav has 6 anchors and a "Book now" pill. A 7th may not fit at 1024 px. | Add "Guide" to the footer, the home page (FAQ section) and the mobile menu. Add it to the desktop nav only from 1280 px, if it fits there. |
| **A8** | **Deleting unused public files (2c).** `images/rudra-boat-showcase.jpeg` was the *old* site's `og:image` URL, so old social shares lose their preview until re-scraped. | Delete it (the original stays in `assets-src/`). Move the credit/verify `.md` files from `public/` to `assets-src/` rather than deleting them. |
| **A9** | **`upgrade-insecure-requests` in the CSP** can upgrade `http://localhost` asset requests during local QA. | Apply the CSP when `NODE_ENV=production` and `VERCEL_ENV` isn't `preview`/`development`. Local QA sets a flag to leave out `upgrade-insecure-requests` only, and Phase 2 checks the live headers on the deployed site. |
| **A10** | **Screaming Frog.** I only have the findings listed in your brief. | If you can share the SF export (Issues tab CSV), I'll cross-check every row in Phase 8. Otherwise CHANGES.md maps the items in your brief, plus the expected "image size attributes" (next/image `fill`) and "multiple H2" notes. |

---

## 3. Data model additions

All content stays in typed data files; components only render.

**`data/site.ts`** (extended)

```ts
about: { title, paragraphs: string[], canonical: string /* ~60 words, owner-approved */, image, cta }
business += { foundingDate: null, slogan: null, knowsAbout: string[], areaServed: ["Gokarna", "Uttara Kannada, Karnataka"],
              sameAs (socials: googleBusinessProfile, instagram, tripadvisor: null each) }
contact.pickup += { geo: null /* exact pin */, directions: { busStand: null, railwayStation: null, parking: null } }
packages[i] += { description, bestFor, timings: null, minAge: null, maxGuests: null (exists), price: null (exists),
                 included: string[] | null, whatToCarry: string[], landingSlugs: string[] }
activities/places[i] += { description (visible), landingSlug?: string }
faq[i] = { question, answer: string | null /* null hides it */, detail?: string }
season: { months: null, monsoonClosure: null }, bioluminescence: { timing: null }, safety: { gear: null, nonSwimmers: null, kids: null }
policies: { cancellation: null, weather: "Trips depend on sea and weather conditions." /* known */ }
pages: { home | packages | adventures: { answerSummary, keyFacts, updatedAt } }
```

**`data/seo-pages.ts`**: the 7 landing pages (slug, h1, title, description, primaryKeyword, answerSummary, keyFacts, sections, faqs, relatedSlugs, heroImage, gallery, whatsappMessage, updatedAt). `sections.*` that depend on unknown facts are `null`.

**`data/guides.ts`**: the hub and three guides, plus the prices guide (built only when a price exists). Each has `datePublished`, `updatedAt` and sections with `answer`, `detail` and `href`.

**`data/sightings.ts`**: `[]` with a `TODO(owner)` showing the format `{ month: "2026-12", trips, tripsWithSightings, notes }`.

---

## 4. Files to add or change

```
app/page.tsx                 1a remove <Suspense>; 1b About section; 4 AnswerSummary/KeyFacts/visible FAQ
app/layout.tsx               1a remove <Suspense>; 6g GA4 (lazyOnload, only with NEXT_PUBLIC_GA_ID) + click tracker
app/not-found.tsx            2f NEW: 404 with links to /packages, /adventures and the landing pages
app/[slug]/page.tsx          3  NEW: landing template; generateStaticParams from seo-pages.ts; dynamicParams = false
app/guides/[slug]/page.tsx   5  NEW: guide template (hub, reach, best time, prices*, sighting log*); *only when data exists
app/**/opengraph-image.tsx   6c NEW: 1200×630 via next/og (navy + gold, page H1); root, packages, adventures, [slug], guides/[slug]
app/sitemap.ts               6b every page + lastModified from updatedAt + images
app/robots.ts                6d "*" plus explicit groups for the 11 named crawlers
app/llms.txt/route.ts        6f NEW: static text route (about.canonical plus key links)
app/packages, app/adventures 4  AnswerSummary, KeyFacts, visible FAQ, Last updated
components/sections/About.tsx           1b NEW
components/sections/PackageCard.tsx     1b description + "Best for"; 3 "Included activities" links
components/sections/ExperienceTabs.tsx  1b visible one-line description per tile; 3 tiles link to landing pages
components/sections/FaqGoodToKnow.tsx   4  visible H3 Q&A (replaces Accordion on pages)
components/seo/AnswerSummary.tsx, KeyFacts.tsx, LastUpdated.tsx, Breadcrumbs.tsx, RelatedPages.tsx   4 NEW
components/analytics/Analytics.tsx      6g NEW: next/script + delegated click tracker (data-track attributes)
components/sections/Gallery.tsx, Book.tsx, Lightbox.tsx   2d honest alt; visible gallery captions
components/ui/Button.tsx + Footer/Book/TrustStrip/MobileBar  2e rel="nofollow noopener" on wa.me + Maps
components/layout/Footer.tsx            3/5 "Things to do" list (7 pages) + "Guide" link
lib/seo.ts                   2b per-page metadata; 6a Organization/LocalBusiness @id, TouristTrip, Article, Dataset, Breadcrumb
lib/analytics.ts             6g event helpers (no personal data)
next.config.ts               2a headers() incl. production CSP; 5 /guides → hub redirect
data/site.ts, data/seo-pages.ts, data/guides.ts, data/sightings.ts   (section 3)
scripts/optimize-assets.mjs  2c brand PNGs ≤60 KB, icon ≤20 KB, photos ≤150 KB q≈72, before/after table, unused-file cleanup
scripts/check-meta.mjs       2b NEW: postbuild check: titles ≤60, descriptions ≤155 on every prerendered page; fails the build
scripts/indexnow.mjs         6e NEW: submits every sitemap URL to api.indexnow.org
.github/workflows/indexnow.yml  6e NEW: on push to main, wait ~3 min for the Vercel deploy, then run indexnow.mjs
public/<key>.txt             6e NEW: IndexNow key file
scripts/ai-visibility-prompts.md   6h NEW: 15 prompts + monthly log template
scripts/qa/*.mjs             8  links/screens/axe cover every new page; new no-JS content check and CSP-violation check
README.md, CHANGES.md        6g/8 GA4 conversions + "AI assistants" channel group; URL/keyword list; results; TODO(owner)
SEO_COPY.md                  7  NEW: all new/changed copy grouped by page, for approval
```

---

## 5. New URLs and target keywords

| URL | Primary keyword | Notes |
| --- | --- | --- |
| `/dolphin-watching-gokarna` | dolphin watching Gokarna | Premium + Standard |
| `/kayaking-in-gokarna` | kayaking in Gokarna | Premium + River Trips (mangrove kayaking) |
| `/snorkelling-in-gokarna` | snorkelling in Gokarna | Premium |
| `/mangrove-river-trip-gokarna` | mangrove river trip Gokarna | River Trips; river name = TODO(owner) |
| `/fishing-trip-gokarna` | fishing trip Gokarna | Exclusive |
| `/bioluminescence-gokarna` | bioluminescence Gokarna | Exclusive; timing = TODO(owner) |
| `/private-boat-gokarna` | private boat Gokarna | Customised trips: couples, families, New Year, occasions |
| `/guides/gokarna-boat-trip-guide` | Gokarna boat trip | Hub: price, timing, safety, logistics, choice, unique trips |
| `/guides/how-to-reach-gokarna-beach-boat-pickup` | Gokarna Beach boat pick-up | Directions = TODO(owner) |
| `/guides/best-time-for-dolphin-watching-gokarna` | best time dolphin watching Gokarna | General guidance + season TODO |
| `/guides/gokarna-boat-trip-prices` | Gokarna boat ride price | **Built only once a price exists** |
| `/guides/dolphin-sighting-log` | dolphin sightings Gokarna | **Built only once `sightings.ts` has a month** |

---

## 6. Phase order and checkpoints

| Phase | Work | Commit | Push |
| --- | --- | --- | --- |
| 0 | This plan + `OWNER_QUESTIONS.md` | — | **⏸ approval** |
| 1 | 1a remove Suspense (verify with curl + Playwright with JS disabled); 1b About, package descriptions/"Best for", tile lines, first FAQ open, stronger hero line | ✓ | |
| 2 | 2a security headers + CSP; 2b titles/descriptions + `check-meta`; 2c image pipeline + cleanup; 2d alt text; 2e nofollow; 2f 404 | ✓ | **⏸ push + `curl -I` header check** |
| 3 | Landing-page template, 7 pages, internal links | ✓ | |
| 4 | AnswerSummary, KeyFacts, visible FAQ headings, "Last updated" on every page | ✓ | |
| 5 | Guide hub + 2 guides (+ prices and sighting log when data exists); links from nav/footer/home | ✓ | |
| 6 | JSON-LD graph, sitemap with images, OG images, robots groups, IndexNow + Action, llms.txt, GA4 + events + CSP hosts, AI-visibility prompts | ✓ | |
| 7 | `SEO_COPY.md` with every new/changed line | — | **⏸ copy approval** |
| 8 | Full QA (build/lint/types, meta check, links, screens, no-JS, CSP, Lighthouse median of 3, axe), deploy checks with curl + bot user agents, CHANGES.md | ✓ | **⏸ final push** |

Copy written in Phases 1, 3, 4 and 5 is committed as a draft. It reaches production at the Phase 2 push only for Phase 1 copy (About, descriptions, hero line). If you'd rather no new copy goes live before the Phase 7 approval, say so, and the Phase 2 push will carry only the technical fixes plus Phase 1a.

---

## 7. QA targets (unchanged from the redesign, plus new ones)

Lighthouse 95+ ×4 (mobile and desktop, median of 3), CLS 0, axe 0 serious/critical, no overflow at 360 px, tap targets ≥ 44 px, build/lint/typecheck 0 warnings, `check-meta` passes. New: zero CSP violations, every section visible with JavaScript disabled, every URL 200 + www canonical + in sitemap + security headers + full content to the `OAI-SearchBot`, `PerplexityBot` and `Googlebot` user agents, all wa.me/tel/maps links correct.
