// Next.js config: long browser cache for the heavy videos, textures and images in /public
import type { NextConfig } from "next";

const week = "public, max-age=604800, stale-while-revalidate=2592000";

const nextConfig: NextConfig = {
  images: { minimumCacheTTL: 2678400 },
  async headers() {
    return ["video", "art", "earth", "ecosystem", "homepage"].map((folder) => ({
      source: `/${folder}/:path*`,
      headers: [{ key: "Cache-Control", value: week }],
    }));
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
