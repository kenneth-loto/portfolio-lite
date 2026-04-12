import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const commitMono = localFont({
  src: "./fonts/CommitMonoVariableFont.woff2",
  variable: "--font-commit-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Kenneth Loto",
    template: "%s - Kenneth Loto",
  },
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", commitMono.variable)}
      suppressHydrationWarning
    >
      <body className="mx-auto flex min-h-full w-full max-w-2xl flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
