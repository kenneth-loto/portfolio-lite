"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollTo } from "@/hooks/use-scroll-to";
import { useScrollTop } from "@/hooks/use-scroll-to-top";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const handleScrollTop = useScrollTop();
  const scrollTo = useScrollTo();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleScrollToConnect = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      scrollTo("connect");
    }
  };

  return (
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

      <SheetContent side="right" className="flex flex-col gap-8 pt-16">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

        <ul className="flex flex-col gap-4 px-6">
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
                      onClick={link.href === "/" ? handleScrollTop : undefined}
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

        <SheetClose
          nativeButton={false}
          render={
            <Link
              href="/#connect"
              onClick={handleScrollToConnect}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto self-start p-0 px-6",
              )}
            >
              Hire me
            </Link>
          }
        />
      </SheetContent>
    </Sheet>
  );
}
