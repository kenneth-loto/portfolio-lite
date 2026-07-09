import { baseUrl } from "@/app/sitemap";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/og/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
