# Keyword map — Rudra Gokarna Adventures

Every keyword cluster mapped to the **one** URL that owns it. It's generated from `data/keyword-map.ts` (`node scripts/keyword-map.mjs`); edit that file, not this one.

**39 clusters:** 15 live, 3 as sections of an existing page, 16 planned new pages, 4 blocked on owner data, 1 deliberately not targeted.

**How to read it:**
- **Priority:** 1 = core brand and booking terms, 2 = strong supporting, 3 = long tail. It's judgement only: there's no search-volume data yet. Re-rank with Google Search Console queries 4–6 weeks after launch.
- **Intent:** brand, transactional (wants to book), informational (planning), local (a nearby town), comparison.
- **Blocked** clusters need a fact we don't have. They aren't targeted (no page, no copy) until `data/` has it.
- No keyword is the primary of two URLs, and no secondary keyword is another cluster's primary. The script checks both.

## Brand

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Rudra Gokarna Adventures** | `/` | brand | 1 | ✅ live | Rudra Gokarna, The Rudra Gokarna, Rudra Adventure Gokarna, the rudra adventure Gokarna, rudra boat Gokarna, rudra boat ride, therudraadventure | WebSite + Organization alternateName carry the variants (Phase B). Never 'Rudra Adventures' on its own. |
| **Rudra Gokarna contact number** | `/about` | brand | 1 | ✅ live | Rudra Gokarna WhatsApp, Rudra Gokarna booking, Rudra Gokarna location, Rudra Gokarna timings, Rudra Gokarna Adventures about | Timings: package departure times are null (TODO(owner)). |
| **Rudra Gokarna packages** | `/packages` | brand | 1 | ✅ live | Rudra Gokarna price, Rudra Gokarna boat ride packages, Gokarna boat packages | Price: all package prices are null (TODO(owner)); the page says 'price on enquiry'. |
| **Rudra Gokarna vs Rudra Adventures Rishikesh** | `/about#not-rudra-adventures-rishikesh` | brand | 2 | § section | is Rudra Gokarna the same as Rudra Adventures, Rudra Adventures Gokarna | Also a FAQ on home and the guide hub (Phase B), in FAQPage JSON-LD. |
| **Rudra Gokarna reviews** | `/about` | brand | 2 | ⛔ blocked | Rudra Gokarna Adventures rating | Google Business Profile URL and rating (business.socials, rating, reviewCount are null). No self-made review schema, ever. |

## Core service (Gokarna)

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Gokarna boat trips** | `/` | transactional | 1 | ✅ live | boat ride in Gokarna, Gokarna boat ride, boating in Gokarna, Gokarna boat tour, sea boat ride Gokarna, sightseeing boat Gokarna, Gokarna Beach boat ride, boat ride near me (in Gokarna), Gokarna boat ride booking, book boat ride Gokarna online | 'Near me' and 'today' are won by the Google Business Profile + on-page NAP, not a separate page. |
| **Gokarna boat ride price** | `/guides/gokarna-boat-trip-prices` | transactional | 1 | ⛔ blocked | Gokarna boat ride cost, Gokarna boating charges, Gokarna boat ride per person, how much is a boat ride in Gokarna | At least one package price (TODO(owner)). The guide builds itself once a price exists; until then /packages answers 'price on enquiry'. |
| **Gokarna boat trip guide** | `/guides/gokarna-boat-trip-guide` | informational | 1 | ✅ live | how long is a Gokarna boat trip, Gokarna boat ride timings, how to book a boat trip in Gokarna, what to wear on a Gokarna boat trip, what to carry, is Gokarna boat ride safe, minimum age for Gokarna boat ride, Gokarna boat ride for family, Gokarna boat ride for kids, Gokarna one day trip by boat, half day boat trip Gokarna, Gokarna weekend boat trip | Timings, minimum age, safety gear and season are null (TODO(owner)); those answers say 'ask us' until filled in. |
| **Gokarna boat ride in monsoon** | `/guides/gokarna-boat-trip-guide#section-timing` | informational | 2 | § section | are boat rides open in monsoon Gokarna, Gokarna boating season, best time for boat ride in Gokarna | Operating season / monsoon closure (pending.season, TODO(owner)). General context (fishing ban 1 Jun–31 Jul) is already approved. |
| **water activities in Gokarna** | `/adventures` | informational | 1 | ✅ live | sea adventure Gokarna, adventure activities in Gokarna, things to do in Gokarna by boat |  |
| **water sports in Gokarna** | `/guides/gokarna-boat-trip-vs-water-sports` | comparison | 2 | 🆕 planned | Gokarna boat trip vs water sports, jet ski / banana ride Gokarna (comparison only) | Neutral comparison: we run boat trips, not jet skis or banana rides. No claims about other operators' prices or safety. |
| **private boat Gokarna** | `/private-boat-gokarna` | transactional | 1 | ✅ live | private boat ride Gokarna, Gokarna boat for couples, family boat trip Gokarna, group boat trip Gokarna, friends boat trip Gokarna, corporate boat trip Gokarna, birthday boat ride Gokarna, New Year boat ride Gokarna | Occasions are sections (Phase C3); split out only where the content is genuinely unique. |
| **sunset boat ride Gokarna** | `—` | transactional | 2 | ⛔ blocked | speed boat ride Gokarna, motor boat ride Gokarna, Gokarna cruise, boat party Gokarna | Owner to confirm whether sunset trips, a speed boat or parties are offered. Not mentioned anywhere until confirmed. |

