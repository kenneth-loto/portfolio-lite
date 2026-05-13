import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex w-full items-center justify-between gap-4 border-t py-4">
      <span className="text-muted-foreground text-xs">
        &copy; {currentYear} Kenneth Loto. All rights reserved.
      </span>
      <div className="flex items-center gap-2">
        <Link
          href="/rss"
          className={cn(
            buttonVariants({ variant: "link" }),
            "h-auto p-0 text-xs uppercase",
          )}
        >
          RSS
        </Link>

        <ModeToggle />
      </div>
    </footer>
  );
}
