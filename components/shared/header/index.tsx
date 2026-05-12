import Link from "next/link";
import { LogoLink } from "@/components/shared/header/logo-link";
import { MobileNav } from "@/components/shared/header/mobile-nav";
import { NavLinks } from "@/components/shared/header/nav-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex items-center justify-between border-b py-4">
        <LogoLink />

        <NavLinks />

        <Link
          href="/#connect"
          className={cn(
            buttonVariants({ variant: "link" }),
            "hidden h-auto p-0 md:inline-flex",
          )}
        >
          Hire me
        </Link>

        <MobileNav />
      </nav>
    </header>
  );
}
