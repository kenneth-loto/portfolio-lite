import { TerminalIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <nav className="flex items-center justify-between px-4 py-4 md:px-0">
        <Link href="/">
          <TerminalIcon className="size-4" />
        </Link>

        {/* Nav Links — centered */}
        {/* TODO: Make use of burger menu on mobile */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "sm", variant: "link" }))}
        >
          Hire Me
        </Link>
      </nav>
    </header>
  );
}
