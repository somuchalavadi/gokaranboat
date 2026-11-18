// Answer-first check for every page in the sitemap: each question heading (an H2/H3 ending in "?") must be followed
// by a direct-answer paragraph of 40–60 words. Also reports paragraphs over 70 words (aim: 2–3 sentences, ~25–50).
// Also checks heading ids: every H2/H3 in <main> has an id, and no id repeats on a page.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/answers.mjs`.
import { chromium } from "playwright";

const base = process.env.QA_URL ?? "http://localhost:3100";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const browser = await chromium.launch();
const context = await browser.newContext({ javaScriptEnabled: false });
let failures = 0;
let questions = 0;

for (const path of paths) {
  const page = await context.newPage();
  await page.goto(base + path);
  const report = await page.evaluate(() => {
    const words = (text) => text.trim().split(/\s+/).filter(Boolean).length;
    const main = document.querySelector("main");
    const headings = [...main.querySelectorAll("h2, h3")];
    const out = { questions: [], missingIds: [], duplicateIds: [], long: [] };
    const ids = headings.map((h) => h.id).filter(Boolean);
    out.missingIds = headings.filter((h) => !h.id).map((h) => h.textContent.trim().slice(0, 60));
    out.duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    for (const h of headings) {
      const text = h.textContent.trim();
      if (!text.endsWith("?")) continue;
      // The answer is the first <p> after the heading, in document order, before the next heading.
      let node = h;
      let answer = null;
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT);
      walker.currentNode = node;
      while ((node = walker.nextNode())) {
        if (/^H[1-6]$/.test(node.tagName)) break;
        if (node.tagName === "P") {
          answer = node;
          break;
        }
      }
      out.questions.push({ text, words: answer ? words(answer.textContent) : 0 });
    }
    for (const p of main.querySelectorAll("p")) if (words(p.textContent) > 70) out.long.push(`${words(p.textContent)}w: ${p.textContent.trim().slice(0, 70)}…`);
    return out;
  });
  const bad = report.questions.filter((q) => q.words < 40 || q.words > 60);
  questions += report.questions.length;
  const problems = bad.length + report.missingIds.length + report.duplicateIds.length;
  failures += problems;
  console.log(`${problems ? "FAIL" : "PASS"}  ${path.padEnd(52)} ${report.questions.length} questions`);
  for (const q of bad) console.log(`        ${q.words} words → "${q.text}"`);
  for (const t of report.missingIds) console.log(`        heading without id: "${t}"`);
  for (const id of report.duplicateIds) console.log(`        duplicate id: #${id}`);
  for (const l of report.long) console.log(`        note (long paragraph) ${l}`);
  await page.close();
}
await browser.close();
console.log(`\n${paths.length} pages, ${questions} question headings, ${failures} problems`);
process.exitCode = failures ? 1 : 0;
