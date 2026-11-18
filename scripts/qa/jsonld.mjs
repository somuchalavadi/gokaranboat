// Structured-data check for every page in the sitemap (plus the 404): each JSON-LD block parses; each node has
// @context and @type; required properties per type are present; every {"@id": …} reference resolves to a node on
// the same page; WebPage dates are ISO dates; and nothing marks up AggregateRating or Review for the business.
// Usage: with the site running on QA_URL (default http://localhost:3100): `node scripts/qa/jsonld.mjs`.
const base = process.env.QA_URL ?? "http://localhost:3100";

const required = {
  LocalBusiness: ["name", "url", "telephone", "address"],
  WebSite: ["name", "url"],
  WebPage: ["url", "name", "isPartOf", "about", "datePublished", "dateModified"],
  AboutPage: ["url", "name", "isPartOf", "about", "datePublished", "dateModified"],
  CollectionPage: ["url", "name", "isPartOf", "about", "datePublished", "dateModified"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Article: ["headline", "image", "datePublished", "dateModified", "author", "publisher"],
  TouristTrip: ["name", "description", "provider"],
  ItemList: ["itemListElement"],
  Dataset: ["name", "description"],
};
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat(["/this-page-does-not-exist"]);
let errors = 0;
let blocks = 0;

for (const path of paths) {
  const html = await (await fetch(base + path)).text();
  const nodes = [];
  const problems = [];
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++;
    try {
      const data = JSON.parse(match[1]);
      if (!data["@context"]) problems.push("block without @context");
      nodes.push(data);
    } catch (error) {
      problems.push(`unparseable block: ${error.message}`);
    }
  }
  // Walk every object: collect defined @ids, references, and check types.
  const defined = new Set();
  const refs = [];
  const walk = (node, top) => {
    if (Array.isArray(node)) return node.forEach((item) => walk(item, false));
    if (!node || typeof node !== "object") return;
    const keys = Object.keys(node);
    if (node["@id"] && keys.length === 1) refs.push(node["@id"]);
    else if (node["@id"]) defined.add(node["@id"]);
    const types = [].concat(node["@type"] ?? []);
    if (top && !types.length) problems.push("top-level node without @type");
    for (const type of types) {
      if (type === "AggregateRating" || type === "Review") problems.push(`${type} markup found`);
      for (const prop of required[type] ?? []) if (node[prop] === undefined || node[prop] === null || (Array.isArray(node[prop]) && !node[prop].length)) problems.push(`${type} missing ${prop}`);
      if (["WebPage", "AboutPage", "CollectionPage", "Article"].includes(type))
        for (const prop of ["datePublished", "dateModified"]) if (node[prop] && !isoDate.test(node[prop])) problems.push(`${type}.${prop} not an ISO date: ${node[prop]}`);
      if (type === "FAQPage") for (const q of node.mainEntity ?? []) if (!q.name || !q.acceptedAnswer?.text) problems.push("FAQPage question without name or answer");
      if (type === "BreadcrumbList") node.itemListElement?.forEach((item, index) => item.position !== index + 1 && problems.push("BreadcrumbList positions out of order"));
    }
    for (const value of Object.values(node)) if (typeof value === "object") walk(value, false);
  };
  nodes.forEach((node) => walk(node, true));
  for (const ref of refs) if (!defined.has(ref)) problems.push(`unresolved @id reference ${ref}`);
  const isNotFound = path === "/this-page-does-not-exist";
  if (!isNotFound && !nodes.some((n) => ["WebPage", "AboutPage", "CollectionPage"].some((t) => [].concat(n["@type"]).includes(t)))) problems.push("no WebPage node");
  errors += problems.length;
  const types = nodes.map((n) => [].concat(n["@type"]).join("+")).join(", ");
  console.log(`${problems.length ? "FAIL" : "PASS"}  ${path.padEnd(52)} ${types}`);
  for (const problem of [...new Set(problems)]) console.log(`        ${problem}`);
}
console.log(`\n${paths.length} pages, ${blocks} JSON-LD blocks, ${errors} errors`);
process.exitCode = errors ? 1 : 0;
