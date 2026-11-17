# Rudra Gokarna Adventures

Website for Rudra Gokarna Adventures, boat trips from Gokarna Beach, Karnataka.

**Official address: https://www.therudraadventure.com**

The old Vercel address (`therudragokarna.vercel.app`) and the bare domain (`therudraadventure.com`) redirect there permanently (308), keeping the path. Canonical URLs, Open Graph tags, JSON-LD, `sitemap.xml` and `robots.txt` all use the www domain, set in one place: `lib/url.ts`. `NEXT_PUBLIC_SITE_URL` overrides it, for example on a staging copy.

## Stack

Next.js 16 (App Router, static pages), React 19, Tailwind CSS 4, TypeScript. Hosted on Vercel.

## Content

Components only render; all visitor-facing content lives in typed data files:

| File | What it holds |
| --- | --- |
| `data/site.ts` | Business and contact details, packages, activities, places, FAQ, gallery, SEO text |
| `data/pages.ts` | Answer summaries, key facts and "last updated" dates for the home, `/packages` and `/adventures` pages |
| `data/seo-pages.ts` | The seven activity landing pages (`/dolphin-watching-gokarna` and others) |
| `data/guides.ts` | The guide hub and guides under `/guides/…` |
| `data/sightings.ts` | Monthly dolphin sighting counts (the sighting-log guide appears once this has a month) |

Values the owner hasn't confirmed yet are `null` with a `TODO(owner)` comment. The site and the structured data leave them out until they're filled in. `OWNER_QUESTIONS.md` and `CHANGES.md` list them. Two guides wait for data: the prices guide is built once any package has a price, and the sighting log once `data/sightings.ts` has a month.

When you change a page's copy, update its `updatedAt` date: it feeds the visible "Last updated" line, the sitemap and the guides' Article JSON-LD.

## Search and AI assistants

- **Structured data:** one `LocalBusiness`/`Organization` node (`/#business`) that every `TouristTrip`, `Article`, `FAQPage` and `BreadcrumbList` points to. No ratings or reviews are marked up for the business itself.
- **`robots.txt`** names the search and AI crawlers explicitly (OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Googlebot) and allows the whole site. Edit `app/robots.ts` to opt one out.
- **`/llms.txt`** is a plain-text summary with links to every page, generated from the data files.
- **Open Graph images** are generated per page at build time (`lib/og.tsx`, Fraunces SemiBold from `assets/fonts/`, SIL Open Font License).
- **IndexNow:** `.github/workflows/indexnow.yml` runs on every push to `main`. It waits for the Vercel deploy, then `scripts/indexnow.mjs` submits every sitemap URL. The key file is `public/<key>.txt`; keep it in place.
- **AI visibility:** `scripts/ai-visibility-prompts.md` has 15 prompts to try in ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews each month, and a log template.

## Analytics (GA4)

GA4 loads only when `NEXT_PUBLIC_GA_ID` is set (Vercel → Project → Settings → Environment Variables, Production, e.g. `G-XXXXXXXXXX`), then redeploy. `gtag.js` loads on the visitor's first tap, click, key press or scroll, or after 8 seconds, whichever comes first, so it never competes with the page while it loads (with plain `lazyOnload` it cost mobile Lighthouse 4–6 points). The page view and any clicks before then are queued and sent once it loads. The CSP allows the Google Analytics hosts only when the ID is set.

Events (no names, phone numbers or message text are sent):

| Event | Fires when | Parameters |
| --- | --- | --- |
| `whatsapp_click` | Any WhatsApp link is clicked | `link_location` (the id of the section, e.g. `book`, `site-footer`) |
| `call_click` | Any phone link is clicked | `link_location` |
| `maps_click` | Any Google Maps link is clicked | `link_location` |
| `booking_form_submit` | The booking form opens WhatsApp | `trip` (package id or `custom`), `guests` |

**Set up in GA4 (Admin):**

1. **Key events (conversions):** Admin → Events. Once each event has fired once, mark `whatsapp_click`, `call_click` and `booking_form_submit` as key events. `maps_click` is useful but is not a booking signal; leave it as a normal event.
2. **Custom dimension:** Admin → Custom definitions → Create custom dimension, event scope, parameter `link_location`, so reports show which section people booked from. Optionally add `trip` too.
3. **"AI assistants" channel group:** Admin → Data display → Channel groups → Create new channel group (copy of the default). Add a channel named **AI assistants**, condition *Session source* matches regex:

   ```
   ^(chatgpt\.com|chat\.openai\.com|perplexity\.ai|www\.perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|edgeservices\.bing\.com|you\.com|phind\.com|meta\.ai)$
   ```

   Drag it **above** "Referral" so these visits aren't counted as ordinary referrals, then save. Use it in Reports → Acquisition → Traffic acquisition by switching the channel group.

## Scripts

```bash
npm run dev               # local development
npm run build             # production build (then checks every title ≤60 and description ≤155 characters)
npm run start             # serve the production build
npm run lint              # ESLint
npm run typecheck         # TypeScript
npm run optimize-assets   # rebuild public/ images and videos from assets-src/ (see assets-src/README.md)
node scripts/indexnow.mjs # submit the live sitemap to IndexNow (the GitHub Action does this after each push)
```

QA scripts in `scripts/qa/` (screenshots and layout, axe, links and booking form, network weight, interaction latency, Lighthouse, no-JavaScript content, CSP violations) run against `npx next start -p 3100`. `CHANGES.md` has the commands and the latest results.
