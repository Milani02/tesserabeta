import type { MetadataRoute } from "next";

import { properties } from "@/lib/properties";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${siteUrl}/imovel/${property.code}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...propertyEntries,
  ];
}
