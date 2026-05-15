import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { baseUrl } from "@/app/sitemap";
import { ThemeProvider } from "@/components/theme-provider";
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
    default: "Kenneth Loto",
    template: "%s - Kenneth Loto",
  },
  description:
    "Full-Stack Developer building web applications that are well-structured, maintainable, and built to last.",
  appleWebApp: {
    title: "Kenneth Loto",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Kenneth Loto",
    description:
      "Full-Stack Developer building web applications that are well-structured, maintainable, and built to last.",
    url: baseUrl,
    siteName: "Kenneth Loto",
    locale: "en_US",
    type: "website",
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
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
