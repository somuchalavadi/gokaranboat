// Initial page weight and image audit: what the home page downloads before any scrolling, which image
// widths are requested, and which images load eagerly. Hero video bytes are reported separately.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/network.mjs`.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.QA_URL ?? "http://localhost:3100";
const profiles = [
  { name: "mobile 375×812 @2.625x", viewport: { width: 375, height: 812 }, deviceScaleFactor: 2.625, isMobile: true, hasTouch: true },
  { name: "desktop 1440×900 @1x", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
];

const browser = await chromium.launch();
const out = [];
for (const profile of profiles) {
  const context = await browser.newContext({ viewport: profile.viewport, deviceScaleFactor: profile.deviceScaleFactor, isMobile: profile.isMobile, hasTouch: profile.hasTouch });
  const page = await context.newPage();
  const responses = [];
  page.on("response", (response) => responses.push(response));
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.waitForTimeout(3000); // let the deferred hero video start on desktop
  const rows = [];
  for (const response of responses) {
    const sizes = await response.request().sizes().catch(() => null);
    const url = new URL(response.url());
    rows.push({
      path: url.pathname === "/_next/image" ? `/_next/image ${url.searchParams.get("url")} w=${url.searchParams.get("w")}` : url.pathname,
      type: response.request().resourceType(),
      bytes: sizes ? sizes.responseBodySize + sizes.responseHeadersSize : 0,
      width: url.pathname === "/_next/image" ? Number(url.searchParams.get("w")) : null,
    });
  }
  const isHeroVideo = (row) => row.path.startsWith("/videos/hero-loop");
  const total = rows.filter((row) => !isHeroVideo(row)).reduce((sum, row) => sum + row.bytes, 0);
  const video = rows.filter(isHeroVideo).reduce((sum, row) => sum + row.bytes, 0);
  const byType = {};
  for (const row of rows.filter((r) => !isHeroVideo(r))) byType[row.type] = (byType[row.type] ?? 0) + row.bytes;
  const images = await page.$$eval("img", (imgs) =>
    imgs.map((img) => ({ src: img.currentSrc.replace(location.origin, ""), loading: img.loading, fetchPriority: img.fetchPriority, sizes: img.sizes, inViewport: img.getBoundingClientRect().top < innerHeight })),
  );
  const result = {
    profile: profile.name,
    initialKB: +(total / 1024).toFixed(1),
    heroVideoKB: +(video / 1024).toFixed(1),
    byTypeKB: Object.fromEntries(Object.entries(byType).map(([type, bytes]) => [type, +(bytes / 1024).toFixed(1)])),
    maxImageWidth: Math.max(0, ...rows.filter((row) => row.width).map((row) => row.width)),
    requests: rows.filter((row) => !isHeroVideo(row)).length,
    eagerImages: images.filter((img) => img.loading === "eager").map((img) => img.src),
    imagesMissingSizes: images.filter((img) => img.src.includes("/_next/image") && !img.sizes && !/ \dx/.test(img.src)).map((img) => img.src),
    largest: rows
      .filter((row) => !isHeroVideo(row))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8)
      .map((row) => `${(row.bytes / 1024).toFixed(1)} KB  ${row.type.padEnd(10)} ${row.path}`),
  };
  out.push(result);
  console.log(`\n${result.profile}: ${result.initialKB} KB initial over ${result.requests} requests (hero video ${result.heroVideoKB} KB, excluded); widest image requested w=${result.maxImageWidth}`);
  console.log("  by type:", JSON.stringify(result.byTypeKB));
  console.log("  eager images:", result.eagerImages.join(", "));
  for (const line of result.largest) console.log("  " + line);
  await context.close();
}
await browser.close();
await mkdir("artifacts/qa", { recursive: true });
await writeFile("artifacts/qa/network.json", JSON.stringify(out, null, 2));
