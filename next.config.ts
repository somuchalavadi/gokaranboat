import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
