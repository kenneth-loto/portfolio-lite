import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Section({ children, className }: ComponentProps<"section">) {
  return (
    <section className={cn("px-4 py-8 md:px-0", className)}>{children}</section>
  );
}

function SectionHeader({ children, className }: ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

function SectionTitle({ children, className }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-medium text-muted-foreground text-xs uppercase tracking-widest",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function SectionAction({
  children,
  href,
  className,
}: ComponentProps<"a"> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "link" }),
        "h-auto p-0 text-xs",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export { Section, SectionHeader, SectionTitle, SectionAction };
