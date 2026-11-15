// Per-section heights of the home page at 375×812 and 1440×900, to see where page length comes from.
// Usage: with the site running on http://localhost:3100, `node scripts/qa/heights.mjs`.
import { chromium } from "playwright";
const b = await chromium.launch();
for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
  const p = await b.newPage({ viewport, reducedMotion: "reduce" });
  await p.goto("http://localhost:3100/", { waitUntil: "networkidle" });
  console.log(viewport.width, await p.evaluate(() => [...document.querySelectorAll("main > *, footer#site-footer")].map((el) => `${el.id || el.tagName.toLowerCase()}:${Math.round(el.getBoundingClientRect().height)}`).join("  ")));
  await p.close();
}
await b.close();
