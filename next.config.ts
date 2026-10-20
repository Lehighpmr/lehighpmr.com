import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* File-backed admin APIs need classic request-time rendering */
  allowedDevOrigins: [
    "127.0.0.1",
    "*.trycloudflare.com",
    "*.loca.lt",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
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
