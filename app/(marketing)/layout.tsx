import type { ReactNode } from "react";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { SkipToContent } from "@/components/skip-to-content";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
