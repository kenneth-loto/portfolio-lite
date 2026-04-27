import { ArrowUpRightIcon } from "lucide-react";
import { LocalTime } from "@/components/local-time";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { author } from "@/lib/data/author";
import { socialMediaLinks } from "@/lib/data/social-media";
import { cn } from "@/lib/utils";

export function Connect() {
  return (
    <Section id="connect">
      <SectionTitle>Connect</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        {/* Get in touch */}
        <div className="space-y-2 pl-4">
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">
              <LocalTime />
            </li>
          </ul>

          <p className="font-medium text-foreground text-sm">Get in touch</p>

          <p className="text-muted-foreground text-sm/read">
            Open to full-time Software Engineering roles — full-stack, frontend,
            or backend. Let's talk if you're building something great.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2 pl-4">
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">Email</li>
          </ul>

          <a
            href={`mailto:${author.email}`}
            className={cn(
              buttonVariants({ variant: "link" }),
              "h-auto p-0 text-sm",
            )}
          >
            {author.email}
          </a>
        </div>

        {/* Social */}
        <div className="space-y-2 pl-4">
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">Social</li>
          </ul>

          <div className="flex flex-wrap gap-2">
            {socialMediaLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto gap-0.5 p-0",
                )}
              >
                {label}
                <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
