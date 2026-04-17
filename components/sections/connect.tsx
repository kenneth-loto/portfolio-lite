import { ArrowUpRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { author } from "@/lib/data/author";
import { socialMediaLinks } from "@/lib/data/social-media";
import { cn } from "@/lib/utils";

export function Connect() {
  return (
    <Section>
      <SectionTitle>Connect</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        <p className="text-muted-foreground text-read/read">
          Feel free to reach me at{" "}
          <a
            href={`mailto:${author.email}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "h-auto p-0 text-read",
            )}
          >
            {author.email}
          </a>
        </p>

        <div className="flex flex-wrap gap-2">
          {socialMediaLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-0.5",
              )}
            >
              {label}
              <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
