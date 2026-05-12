"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useScrollTop } from "@/hooks/use-scroll-to-top";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const handleScrollTop = useScrollTop();
  const pathname = usePathname();

  return (
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
  );
}
