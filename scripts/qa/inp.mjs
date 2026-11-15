// Interaction latency (a lab stand-in for INP): performs the site's main interactions on a phone-sized page
// with a 4× CPU slowdown and records each one's Event Timing duration (input delay + processing + next paint).
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/inp.mjs`.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.addInitScript(() => {
  window.__events = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.interactionId) window.__events.push({ name: entry.name, duration: entry.duration, target: entry.target?.textContent?.trim().slice(0, 30) ?? "" });
    }
  }).observe({ type: "event", durationThreshold: 16, buffered: true });
});
await page.goto(base + "/", { waitUntil: "networkidle" });

const steps = [];
// Scroll the target into view and let the page settle first, so each figure is the tap's own latency rather
// than the scroll that a real visitor would have done beforehand.
async function step(label, action, target) {
  if (target) {
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
  }
  const before = await page.evaluate(() => window.__events.length);
  await action();
  await page.waitForTimeout(400);
  const events = await page.evaluate((from) => window.__events.slice(from), before);
  const worst = Math.max(0, ...events.map((e) => e.duration));
  steps.push({ label, worstMs: Math.round(worst) });
  console.log(`${String(Math.round(worst)).padStart(4)} ms  ${label}`);
}

await step("Open menu", () => page.getByRole("button", { name: "Open menu" }).tap());
await step("Close menu (Esc)", () => page.keyboard.press("Escape"));
const more = page.locator("#premium summary");
await step("Package '+6 more'", () => more.tap(), more);
const dot = page.getByRole("button", { name: "Show Exclusive Package" });
await step("Carousel dot", () => dot.tap(), dot);
const compare = page.getByRole("button", { name: "Compare all packages" });
await step("Compare all packages (sheet)", () => compare.tap(), compare);
await step("Close sheet (Esc)", () => page.keyboard.press("Escape"));
const places = page.getByRole("tab", { name: "Places" });
await step("Places tab", () => places.tap(), places);
await step("Open tile sheet", () => page.getByRole("button", { name: "Lighthouse" }).tap());
await step("Close tile sheet (Esc)", () => page.keyboard.press("Escape"));
const side = page.getByRole("button", { name: "Side", exact: true });
await step("Boat view thumbnail", () => side.tap(), side);
const photo = page.getByRole("button", { name: /^View photo:/ }).first();
await step("Open lightbox", () => photo.tap(), photo);
await step("Next item (→)", () => page.keyboard.press("ArrowRight"));
await step("Close lightbox (Esc)", () => page.keyboard.press("Escape"));
const custom = page.locator("#book form").getByText("Custom", { exact: true });
await step("Booking: choose Custom", () => custom.tap(), custom);
await step("Booking: pick a place", () => page.locator("#book form").getByText("Mangroves", { exact: true }).tap());
await step("Booking: Next", () => page.locator("#book form").getByRole("button", { name: "Next" }).tap());
await step("Booking: add guest", () => page.locator("#book form").getByRole("button", { name: "Add a guest" }).tap());
await step("Booking: type in date", () => page.locator("#book-date").fill("2030-01-01"));

const worst = Math.max(...steps.map((s) => s.worstMs));
console.log(`\nWorst interaction: ${worst} ms (INP target < 200 ms)`);
await browser.close();
await mkdir("artifacts/qa", { recursive: true });
await writeFile("artifacts/qa/inp.json", JSON.stringify({ worstMs: worst, steps }, null, 2));
process.exitCode = worst < 200 ? 0 : 1;
