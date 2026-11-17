// Exports the new and changed SEO copy, exactly as it renders, to Markdown for the owner's approval.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/copy-export.mjs > copy.md`.
import { chromium } from "playwright";

const base = process.env.QA_URL ?? "http://localhost:3100";

// Which parts of each page are new or changed copy. `null` = the whole of <main>.
const pages = [
  { path: "/", label: "Home", selectors: ["#about", "#packages article", "#faq"] },
  { path: "/packages", label: "/packages", selectors: ["main > section:first-child", "section[aria-labelledby='packages-key-facts']"] },
  { path: "/adventures", label: "/adventures", selectors: ["main > section:first-child", "section[aria-labelledby='adventures-key-facts']", "#questions"] },
  ...[
    "/dolphin-watching-gokarna",
    "/kayaking-in-gokarna",
    "/snorkelling-in-gokarna",
    "/mangrove-river-trip-gokarna",
    "/fishing-trip-gokarna",
    "/bioluminescence-gokarna",
    "/private-boat-gokarna",
    "/guides/gokarna-boat-trip-guide",
    "/guides/how-to-reach-gokarna-beach-boat-pickup",
    "/guides/best-time-for-dolphin-watching-gokarna",
  ].map((path) => ({ path, label: path, selectors: null })),
  { path: "/this-page-does-not-exist", label: "404 page", selectors: null },
];

// Walks the DOM in order and turns headings, paragraphs, list items and key-fact rows into Markdown.
function toMarkdown(roots) {
  const out = [];
  const text = (el) => el.innerText.replace(/\s+/g, " ").trim();
  const seen = new Set();
  const walk = (el) => {
    if (seen.has(el) || el.closest("[aria-hidden='true'], .sr-only, script, style, nav[aria-label='Breadcrumb']")) return;
    const tag = el.tagName;
    if (/^H[1-4]$/.test(tag)) {
      out.push("", `${"#".repeat(Number(tag[1]) + 2)} ${text(el)}`, "");
      return;
    }
    if (tag === "DT") {
      const dd = el.nextElementSibling;
      out.push(`- **${el.textContent.replace(/\s+/g, " ").trim()}:** ${dd ? text(dd) : ""}`);
      if (dd) seen.add(dd);
      return;
    }
    const card = tag === "LI" && el.querySelector("a") && el.querySelector("p");
    if (card) {
      out.push(`- **${text(el.querySelector("a"))}:** ${text(el.querySelector("p"))}`);
      return;
    }
    if (tag === "P" || tag === "LI") {
      const value = text(el);
      if (value) out.push(tag === "LI" ? `- ${value}` : `${value}`, ...(tag === "LI" ? [] : [""]));
      return;
    }
    if (tag === "TABLE") {
      for (const row of el.querySelectorAll("tr")) out.push(`| ${[...row.children].map(text).join(" | ")} |`);
      out.push("");
      return;
    }
    for (const child of el.children) walk(child);
  };
  for (const root of roots) walk(root);
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const sections = [];
for (const entry of pages) {
  await page.goto(base + entry.path, { waitUntil: "networkidle" });
  const meta = await page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
  }));
  const body = await page.evaluate(
    ({ selectors, fn }) => {
      const roots = selectors ? selectors.flatMap((selector) => [...document.querySelectorAll(selector)]) : [document.querySelector("main")];
      return new Function("roots", `return (${fn})(roots)`)(roots.filter(Boolean));
    },
    { selectors: entry.selectors, fn: toMarkdown.toString() },
  );
  sections.push(
    `## ${entry.label}`,
    "",
    `- **Title (${meta.title.length}/60):** ${meta.title}`,
    `- **Description (${meta.description.length}/155):** ${meta.description}`,
    "",
    body,
    "",
    "---",
    "",
  );
}
await browser.close();
process.stdout.write(sections.join("\n"));
