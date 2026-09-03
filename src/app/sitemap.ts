import type { MetadataRoute } from "next";
import { config } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
