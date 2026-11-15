// Set NEXT_PUBLIC_SITE_URL to move the canonical URL to a custom domain.
const fallback = "https://therudragokarna.vercel.app";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
