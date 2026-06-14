import type { Route } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";
import { cn, parseInlineLinks } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function Hero() {
  return (
    <Section className="mt-4">
      <div className="flex flex-col">
        <h1 className="font-semibold text-base">{aboutMe.name}</h1>
        <p className="text-muted-foreground text-sm/read">{aboutMe.title}</p>
      </div>
      <p className="text-muted-foreground text-sm/read">
        {parseInlineLinks(aboutMe.bio).map(({ id, text, isTech }) =>
          isTech ? (
            // `as Route` needed — typed routes can't resolve ambiguity
            // between /projects/[slug] and /projects/tech-stack/[techStack]
            <Link
              key={id}
              href={`/projects/tech-stack/${text.toLowerCase()}` as Route}
              className={cn(
                buttonVariants({ variant: "link" }),
                "h-auto p-0 font-normal",
              )}
            >
              {text}
            </Link>
          ) : (
            <span key={id}>{text}</span>
          ),
        )}
      </p>
    </Section>
  );
}
