import type { ComponentProps, Ref } from "react";
import { cn, getAutoGridColumnWidth } from "@/lib/utils";

function Section({
  children,
  className,
  ref,
  ...props
}: ComponentProps<"section"> & { ref?: Ref<HTMLElement> }) {
  return (
    <section
      ref={ref}
      className={cn("flex flex-col gap-4 py-8", className)}
      {...props}
    >
      {children}
    </section>
  );
}

function SectionPrompt({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {children}
    </div>
  );
}

function SectionTerminal({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

function SectionPwd({
  className,
  user = "Kenneth",
  host = "LAPTOP-F4NAR8GJ",
  path = "/c/Next.js/portfolio-lite",
  branch = "main",
  ...props
}: ComponentProps<"p"> & {
  user?: string;
  host?: string;
  path?: string;
  branch?: string;
}) {
  return (
    <p
      className={cn(
        "break-all text-muted-foreground leading-relaxed",
        className,
      )}
      {...props}
    >
      <span className="text-terminal-identity">
        {user}@{host}
      </span>{" "}
      <span className="text-terminal-env">MINGW64</span>{" "}
      <span className="text-terminal-path">{path}</span>{" "}
      <span className="text-terminal-git">({branch})</span>
    </p>
  );
}

function SectionCommand({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  return (
    <p className={className} {...props}>
      <span className="text-muted-foreground">$</span> {children}
    </p>
  );
}

function SectionOutput({
  items,
  className,
  ...props
}: ComponentProps<"div"> & { items: string[] }) {
  const minColumnWidth = getAutoGridColumnWidth(items);

  return (
    <div
      className={cn("grid gap-x-4 gap-y-2", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`,
      }}
      {...props}
    >
      {items.map((item) => (
        <span key={item} className="whitespace-nowrap">
          {item}
        </span>
      ))}
    </div>
  );
}

export {
  Section,
  SectionCommand,
  SectionOutput,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
};
