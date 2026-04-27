import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Section({ children, className, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("space-y-8 py-8", className)} {...props}>
      {children}
    </section>
  );
}

function SectionTitle({ children, className }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-medium text-muted-foreground text-xs uppercase tracking-wide",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export { Section, SectionTitle };
