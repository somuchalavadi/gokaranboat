import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/url";

// Search and AI-assistant crawlers are named explicitly, so the policy is unambiguous to each of them:
// all of them may read the whole site. Change a group here to opt a crawler out.
const crawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Bingbot",
  "Googlebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [...crawlers.map((userAgent) => ({ userAgent, allow: "/" })), { userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
