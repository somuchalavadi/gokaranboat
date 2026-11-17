// Content without JavaScript, as AI crawlers see it: the raw HTML must have no streamed Suspense chunks
// (hidden "S:n" divs, $RC reveals) and must list sections in document order; with JavaScript disabled,
// every section in <main> must be visible with a height above zero.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/nojs.mjs`.
import { chromium } from "playwright";

const base = process.env.QA_URL ?? "http://localhost:3100";
const paths = (process.env.QA_PATHS ?? "/,/packages,/adventures").split(",");
let failed = 0;
const report = (ok, message) => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
};

const browser = await chromium.launch();
for (const path of paths) {
  const html = await (await fetch(base + path)).text();
  const streamed = (html.match(/<div hidden id="S:/g) ?? []).length + (html.match(/\$RC/g) ?? []).length;
  report(streamed === 0, `${path}: no streamed Suspense chunks in the HTML (${streamed} found)`);
  const mainStart = html.indexOf("<main");
  const footer = html.indexOf('id="site-footer"');
  const lastSection = html.lastIndexOf("</section>", footer);
  report(mainStart > 0 && footer > lastSection, `${path}: every section comes before the footer in the HTML`);

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(base + path, { waitUntil: "load" });
  const sections = await page.$$eval("main > section, main > div", (els) =>
    els.map((el) => {
      const style = getComputedStyle(el);
      const heading = el.querySelector("h1, h2")?.textContent?.trim() ?? el.id ?? el.tagName;
      return { heading, height: Math.round(el.getBoundingClientRect().height), visible: style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0, words: el.innerText.split(/\s+/).filter(Boolean).length };
    }),
  );
  const bad = sections.filter((s) => !s.visible || s.height === 0);
  report(sections.length > 0 && bad.length === 0, `${path}: ${sections.length} sections visible with JavaScript off${bad.length ? ` (hidden: ${bad.map((s) => s.heading).join(", ")})` : ""}`);
  console.log(`        ${sections.map((s) => `${s.heading} (${s.words} words)`).join(" · ")}`);
  await context.close();
}
await browser.close();
process.exitCode = failed ? 1 : 0;
