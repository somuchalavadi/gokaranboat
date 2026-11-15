// Full-page screenshots plus layout checks: horizontal overflow, overlapping text/controls,
// tap targets under 44px, text under 14px, and document height.
// Usage: start the site (npm run build && npx next start -p 3100), then `node scripts/qa/screens.mjs`.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
const paths = (process.env.QA_PATHS ?? "/,/packages,/adventures").split(",");
const outDir = "artifacts/qa/screens";
const viewports = [
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

function audit() {
  const vw = document.documentElement.clientWidth;
  const visible = (el) => {
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && !el.closest("[hidden], dialog:not([open]), [aria-hidden='true']");
  };
  const label = (el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40)}"`;
  const insideScroller = (el) => {
    for (let node = el.parentElement; node; node = node.parentElement) {
      const overflowX = getComputedStyle(node).overflowX;
      if (overflowX === "auto" || overflowX === "scroll" || overflowX === "hidden" || overflowX === "clip") return true;
    }
    return false;
  };

  const overflow = document.documentElement.scrollWidth - vw;
  const wide = Array.from(document.querySelectorAll("body *"))
    .filter((el) => visible(el) && !insideScroller(el))
    .filter((el) => el.getBoundingClientRect().right > vw + 1)
    .slice(0, 10)
    .map(label);

  const interactive = Array.from(document.querySelectorAll("a[href], button, input, select, textarea, summary, [role='tab']")).filter(visible);
  const smallTargets = interactive
    .filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    })
    .filter((el) => !(el.tagName === "A" && getComputedStyle(el).display === "inline" && el.closest("p")))
    .map((el) => `${label(el)} ${Math.round(el.getBoundingClientRect().width)}×${Math.round(el.getBoundingClientRect().height)}`);

  const textEls = Array.from(document.querySelectorAll("main *, footer *, header *")).filter(
    (el) => visible(el) && Array.from(el.childNodes).some((node) => node.nodeType === 3 && node.textContent.trim()) && !el.closest(".sr-only"),
  );
  const tinyText = textEls
    .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 14)
    .slice(0, 10)
    .map((el) => `${label(el)} ${getComputedStyle(el).fontSize}`);

  // Pairs of text blocks or controls whose boxes overlap, where neither contains the other.
  const blocks = Array.from(document.querySelectorAll("main h1, main h2, main h3, main p, main a, main button, main label, main input, main li, main summary, footer a, footer p")).filter(
    (el) => visible(el) && getComputedStyle(el).position !== "fixed" && !el.closest("[role='region'][tabindex], ul.snap-x"),
  );
  const overlaps = [];
  for (let i = 0; i < blocks.length && overlaps.length < 10; i++) {
    const a = blocks[i].getBoundingClientRect();
    for (let j = i + 1; j < blocks.length; j++) {
      if (blocks[i].contains(blocks[j]) || blocks[j].contains(blocks[i])) continue;
      const b = blocks[j].getBoundingClientRect();
      const x = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (x > 4 && y > 4) overlaps.push(`${label(blocks[i])} ⟷ ${label(blocks[j])}`);
    }
  }

  return {
    height: document.documentElement.scrollHeight,
    overflow,
    wide,
    smallTargets,
    tinyText,
    overlaps,
    h1: document.querySelectorAll("h1").length,
  };
}

const browser = await chromium.launch();
const results = [];
await mkdir(outDir, { recursive: true });
for (const path of paths) {
  for (const viewport of viewports) {
    // Reduced motion: shows reveal content immediately and keeps the hero on its poster.
    const context = await browser.newContext({ viewport, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const result = { path, viewport: `${viewport.width}×${viewport.height}`, ...(await page.evaluate(audit)) };
    result.screens = +(result.height / viewport.height).toFixed(1);
    results.push(result);
    const name = `${path === "/" ? "home" : path.slice(1).replace(/\//g, "-")}-${viewport.width}.png`;
    await page.screenshot({ path: `${outDir}/${name}`, fullPage: true });
    await context.close();
    console.log(
      `${path.padEnd(12)} ${result.viewport.padEnd(10)} height ${String(result.height).padStart(6)} (${result.screens} screens)  overflow ${result.overflow}px  small targets ${result.smallTargets.length}  tiny text ${result.tinyText.length}  overlaps ${result.overlaps.length}  h1 ${result.h1}`,
    );
  }
}
await browser.close();
await writeFile("artifacts/qa/screens.json", JSON.stringify(results, null, 2));
const problems = results.filter((r) => r.overflow > 0 || r.wide.length || r.smallTargets.length || r.tinyText.length || r.overlaps.length || r.h1 !== 1);
for (const r of problems) console.log("\n", r.path, r.viewport, JSON.stringify({ wide: r.wide, smallTargets: r.smallTargets, tinyText: r.tinyText, overlaps: r.overlaps, h1: r.h1 }, null, 1));
