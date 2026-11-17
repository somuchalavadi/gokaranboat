// Security headers and Content-Security-Policy: every page must send the headers, and loading the pages plus
// the interactive parts (lightbox photo and video, booking form, dialogs) must cause no CSP violations,
// console errors or failed requests.
// Usage: npm run build && npx next start -p 3100 (production CSP; Chrome doesn't upgrade http://localhost),
// then `node scripts/qa/csp.mjs`.
import { chromium } from "playwright";

const base = process.env.QA_URL ?? "http://localhost:3100";
const paths = (process.env.QA_PATHS ?? "/,/packages,/adventures,/this-page-does-not-exist").split(",");
const required = ["content-security-policy", "x-frame-options", "x-content-type-options", "referrer-policy", "permissions-policy", "strict-transport-security"];
let failed = 0;
const report = (ok, message) => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
};

const browser = await chromium.launch();
for (const path of paths) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const problems = [];
  await page.addInitScript(() => {
    window.__violations = [];
    document.addEventListener("securitypolicyviolation", (event) => window.__violations.push(`${event.violatedDirective} ${event.blockedURI}`));
    window.open = () => null;
  });
  page.on("console", (message) => message.type() === "error" && problems.push(`console: ${message.text()}`));
  page.on("pageerror", (error) => problems.push(`page error: ${error.message}`));
  page.on("requestfailed", (request) => problems.push(`failed: ${request.url()} ${request.failure()?.errorText}`));

  const response = await page.goto(base + path, { waitUntil: "networkidle" });
  const headers = response.headers();
  const missing = required.filter((name) => !headers[name]);
  report(missing.length === 0, `${path}: security headers present${missing.length ? ` (missing: ${missing.join(", ")})` : ""}`);

  if (path === "/") {
    // Exercise the parts most likely to trip a CSP: images, the video in the lightbox, dialogs, the form.
    await page.getByRole("button", { name: /^View photo:/ }).first().click();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(1500);
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Compare all packages" }).click();
    await page.keyboard.press("Escape");
    const form = page.locator("#book form");
    await form.getByText("Premium", { exact: true }).click();
    await form.getByRole("button", { name: "Next" }).click();
    await form.locator("#book-date").fill(new Date(Date.now() + 864e5 * 3).toISOString().slice(0, 10));
    await form.getByRole("button", { name: "Next" }).click();
    await form.locator("#book-name").fill("QA");
    await form.locator("#book-phone").fill("9876543210");
    await form.getByRole("button", { name: "Send on WhatsApp" }).click();
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    });
    await page.waitForTimeout(800);
  }
  const violations = await page.evaluate(() => window.__violations);
  // The 404 page's own 404 response is expected; ignore it.
  const real = problems.filter((p) => !(path.includes("does-not-exist") && /404/.test(p)));
  report(violations.length === 0, `${path}: no CSP violations${violations.length ? ` (${violations.join(" | ")})` : ""}`);
  report(real.length === 0, `${path}: no console errors or failed requests${real.length ? ` (${real.slice(0, 4).join(" | ")})` : ""}`);
  await context.close();
}
await browser.close();
process.exitCode = failed ? 1 : 0;
