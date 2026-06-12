import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { baseUrl } from "@/app/sitemap";
import { ThemeProvider } from "@/components/theme-provider";
import { ogImages } from "@/lib/og";
import { cn } from "@/lib/utils";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kenneth Loto — Full-Stack Developer",
    template: "%s — Kenneth Loto",
  },
  description:
    "Full-Stack Developer building web and mobile applications with React, Laravel, Flutter, and TypeScript. Currently open to junior and entry-level roles.",
  appleWebApp: {
    title: "Kenneth Loto",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Kenneth Loto — Full-Stack Developer",
    description:
      "Full-stack developer building apps with React, Laravel, Flutter & TypeScript. Currently open to junior & entry-level roles.",
    url: baseUrl,
    siteName: "Kenneth Loto",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImages.home,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenneth Loto — Full-Stack Developer",
    description:
      "Full-Stack Developer building web and mobile applications with React, Laravel, Flutter, and TypeScript. Currently open to junior and entry-level roles.",
    images: [
      {
        url: ogImages.home,
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
      className={cn(
        "h-full",
        "antialiased",
        ibmPlexSans.variable,
        jetBrainsMono.variable,
      )}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="mx-auto flex min-h-full max-w-2xl flex-col px-6">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is static and trusted
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kenneth Loto",
              url: "https://www.kennethloto.dev",
              jobTitle: "Full-Stack Developer",
              email: "kennethloto.dev@gmail.com",
              sameAs: [
                "https://github.com/kenneth-loto",
                "https://www.linkedin.com/in/kenneth-loto/",
              ],
              description:
                "Full-Stack Developer building web and mobile applications with React, Laravel, Flutter, and TypeScript. Currently open to junior and entry-level roles.",
            }),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
