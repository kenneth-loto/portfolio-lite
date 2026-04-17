"use client";

import { TerminalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex items-center justify-between border-b py-4">
        <Link href="/">
          <TerminalIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Nav Links — centered */}
        {/* TODO: Make use of burger menu on mobile */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "ghost-text-active" : "ghost-text",
                    }),
                    "h-auto p-0",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/"
          className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
        >
          Hire Me
        </Link>
      </nav>
    </header>
  );
}
