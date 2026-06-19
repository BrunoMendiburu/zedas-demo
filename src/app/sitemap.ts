import type { MetadataRoute } from "next";

const SITE_URL = "https://zedas.example.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-19");
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/map`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
