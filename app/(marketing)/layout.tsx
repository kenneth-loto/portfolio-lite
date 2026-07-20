import type { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { SkipToContent } from "@/components/shared/skip-to-content";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col px-6 py-4 outline-none"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
