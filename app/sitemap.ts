import type { MetadataRoute } from "next";
import { clientEnv } from "@/env";

export const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: new URL("/privacy-policy", baseUrl).href,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
