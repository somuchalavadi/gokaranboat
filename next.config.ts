import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Capped at 1920 so a 3840px request can't happen; source images are 1600px wide at most anyway.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    qualities: [75],
  },
  // Pages that only duplicated home content now point at the matching section (308).
  async redirects() {
    return [
      { source: "/contact", destination: "/#book", permanent: true },
      { source: "/about", destination: "/#boat", permanent: true },
      { source: "/gallery", destination: "/#gallery", permanent: true },
      { source: "/new-year", destination: "/#events", permanent: true },
      { source: "/guides", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
