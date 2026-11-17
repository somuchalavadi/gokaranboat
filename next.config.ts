import type { NextConfig } from "next";

// Content-Security-Policy for production builds only (`next dev` needs eval). No nonces, so pages stay static:
// Next's inline bootstrap scripts need 'unsafe-inline'. Analytics hosts are added only when they're used.
const deployment = process.env.VERCEL_ENV;
const cspEnabled = process.env.NODE_ENV === "production" && deployment !== "preview" && deployment !== "development";
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self' blob:",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ...(cspEnabled ? [{ key: "Content-Security-Policy", value: csp }] : []),
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Capped at 1920 so a 3840px request can't happen; source images are 1600px wide at most anyway.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [75],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // www.therudraadventure.com is the only official address. The old Vercel address and the bare domain
      // redirect to it (308), keeping the path. Preview-deployment hosts are left alone.
      ...["therudragokarna.vercel.app", "therudraadventure.com"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://www.therudraadventure.com/:path*",
        permanent: true,
      })),
      // Pages that only duplicated home content now point at the matching section (308).
      { source: "/contact", destination: "/#book", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/gallery", destination: "/#gallery", permanent: true },
      { source: "/new-year", destination: "/#events", permanent: true },
      { source: "/guides", destination: "/guides/gokarna-boat-trip-guide", permanent: true },
    ];
  },
};

export default nextConfig;
