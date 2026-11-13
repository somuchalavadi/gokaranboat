import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap { if (!site.url) return []; return ["", "/adventures", "/packages", "/gallery", "/about", "/contact"].map(path => ({ url: `${site.url}${path}`, lastModified: new Date() })); }
