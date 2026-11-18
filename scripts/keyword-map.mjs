// Writes KEYWORD_MAP.md from data/keyword-map.ts (Node 22.18+/24 runs the TypeScript file directly).
// Usage: `node scripts/keyword-map.mjs`
import { writeFile } from "node:fs/promises";
import { keywordClusters } from "../data/keyword-map.ts";

const groups = [
  ["Brand", (c) => c.id.startsWith("brand")],
  ["Core service (Gokarna)", (c) => c.id.startsWith("core")],
  ["Activities", (c) => c.id.startsWith("act")],
  ["Places and nearby towns", (c) => c.id.startsWith("local") || c.id.startsWith("town")],
  ["Source cities (travel planning)", (c) => c.id.startsWith("city")],
  ["Comparisons", (c) => c.id.startsWith("cmp")],
  ["Languages and spellings", (c) => c.id.startsWith("lang") || c.id === "misspellings"],
];
const statusLabel = { live: "✅ live", planned: "🆕 planned", section: "§ section", blocked: "⛔ blocked", "not-targeted": "— not targeted" };
const cell = (text) => String(text ?? "").replace(/\|/g, "\|");

const urls = keywordClusters.filter((c) => c.url !== "—" && !c.url.includes("#"));
const dupes = urls.map((c) => `${c.url}|${c.primary}`).filter((v, i, a) => a.indexOf(v) !== i);
const primaries = keywordClusters.map((c) => c.primary.toLowerCase());
const repeatedPrimary = primaries.filter((p, i) => primaries.indexOf(p) !== i);
const secondaryClash = keywordClusters.flatMap((c) => c.secondary.filter((s) => primaries.includes(s.toLowerCase())).map((s) => `${c.id}: ${s}`));
if (dupes.length || repeatedPrimary.length || secondaryClash.length) throw new Error(`Keyword map conflicts: ${[...dupes, ...repeatedPrimary, ...secondaryClash].join(", ")}`);

const counts = Object.fromEntries(Object.keys(statusLabel).map((s) => [s, keywordClusters.filter((c) => c.status === s).length]));
const lines = [
  "# Keyword map — Rudra Gokarna Adventures",
  "",
  "Every keyword cluster mapped to the **one** URL that owns it. It's generated from `data/keyword-map.ts` (`node scripts/keyword-map.mjs`); edit that file, not this one.",
  "",
  `**${keywordClusters.length} clusters:** ${counts.live} live, ${counts.section} as sections of an existing page, ${counts.planned} planned new pages, ${counts.blocked} blocked on owner data, ${counts["not-targeted"]} deliberately not targeted.`,
  "",
  "**How to read it:**",
  "- **Priority:** 1 = core brand and booking terms, 2 = strong supporting, 3 = long tail. It's judgement only: there's no search-volume data yet. Re-rank with Google Search Console queries 4–6 weeks after launch.",
  "- **Intent:** brand, transactional (wants to book), informational (planning), local (a nearby town), comparison.",
  "- **Blocked** clusters need a fact we don't have. They aren't targeted (no page, no copy) until `data/` has it.",
  "- No keyword is the primary of two URLs, and no secondary keyword is another cluster's primary. The script checks both.",
  "",
];
for (const [title, test] of groups) {
  const rows = keywordClusters.filter(test);
  lines.push(`## ${title}`, "", "| Primary keyword | URL | Intent | P | Status | Also covers | Needs / notes |", "| --- | --- | --- | --- | --- | --- | --- |");
  for (const c of rows) {
    const needs = [c.blockedBy, c.notes].filter(Boolean).join(" ");
    lines.push(`| **${cell(c.primary)}** | \`${cell(c.url)}\` | ${c.intent} | ${c.priority} | ${statusLabel[c.status]} | ${cell(c.secondary.join(", "))} | ${cell(needs)} |`);
  }
  lines.push("");
}
lines.push(
  "## Decisions to confirm",
  "",
  "1. **Town pages (Honnavar, Murudeshwar, Kumta, Bhatkal, Ankola, Karwar).** Each needs about 500 unique, useful words. A sea trip from Gokarna Beach is the same trip whichever town you start from, so the unique part is the town's distance and drive time, its own attractions and a day plan. I'll write the hub first. A town gets its own page only if it clears 500 unique words; otherwise it stays a section of `/boat-rides-uttara-kannada`.",
  "2. **Distances** for `data/nearby.ts` (km and drive time from each town to Gokarna Beach): your numbers, or may I use ranges from a public map route that you then check?",
  "3. **Services to confirm or rule out:** sunset trips, a speed or motor boat, boat parties, and which beaches (Om, Kudle, Half Moon, Paradise) the route passes. Until you confirm, none of these is mentioned.",
  "4. **Source-city guides:** travel options (train, bus, road) need a checkable source, and I'll use ranges, never fares. Belgaum, Mysore, Shimoga and Hyderabad become sections of the nearest city guide rather than pages.",
  "5. **Kannada `/kn`:** do you have a native reviewer? It ships with `noindex` until they approve it. Hindi `/hi` is optional; skip it unless you want it.",
  "",
);
await writeFile("KEYWORD_MAP.md", lines.join("\n"));
console.log(`KEYWORD_MAP.md: ${keywordClusters.length} clusters`, counts);
