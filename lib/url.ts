// The official address. Canonical URLs, Open Graph, JSON-LD, sitemap.xml and robots.txt all build on it.
// NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging copy).
const fallback = "https://www.therudraadventure.com";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
