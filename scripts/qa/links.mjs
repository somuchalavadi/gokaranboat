// Checks every WhatsApp, phone and pick-up map link, drives the booking form end to end, and exercises the
// menu, compare sheet, tabs, tile sheet and lightbox (keyboard + focus return).
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/links.mjs`.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
// Every page with links to check (add new routes here).
const pages = ["/", "/packages", "/adventures", "/dolphin-watching-gokarna", "/kayaking-in-gokarna", "/snorkelling-in-gokarna", "/mangrove-river-trip-gokarna", "/fishing-trip-gokarna", "/bioluminescence-gokarna", "/private-boat-gokarna", "/guides/gokarna-boat-trip-guide", "/guides/how-to-reach-gokarna-beach-boat-pickup", "/guides/best-time-for-dolphin-watching-gokarna"];
// The one business number, used for both calls and WhatsApp.
const number = "917019745857";
const phones = new Set(["tel:+917019745857"]);
const mapsUrl = "https://maps.app.goo.gl/s4jSzvA6cUZmsFzZ6";
// Outbound booking and map links must be rel="nofollow noopener".
const relOk = (rel) => ["nofollow", "noopener"].every((token) => rel.split(/\s+/).includes(token));
const results = { links: [], checks: [], bookingMessages: [], consoleErrors: [] };
let failed = 0;

function check(name, ok, detail = "") {
  results.checks.push({ name, ok, detail });
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
}

// Polls a condition for up to 3 s: UI updates after a click can land a frame or two later, especially while
// the page is still hydrating, so a single immediate read would make the checks flaky.
async function eventually(condition, timeout = 3000) {
  const end = Date.now() + timeout;
  for (;;) {
    if (await condition()) return true;
    if (Date.now() > end) return false;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

const browser = await chromium.launch();

// 1. Every wa.me and tel: link on every page, at phone and desktop widths.
for (const path of pages) {
  for (const width of [375, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => ({ href: a.getAttribute("href"), text: (a.getAttribute("aria-label") || a.textContent || "").trim(), target: a.target, rel: a.rel })));
    for (const link of hrefs) {
      if (link.href.startsWith("https://wa.me/")) {
        const url = new URL(link.href);
        const message = url.searchParams.get("text") ?? "";
        const ok = url.pathname === `/${number}` && message.trim().length > 0 && link.target === "_blank" && relOk(link.rel);
        results.links.push({ path, width, kind: "whatsapp", text: link.text, message, ok });
        if (!ok) check(`WhatsApp link on ${path} @${width}: "${link.text}"`, false, link.href);
      } else if (link.href.startsWith("tel:")) {
        const ok = phones.has(link.href);
        results.links.push({ path, width, kind: "tel", text: link.text, href: link.href, ok });
        if (!ok) check(`Phone link on ${path} @${width}`, false, link.href);
      } else if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/.test(link.href)) {
        const ok = link.href === mapsUrl && link.target === "_blank" && relOk(link.rel);
        results.links.push({ path, width, kind: "maps", text: link.text, href: link.href, ok });
        if (!ok) check(`Map link on ${path} @${width}: "${link.text}"`, false, `${link.href} target=${link.target} rel=${link.rel}`);
      }
    }
    await page.close();
  }
}
const wa = results.links.filter((l) => l.kind === "whatsapp");
const tel = results.links.filter((l) => l.kind === "tel");
const maps = results.links.filter((l) => l.kind === "maps");
check(`All WhatsApp links use ${number}, open in a new tab with rel="nofollow noopener" and carry a message`, wa.length > 0 && wa.every((l) => l.ok), `${wa.length} links`);
check(`All phone links are tel:+${number}`, tel.length > 0 && tel.every((l) => l.ok), `${tel.length} links`);
check('All pick-up links use the Google Maps short link, in a new tab with rel="nofollow noopener"', maps.length > 0 && maps.every((l) => l.ok), `${maps.length} links`);
const homeMobile = wa.filter((l) => l.path === "/" && l.width === 375);
console.log(`\nWhatsApp CTAs on home @375: ${homeMobile.length}`);
for (const l of homeMobile) console.log(`  • ${l.text.replace(/\s+/g, " ").slice(0, 50).padEnd(50)} → "${l.message}"`);

// 2. Booking form, custom trip, on a phone.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  page.on("console", (msg) => msg.type() === "error" && results.consoleErrors.push(msg.text()));
  page.on("pageerror", (error) => results.consoleErrors.push(String(error)));
  await page.goto(base + "/#book", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(String(url));
      return null;
    };
  });
  const form = page.locator("#book form");
  await form.getByRole("button", { name: "Next" }).click();
  check("Step 1 blocks without a trip and shows an inline error", await form.getByText("Choose a trip to continue.").isVisible());
  await form.getByText("Custom", { exact: true }).click();
  check("Custom reveals place chips and the 2/3/4-hour control", (await form.getByText("Lighthouse", { exact: true }).isVisible()) && (await form.getByText("4 hrs").isVisible()));
  await form.getByText("Lighthouse", { exact: true }).click();
  await form.getByText("Mangroves", { exact: true }).click();
  await form.getByText("4 hrs").click();
  await form.getByRole("button", { name: "Next" }).click();
  check("Step 2 heading receives focus", await eventually(async () => (await page.evaluate(() => document.activeElement?.id)) === "book-step-title"));
  await form.getByRole("button", { name: "Next" }).click();
  check("Step 2 blocks without a date", await form.getByText("Choose a date.").isVisible());
  const min = await form.locator("#book-date").getAttribute("min");
  check("Date input has min = today", min === new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10), `min=${min}`);
  await form.locator("#book-date").fill("2020-01-01");
  await form.getByRole("button", { name: "Next" }).click();
  check("Past dates are rejected", await form.getByText("Choose today or a later date.").isVisible());
  const future = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  await form.locator("#book-date").fill(future);
  await form.getByRole("button", { name: "Add a guest" }).click();
  await form.getByRole("button", { name: "Add a guest" }).click();
  check("Guest stepper starts at 2 and counts up", (await form.locator("#book-guests").inputValue()) === "4");
  await form.getByRole("button", { name: "Next" }).click();
  await form.locator("#book-name").fill("Test Guest");
  await form.locator("#book-phone").fill("12345");
  await form.getByRole("button", { name: "Send on WhatsApp" }).click();
  check("Invalid phone numbers are rejected", await form.getByText(/10-digit Indian mobile number/).isVisible());
  check("The invalid field is marked aria-invalid and described by its error", (await form.locator("#book-phone").getAttribute("aria-invalid")) === "true" && (await form.locator("#book-phone").getAttribute("aria-describedby")) === "book-phone-error");
  await form.locator("#book-phone").fill("+91 98765 43210");
  await form.getByRole("button", { name: "Send on WhatsApp" }).click();
  const opened = await page.evaluate(() => window.__opened);
  const message = opened[0] ? new URL(opened[0]).searchParams.get("text") : "";
  results.bookingMessages.push(message);
  check(`Submit opens wa.me/${number} with the details`, opened.length === 1 && opened[0].startsWith(`https://wa.me/${number}?text=`));
  check(
    "Custom message lists trip, places, length, date, guests, name and phone",
    ["Trip: Custom trip", "Places: Lighthouse, Mangroves", "Length: 4 hours", "Guests: 4", "Name: Test Guest", "Phone: +91 98765 43210"].every((line) => message.includes(line)) && /Date: \w{3}, \d{1,2} \w{3,4} \d{4}\n/.test(message),
  );
  const status = await form.getByRole("status").innerText();
  check('Status says "Opening WhatsApp…" and never claims it was sent', status.startsWith("Opening WhatsApp…") && !/sent/i.test(status), status);
  console.log(`\nCustom booking message:\n${message}\n`);
  await page.close();
}