## Activities

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **dolphin watching in Gokarna** | `/dolphin-watching-gokarna` | transactional | 1 | ✅ live | dolphin spotting Gokarna, Gokarna dolphin trip, dolphin safari Gokarna, Gokarna dolphin boat ride |  |
| **best time for dolphins in Gokarna** | `/guides/best-time-for-dolphin-watching-gokarna` | informational | 2 | ✅ live | best time for dolphin watching Gokarna, Gokarna dolphin season, dolphin sightings Gokarna | Sighting log data (data/sightings.ts is empty) for real statistics. |
| **kayaking in Gokarna** | `/kayaking-in-gokarna` | transactional | 1 | ✅ live | sea kayaking Gokarna, Gokarna kayaking price, can non-swimmers do kayaking |  |
| **mangrove river trip Gokarna** | `/mangrove-river-trip-gokarna` | transactional | 1 | ✅ live | mangrove kayaking Gokarna, mangrove boat ride Gokarna, river trip Gokarna, Gokarna backwaters boat ride | River name and route (TODO(owner)). Never 'Sharavathi' unless the owner confirms it. |
| **snorkelling in Gokarna** | `/snorkelling-in-gokarna` | transactional | 1 | ✅ live | snorkeling Gokarna, swimming in the sea Gokarna, Gokarna snorkelling price | Not scuba: Netrani Island scuba is another operator's service and is never claimed. |
| **fishing trip Gokarna** | `/fishing-trip-gokarna` | transactional | 2 | ✅ live | fishing boat ride Gokarna, sea fishing Gokarna |  |
| **bioluminescence in Gokarna** | `/bioluminescence-gokarna` | transactional | 2 | ✅ live | glowing water Gokarna, glowing beach Gokarna, bioluminescence boat trip Karnataka | Months and time of night (TODO(owner)). |
| **Gokarna mystery cave** | `/adventures#places` | informational | 3 | § section | Gokarna lighthouse by boat, sea-river confluence Gokarna, Gokarna fishing harbour trip | Too thin for separate pages (<500 unique words each); kept as sections of /adventures. |

## Places and nearby towns

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **boat rides in Uttara Kannada** | `/boat-rides-uttara-kannada` | local | 2 | 🆕 planned | boat ride Gokarna Karnataka, coastal Karnataka boat trip, Konkan coast boat ride Karnataka, boat rides near Sirsi, boat rides near Yellapur, boat rides near Dandeli | data/nearby.ts distances and drive times (TODO(owner) or a verified source). Sirsi, Yellapur and Dandeli are hub sections only (inland, far from the sea). |
| **Gokarna Beach boat pick-up** | `/guides/how-to-reach-gokarna-beach-boat-pickup` | local | 1 | ✅ live | where is the Gokarna boat ride pick-up, how to reach Gokarna Beach, Gokarna Road railway station to Gokarna Beach | Landmark, parking, arrival time (TODO(owner)). |
| **Gokarna beaches by boat** | `—` | informational | 2 | ⛔ blocked | Om Beach boat ride, Kudle Beach boat, Half Moon Beach boat, Paradise Beach boat Gokarna | Owner to confirm which beaches the route passes. Until then beaches are not named on any page. |
| **boat ride near Honnavar** | `/boat-ride-near-honnavar` | local | 2 | 🆕 planned | Honnavar boat ride, boating near Honnavar, sea trip from Honnavar | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. Never claim Sharavathi backwater rides as ours. 'Honavar' spelling: one natural mention at most. |
| **boat ride near Murudeshwar** | `/boat-ride-near-murudeshwar` | local | 3 | 🆕 planned | Murudeshwar boat ride, boating near Murudeshwar, sea trip from Murudeshwar | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. Never claim Murudeshwar water sports or Netrani scuba as ours. |
| **boat ride near Kumta** | `/boat-ride-near-kumta` | local | 2 | 🆕 planned | Kumta boat ride, boating near Kumta, sea trip from Kumta | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. |
| **boat ride near Bhatkal** | `/boat-ride-near-bhatkal` | local | 3 | 🆕 planned | Bhatkal boat ride, boating near Bhatkal, sea trip from Bhatkal | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. |
| **boat ride near Ankola** | `/boat-ride-near-ankola` | local | 2 | 🆕 planned | Ankola boat ride, boating near Ankola, sea trip from Ankola | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. |
| **boat ride near Karwar** | `/boat-ride-near-karwar` | local | 3 | 🆕 planned | Karwar boat ride, boating near Karwar, sea trip from Karwar | Distance and drive time from data/nearby.ts. Becomes a hub section instead if it can't reach ~500 unique words. |

