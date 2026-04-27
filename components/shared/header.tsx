"use client";

import { Menu, TerminalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleScrollTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.documentElement.scrollIntoView();
    router.replace("/", { scroll: false });
  };

  const handleScrollToConnect = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      document.getElementById("connect")?.scrollIntoView();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex items-center justify-between border-b py-4">
        {/* Logo */}
        <Link href="/" onClick={handleScrollTop} aria-label="Home">
          <TerminalIcon className="size-4" aria-hidden="true" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.href === "/" ? handleScrollTop : undefined}
                  className={cn(
                    buttonVariants({
                      variant: isActive ? "ghost-text-active" : "ghost-text",
                      size: "xs",
                    }),
                    "h-auto p-0 uppercase tracking-wide",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/#connect"
          onClick={handleScrollToConnect}
          className={cn(
            buttonVariants({ variant: "link" }),
            "hidden h-auto p-0 md:inline-flex",
          )}
        >
          Hire me
        </Link>

        {/* Mobile Burger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            }
          />

          <SheetContent side="right" className="flex flex-col gap-6 pt-12">
            <ul className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <li key={link.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <Link
                          href={link.href}
                          onClick={
                            link.href === "/" ? handleScrollTop : undefined
                          }
                          className={cn(
                            buttonVariants({
                              variant: isActive
                                ? "ghost-text-active"
                                : "ghost-text",
                              size: "xs",
                            }),
                            "h-auto p-0 uppercase tracking-wide",
                          )}
                        >
                          {link.label}
                        </Link>
                      }
                    />
                  </li>
                );
              })}
            </ul>

            {/* CTA inside sheet */}
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/#connect"
                  onClick={handleScrollToConnect}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto self-start p-0 px-4",
                  )}
                >
                  Hire me
                </Link>
              }
            />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
