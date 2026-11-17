# Owner questions: Rudra Gokarna Adventures

Answer whatever you can, inline is fine. **Anything left blank stays `null` + `TODO(owner)` in the data, and the site simply leaves that line, table row or schema field out.** Nothing gets guessed.

---

## 1. Approve or edit: the canonical description (~60 words)

Used in the About section, the meta description fallback, the JSON-LD `description` and `/llms.txt`. Written only from facts already on the site:

> Rudra Gokarna Adventures runs boat trips from Gokarna Beach in Gokarna, Karnataka, aboard The Rudra Gokarna, a navy-and-white boat with an open upper deck and a covered cabin. Trips last two to four hours and include sightseeing along the coast, dolphin watching, kayaking, snorkelling, a mystery cave, mangrove river trips, fishing and bioluminescence trips, plus custom trips for couples, families and celebrations.

☐ Approved as written  ☐ Edit: ________________________________________________

---

## 2. Per package

| | Premium (3 h) | Standard (2 h) | Exclusive (4 h) | River Trips (2 h) |
| --- | --- | --- | --- | --- |
| "From" price in ₹ (and per person or per boat?) | | | | |
| Maximum guests | | | | |
| Departure times (fixed slots or flexible?) | | | | |
| Minimum age for kids | | | | |
| What's included (e.g. life jackets, kayak, snorkel gear, guide, water, photos) | | | | |
| What guests should bring | | | | |
| Exclusive only: is fishing at sea, by day or night? | — | — | | — |

**Private / custom boat:** how is it priced (per hour, per trip)? Maximum group size? Is a New Year trip a fixed event (date, time, price) or on request?

---

## 3. Route and places (no names or locations will be guessed)

1. Which **beaches** does the sightseeing route pass (e.g. by name)?
2. The **lighthouse**: its name or location?
3. The **mystery cave**: what do you call it, and roughly where is it?
4. The **fishing harbour**: which one?
5. The **mangroves** and the **sea-river joining point**: which **river**?
6. Is the River Trip kayaking guided, and roughly how long is the paddle?

---

## 4. Season, timing and conditions

1. **Operating months**, and **monsoon closure** dates (e.g. "June–September closed")?
2. **Bioluminescence**: which months, and roughly what time of night?
3. **Best time of day** for dolphin watching on your trips (if you have a view)?
4. **Pick-up / reporting time**: how early should guests arrive before departure?
5. **Weather cancellations**: if the sea is rough, do guests get a reschedule, a refund, or either?
6. **Cancellation policy** for guests who cancel?
7. **Opening hours** for enquiries/trips (e.g. "Every day 7:00–18:00")?
8. Typical **reply time** on WhatsApp?

---

## 5. Safety (no safety claims will be made without your answers)

1. **Life jackets**: provided for every guest, including children's sizes?
2. Is the crew trained or certified (e.g. lifeguard, first aid)? Any **boat licence or registration** you want to show?
3. **Non-swimmers**: can they join every trip? Snorkelling/kayaking too?
4. **Kids**: minimum age per activity?
5. **Seniors / pregnancy**: any guidance you give guests?
6. **Licensed passenger capacity** of The Rudra Gokarna?

---

## 6. Getting there

1. **Exact pick-up pin** (latitude, longitude), or confirm the Google Maps link `https://maps.app.goo.gl/s4jSzvA6cUZmsFzZ6` is the exact meeting spot.
2. What to look for at the meeting spot (e.g. "near the lifeguard tower", "blue board")?
3. From the **Gokarna bus stand**: walking time or directions to the pick-up?
4. From **Gokarna Road railway station** (and/or Kumta): how do guests usually get there (auto, taxi, bus) and how long does it take?
5. **Parking**: is there parking near the pick-up point?

---

## 7. Business and profiles

1. **Founding year**:
2. **Slogan / tagline** (if you have an official one):
3. **Google Business Profile URL**:
4. **Instagram URL**:
5. **Tripadvisor URL**:
6. Facebook / YouTube (if any):
7. **Business email**:
8. Anything to say about the **crew/owner** (short paragraph)?

---

## 8. Media and records

1. Is `rudra-boat-showcase.jpeg` (the current hero: boat on blue water with palm trees) a **photograph or a render**?
2. Real photos of trips/activities (kayaking, snorkelling, dolphins, mangroves, caves) to replace the illustrative stock images, if you have any.
3. **Dolphin sightings log**: if you keep track, send monthly numbers in this format and the site will publish a sighting-rate table:
   `month (YYYY-MM) · trips run · trips with sightings · notes`
4. A vector (SVG/PDF/AI) logo and higher-resolution boat renders, if available.

---

## 9. Decisions on the plan (`MASTER_PLAN.md` §2)

Reply "approve all" or note changes:

- **A1** Remove `<Suspense>` even though it may cost a mobile Lighthouse point or two (offset with lighter client JS).
- **A2** Load GA4 with `lazyOnload` instead of `afterInteractive` to protect mobile Performance.
- **A3** Accept a longer home page (~10–11k px on phones) for the added content.
- **A4** Visible FAQ question headings on every page (replacing the accordion).
- **A5** Download Fraunces SemiBold TTF (OFL, ~150 KB, from the google/fonts GitHub repo) for branded OG images.
- **A6** Landing/guide pages may be ~600 words until these questions are answered; no placeholders shown.
- **A7** "Guide" link in footer, home and mobile menu; desktop nav only from 1280 px.
- **A8** Delete unused `public/` files (incl. the old `rudra-boat-showcase.jpeg` OG URL); move credit docs to `assets-src/`.
- **A9** Production-only CSP; localhost QA leaves out `upgrade-insecure-requests`.
- **A10** Share the Screaming Frog export if you have it.
- **Phase 2 push:** OK to ship Phase 1 copy (About, package descriptions, hero line) before the Phase 7 copy approval?
- **Indexing:** OK to add the IndexNow key file + GitHub Action (submits URLs to Bing/Yandex via api.indexnow.org after each push to `main`)?
- **GA4 ID:** the `G-…` measurement ID, when ready (set as `NEXT_PUBLIC_GA_ID` in Vercel).
