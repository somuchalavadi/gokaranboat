// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver and others share submissions).
// Run after a production deploy: `node scripts/indexnow.mjs` (the GitHub Action does this on every push to main).
// The key file public/<key>.txt proves ownership; it must be live before submitting.
import { readdirSync } from "node:fs";

const site = process.env.SITE_URL ?? "https://www.therudraadventure.com";
const keyFile = readdirSync("public").find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("No IndexNow key file (public/<32 hex chars>.txt) found.");
const key = keyFile.replace(/\.txt$/, "");
const host = new URL(site).host;

const keyCheck = await fetch(`${site}/${keyFile}`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== key) throw new Error(`Key file isn't live yet at ${site}/${keyFile} (status ${keyCheck.status}).`);

const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).filter((url) => new URL(url).host === host);
if (!urlList.length) throw new Error("The sitemap has no URLs for this host.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, status ${response.status} ${response.statusText}`);
// 200 = accepted, 202 = accepted (key validation pending). Anything else is a failure.
if (![200, 202].includes(response.status)) {
  console.error(await response.text());
  process.exit(1);
}
