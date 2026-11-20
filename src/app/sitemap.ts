import type { MetadataRoute } from "next";

const SITE_URL = "https://www.lehighpmr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/rentals`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
