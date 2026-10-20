import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* File-backed admin APIs need classic request-time rendering */
  allowedDevOrigins: [
    "127.0.0.1",
    "*.trycloudflare.com",
    "*.loca.lt",
  ],
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
