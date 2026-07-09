import type { MetadataRoute } from "next";
import { clientEnv } from "@/env";

export const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];
}