## Source cities (travel planning)

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Gokarna boat trip from Goa** | `/guides/gokarna-boat-trip-from-goa` | informational | 2 | 🆕 planned | Goa to Gokarna boat ride plan, Gokarna weekend trip from Goa, Gokarna boat trip from Belgaum (via Goa or Hubli) | Travel times need a verified source; ranges only, never exact fares. |
| **Gokarna boat trip from Bangalore** | `/guides/gokarna-boat-trip-from-bangalore` | informational | 2 | 🆕 planned | Bangalore to Gokarna boat ride plan, Gokarna weekend trip from Bangalore, Gokarna boat trip from Mysore | Travel times need a verified source; ranges only, never exact fares. |
| **Gokarna boat trip from Hubli-Dharwad** | `/guides/gokarna-boat-trip-from-hubli-dharwad` | informational | 3 | 🆕 planned | Hubli-Dharwad to Gokarna boat ride plan, Gokarna weekend trip from Hubli-Dharwad, Gokarna boat trip from Belgaum, Gokarna boat trip from Hyderabad (via Hubli) | Travel times need a verified source; ranges only, never exact fares. |
| **Gokarna boat trip from Mangalore-Udupi** | `/guides/gokarna-boat-trip-from-mangalore-udupi` | informational | 3 | 🆕 planned | Mangalore-Udupi to Gokarna boat ride plan, Gokarna weekend trip from Mangalore-Udupi, Gokarna boat trip from Shimoga | Travel times need a verified source; ranges only, never exact fares. |
| **Gokarna boat trip from Pune-Mumbai** | `/guides/gokarna-boat-trip-from-pune-mumbai` | informational | 3 | 🆕 planned | Pune-Mumbai to Gokarna boat ride plan, Gokarna weekend trip from Pune-Mumbai | Travel times need a verified source; ranges only, never exact fares. |

## Comparisons

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **Gokarna vs Murudeshwar water activities** | `/guides/gokarna-vs-murudeshwar-water-activities` | comparison | 2 | 🆕 planned | Gokarna or Murudeshwar for boat ride, Murdeshwar vs Gokarna (one natural mention) | Neutral and factual, with a comparison table; Murudeshwar's activities are described as other operators'. |

## Languages and spellings

| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |
| --- | --- | --- | --- | --- | --- | --- |
| **ಗೋಕರ್ಣ ಬೋಟ್ ರೈಡ್** | `/kn` | transactional | 3 | 🆕 planned | ಗೋಕರ್ಣ ದೋಣಿ ವಿಹಾರ, ಗೋಕರ್ಣ ಡಾಲ್ಫಿನ್, ಗೋಕರ್ಣ ಕಯಾಕಿಂಗ್, ಹೊನ್ನಾವರ ಬೋಟ್ ರೈಡ್ | Native Kannada review. Ships noindex (hreflang en-IN / kn-IN) until approved. |
| **गोकर्ण बोट राइड** | `/hi` | transactional | 3 | 🆕 planned | गोकर्ण डॉल्फिन | Optional. Native Hindi review; noindex until approved. |
| **Gokarn boat ride** | `—` | transactional | 3 | — not targeted | Gokarana boat ride, Honavar boat ride, Murdeshwar boat ride | No pages for misspellings; at most one natural mention each where readers would use them. |

## Decisions to confirm

1. **Town pages (Honnavar, Murudeshwar, Kumta, Bhatkal, Ankola, Karwar).** Each needs about 500 unique, useful words. A sea trip from Gokarna Beach is the same trip whichever town you start from, so the unique part is the town's distance and drive time, its own attractions and a day plan. I'll write the hub first. A town gets its own page only if it clears 500 unique words; otherwise it stays a section of `/boat-rides-uttara-kannada`.
2. **Distances** for `data/nearby.ts` (km and drive time from each town to Gokarna Beach): your numbers, or may I use ranges from a public map route that you then check?
3. **Services to confirm or rule out:** sunset trips, a speed or motor boat, boat parties, and which beaches (Om, Kudle, Half Moon, Paradise) the route passes. Until you confirm, none of these is mentioned.
4. **Source-city guides:** travel options (train, bus, road) need a checkable source, and I'll use ranges, never fares. Belgaum, Mysore, Shimoga and Hyderabad become sections of the nearest city guide rather than pages.
5. **Kannada `/kn`:** do you have a native reviewer? It ships with `noindex` until they approve it. Hindi `/hi` is optional; skip it unless you want it.
