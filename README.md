# Rudra Gokarna Adventures

Website for Rudra Gokarna Adventures, boat trips from Gokarna Beach, Karnataka.

**Official address: https://www.therudraadventure.com**

The old Vercel address (`therudragokarna.vercel.app`) and the bare domain (`therudraadventure.com`) redirect there permanently (308), keeping the path. Canonical URLs, Open Graph tags, JSON-LD, `sitemap.xml` and `robots.txt` all use the www domain, set in one place: `lib/url.ts`. `NEXT_PUBLIC_SITE_URL` overrides it, for example on a staging copy.

## Stack

Next.js 16 (App Router, static pages), React 19, Tailwind CSS 4, TypeScript. Hosted on Vercel.

## Content

All visitor-facing content lives in `data/site.ts`: packages, activities, places, FAQ, contact details, gallery and SEO text. Values the owner hasn't confirmed yet are `null` with a `TODO(owner)` comment, and the site hides them until they're filled in. `CHANGES.md` lists them.

## Scripts

```bash
npm run dev               # local development
npm run build             # production build
npm run start             # serve the production build
npm run lint              # ESLint
npm run typecheck         # TypeScript
npm run optimize-assets   # rebuild public/ images and videos from assets-src/ (see assets-src/README.md)
```

QA scripts in `scripts/qa/` (screenshots and layout, axe, links and booking form, network weight, interaction latency, Lighthouse) run against `npx next start -p 3100`. `CHANGES.md` has the commands and the latest results.
