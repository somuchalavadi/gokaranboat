// Runs after `next build` (npm "postbuild", so on Vercel too): every prerendered page must have a <title> of at
// most 60 characters and a meta description of at most 155. Any violation fails the build.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const LIMITS = { title: 60, description: 155 };
const root = ".next/server/app";

async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const problems = [];
const rows = [];
for (const file of await htmlFiles(root)) {
  const html = await readFile(file, "utf8");
  const route = "/" + path.relative(root, file).replace(/\\/g, "/").replace(/\.html$/, "").replace(/^index$/, "");
  // Next's global error boundary is prerendered but never served at a URL.
  if (route === "/_global-error") continue;
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  rows.push({ route, title: title.length, description: description.length });
  if (!title) problems.push(`${route}: missing <title>`);
  else if (title.length > LIMITS.title) problems.push(`${route}: title is ${title.length} chars (max ${LIMITS.title}): "${title}"`);
  if (!description) problems.push(`${route}: missing meta description`);
  else if (description.length > LIMITS.description) problems.push(`${route}: description is ${description.length} chars (max ${LIMITS.description}): "${description}"`);
}

for (const row of rows.sort((a, b) => a.route.localeCompare(b.route))) console.log(`meta  ${row.route.padEnd(48)} title ${String(row.title).padStart(3)}  description ${String(row.description).padStart(3)}`);
if (problems.length) {
  console.error(`\nTitle/description check failed:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`meta  ${rows.length} pages within ${LIMITS.title}/${LIMITS.description} characters`);
