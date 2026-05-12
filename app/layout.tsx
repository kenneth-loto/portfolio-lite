import type { Metadata } from "next";
import "@/app/globals.css";
import { RscBoundaryProvider } from "@rsc-boundary/next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
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
  title: {
    default: "Kenneth Loto",
    template: "%s - Kenneth Loto",
  },
  description: "This is a sample description.",
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
        <RscBoundaryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </RscBoundaryProvider>
      </body>
    </html>
  );
}
