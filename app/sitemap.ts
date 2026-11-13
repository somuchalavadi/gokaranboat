import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { const url = site.url || "https://therudragokarna.vercel.app"; return ["", "/adventures", "/packages", "/gallery", "/about", "/contact"].map(path => ({ url: `${url}${path}`, lastModified: new Date() })); }
