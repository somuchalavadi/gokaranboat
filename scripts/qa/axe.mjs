// axe-core (WCAG 2.0/2.1/2.2 A + AA) on every page at phone and desktop widths, plus the interactive
// states: open menu, compare sheet, tile sheet, lightbox and the booking form showing errors.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/axe.mjs`.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const results = [];

async function scan(page, label, include) {
  let builder = new AxeBuilder({ page }).withTags(tags);
  if (include) builder = builder.include(include);
  const { violations, incomplete } = await builder.analyze();
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const violation of violations) counts[violation.impact] = (counts[violation.impact] ?? 0) + violation.nodes.length;
  results.push({
    label,
    counts,
    violations: violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")) })),
    needsReview: incomplete.map((v) => `${v.id} (${v.nodes.length})`),
  });
  const flag = counts.critical + counts.serious > 0 ? "FAIL" : "PASS";
  console.log(`${flag}  ${label.padEnd(44)} critical ${counts.critical}  serious ${counts.serious}  moderate ${counts.moderate}  minor ${counts.minor}`);
  for (const v of violations) console.log(`        ${v.impact}: ${v.id} — ${v.help} → ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
}

const browser = await chromium.launch();
for (const path of (process.env.QA_PATHS ?? "/,/packages,/adventures,/dolphin-watching-gokarna,/guides/gokarna-boat-trip-guide").split(",")) {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 900 },
  ]) {
    // Reduced motion so fade-in content is fully visible for the contrast checks.
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    await scan(page, `${path} @${viewport.width}`);
    await context.close();
  }
}

const context = await browser.newContext({ viewport: { width: 375, height: 812 }, reducedMotion: "reduce" });
const page = await context.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open menu" }).click();
await scan(page, "/ @375 menu open", "dialog[open]");
await page.keyboard.press("Escape");
await page.getByRole("button", { name: "Compare all packages" }).click();
await scan(page, "/ @375 compare sheet open", "dialog[open]");
await page.keyboard.press("Escape");
await page.getByRole("tab", { name: "Places" }).click();
await scan(page, "/ @375 Places tab selected", "#experiences");
await page.getByRole("button", { name: "Lighthouse" }).click();
await scan(page, "/ @375 tile sheet open", "dialog[open]");
await page.keyboard.press("Escape");
await page.getByRole("button", { name: /^View photo:/ }).first().click();
await scan(page, "/ @375 lightbox open (photo)", "dialog[open]");
await page.keyboard.press("ArrowRight");
await scan(page, "/ @375 lightbox open (video)", "dialog[open]");
await page.keyboard.press("Escape");
const form = page.locator("#book form");
await form.getByRole("button", { name: "Next" }).click();
await scan(page, "/ @375 booking form, trip error", "#book");
await form.getByText("Custom", { exact: true }).click();
await scan(page, "/ @375 booking form, custom trip", "#book");
await form.getByRole("button", { name: "Next" }).click();
await form.getByRole("button", { name: "Next" }).click();
await scan(page, "/ @375 booking form, date error", "#book");
await context.close();

await browser.close();
await mkdir("artifacts/qa", { recursive: true });
await writeFile("artifacts/qa/axe.json", JSON.stringify(results, null, 2));
const blocking = results.reduce((sum, r) => sum + r.counts.critical + r.counts.serious, 0);
console.log(`\n${results.length} scans, ${blocking} serious/critical issues`);
process.exitCode = blocking ? 1 : 0;
