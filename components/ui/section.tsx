import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

function Section({ children, className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("flex flex-col gap-8 py-8", className)} {...props}>
      {children}
    </section>
  );
}

function SectionTitle<T extends "h1" | "h2" | "h3" | "h4" | "div" = "h2">({
  children,
  className,
  as,
  ...props
}: ComponentProps<T> & { as?: T }) {
  const Tag = (as ?? "h2") as ElementType;

  return (
    <Tag
      className={cn(
        "font-medium text-muted-foreground text-xs uppercase tracking-wide",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Section, SectionTitle };
