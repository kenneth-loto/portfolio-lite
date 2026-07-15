import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { baseUrl } from "@/app/sitemap";
import { cn } from "@/lib/utils";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: "#1c1c1e",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Full-Stack Developer in the Philippines | Kenneth Loto",
    template: "%s — Kenneth Loto",
  },
  description:
    "Philippines-based Full-Stack Developer building web apps and APIs with Next.js, NestJS & TypeScript. Open to remote junior and entry-level roles.",
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    title: "Kenneth Loto",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Full-Stack Developer in the Philippines | Kenneth Loto",
    description:
      "Philippines-based Full-Stack Developer building web apps and APIs with Next.js, NestJS & TypeScript. Open to remote junior and entry-level roles.",
    url: baseUrl,
    siteName: "Kenneth Loto",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og`,
        width: 1200,
        height: 630,
        alt: "Kenneth Loto — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kenneth_loto",
    title: "Full-Stack Developer in the Philippines | Kenneth Loto",
    description:
      "Philippines-based Full-Stack Developer building web apps and APIs with Next.js, NestJS & TypeScript. Open to remote junior and entry-level roles.",
    images: [
      {
        url: `${baseUrl}/og`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", spaceMono.variable)}
      suppressHydrationWarning
    >
      <body className="mx-auto flex min-h-full max-w-2xl flex-col">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is JSON.stringify'd and HTML-escaped via replace(/</g, ...) to prevent script-tag breakout
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kenneth Loto",
              url: baseUrl,
              jobTitle: "Full-Stack Developer",
              email: "kennethloto.dev@gmail.com",
              description:
                "Philippines-based Full-Stack Developer building web apps and APIs with Next.js, NestJS & TypeScript. Open to remote junior and entry-level roles.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PH",
                addressRegion: "Eastern Visayas",
              },
              knowsAbout: [
                "Next.js",
                "NestJS",
                "TypeScript",
                "React",
                "Laravel",
                "PostgreSQL",
                "Full-Stack Development",
                "Backend Development",
                "GIS",
              ],
              alumniOf: {
                "@type": "Organization",
                name: "Biliran Province State University",
              },
              sameAs: [
                "https://github.com/kenneth-loto",
                "https://www.linkedin.com/in/kenneth-loto",
                "https://x.com/kenneth_loto",
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