// 3. Booking form, package trip, on desktop.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/#book", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (url) => {
      window.__opened.push(String(url));
      return null;
    };
  });
  const form = page.locator("#book form");
  await form.getByText("Premium", { exact: true }).click();
  await form.getByRole("button", { name: "Next" }).click();
  await form.locator("#book-date").fill(new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10));
  await form.getByRole("button", { name: "Next" }).click();
  await form.locator("#book-name").fill("Asha");
  await form.locator("#book-phone").fill("09876543210");
  await form.locator("#book-phone").press("Enter");
  const opened = await page.evaluate(() => window.__opened);
  const message = opened[0] ? new URL(opened[0]).searchParams.get("text") : "";
  results.bookingMessages.push(message);
  check("Package message names the package and its length, with no custom lines", message.includes("Trip: Premium Package (3 hours)") && !message.includes("Places:") && !message.includes("Length:") && message.includes("Guests: 2"));
  check("Enter on the last step submits", opened.length === 1);
  console.log(`\nPackage booking message:\n${message}\n`);
  await page.close();
}

// 4. Dialogs, tabs and the lightbox.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  page.on("pageerror", (error) => results.consoleErrors.push(String(error)));
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const menuButton = page.getByRole("button", { name: "Open menu" });
  await menuButton.click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  check("Menu opens as a modal dialog", await menu.isVisible());
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  check("Focus stays inside the open menu", await page.evaluate(() => Boolean(document.activeElement?.closest("dialog[open]"))));
  await page.keyboard.press("Escape");
  check("Esc closes the menu and focus returns to the menu button", await eventually(async () => !(await menu.isVisible()) && (await page.evaluate(() => document.activeElement?.getAttribute("aria-label"))) === "Open menu"));
  await menuButton.click();
  await menu.getByRole("link", { name: "Book", exact: true }).click();
  await page.waitForTimeout(1200);
  const bookTop = await page.evaluate(() => document.getElementById("book").getBoundingClientRect().top);
  check("A menu link closes the menu and scrolls to its section", !(await menu.isVisible()) && bookTop >= 0 && bookTop < 120, `#book top ${Math.round(bookTop)}px`);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: "Compare all packages" }).click();
  const sheet = page.getByRole("dialog", { name: "Compare all packages" });
  check("Compare opens as a bottom sheet on phones", (await sheet.isVisible()) && (await sheet.getByRole("table").isVisible()));
  await page.keyboard.press("Escape");
  // Wait for the close (and its focus return to the Compare button) before focusing anything else.
  check("Esc closes the compare sheet and focus returns to its button", await eventually(async () => !(await sheet.isVisible()) && (await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Compare all packages"));

  const tab = page.getByRole("tab", { name: "Activities" });
  await tab.focus();
  await page.keyboard.press("ArrowRight");
  check("Arrow keys move between the Activities/Places tabs", await eventually(async () => (await page.getByRole("tab", { name: "Places" }).getAttribute("aria-selected")) === "true"));
  await page.keyboard.press("ArrowLeft");
  const backToActivities = await eventually(async () => (await page.getByRole("tab", { name: "Activities" }).getAttribute("aria-selected")) === "true");
  check("← moves back to the Activities tab", backToActivities, backToActivities ? "" : `focus was on: ${await page.evaluate(() => `${document.activeElement?.tagName} "${document.activeElement?.textContent?.trim().slice(0, 30)}"`)}`);
  if (!backToActivities) await page.getByRole("tab", { name: "Activities" }).click();
  await page.getByRole("button", { name: "Kayaking" }).click();
  const tile = page.getByRole("dialog", { name: "Kayaking" });
  const tileText = await tile.innerText();
  check('Tile sheet shows "Included in" computed from package data', /Included in: Premium Package, River Trips/.test(tileText), tileText.replace(/\s+/g, " ").slice(0, 120));
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: /^View photo:/ }).first().click();
  const lightbox = page.getByRole("dialog", { name: "Gallery" });
  check("Lightbox opens on the first item", await eventually(async () => (await lightbox.isVisible()) && /1 of 6/.test(await lightbox.innerText())));
  await page.keyboard.press("ArrowRight");
  check("→ moves to the next item", await eventually(async () => /2 of 6/.test(await lightbox.innerText())));
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  check("← wraps around to the last item", await eventually(async () => /6 of 6/.test(await lightbox.innerText())));
  check("Videos in the lightbox use preload=none", (await lightbox.locator("video").getAttribute("preload")) === "none");
  const box = await lightbox.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await lightbox.dispatchEvent("touchstart", { touches: [{ identifier: 1, clientX: 300, clientY: 400 }] }).catch(() => {});
  await page.keyboard.press("Escape");
  check("Esc closes the lightbox and focus returns to the opening tile", await eventually(async () => !(await lightbox.isVisible()) && (await page.evaluate(() => document.activeElement?.getAttribute("data-gallery-open"))) === "0"));
  check("Gallery grid loads no video before the lightbox opens", await eventually(async () => (await page.locator("#gallery video").count()) === 0));
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Compare all packages" }).click();
  check("Compare expands inline on desktop", await page.locator("#compare-inline table").isVisible());
  check("No mobile bottom bar on desktop", !(await page.getByRole("region", { name: "Quick contact" }).isVisible()));
  await page.close();
}
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const bar = page.getByRole("region", { name: "Quick contact", includeHidden: true });
  check("Mobile bar is hidden over the hero", !(await bar.isVisible()));
  await page.evaluate(() => document.getElementById("experiences").scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(500);
  check("Mobile bar appears after the hero", await bar.isVisible());
  await page.evaluate(() => document.getElementById("book").scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(500);
  check("Mobile bar hides while #book is on screen", !(await bar.isVisible()));
  await page.evaluate(() => document.getElementById("faq").scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(500);
  check("Mobile bar comes back between #book and the footer", await bar.isVisible());
  await page.evaluate(() => document.getElementById("site-footer").scrollIntoView({ behavior: "instant" }));
  await page.waitForTimeout(500);
  check("Mobile bar hides while the footer is on screen", !(await bar.isVisible()));
  await page.close();
}

await browser.close();
check("No console errors or page errors", results.consoleErrors.length === 0, results.consoleErrors.join(" | "));
await mkdir("artifacts/qa", { recursive: true });
await writeFile("artifacts/qa/links.json", JSON.stringify(results, null, 2));
console.log(`\n${results.checks.length - failed}/${results.checks.length} checks passed`);
process.exitCode = failed ? 1 : 0;
