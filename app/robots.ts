import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
export default function robots(): MetadataRoute.Robots { const url = site.url || "https://therudragokarna.vercel.app"; return { rules: { userAgent: "*", allow: "/" }, sitemap: `${url}/sitemap.xml` }; }
