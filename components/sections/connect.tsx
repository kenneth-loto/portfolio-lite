import { ArrowUpRightIcon } from "lucide-react";
import { LocalTime } from "@/components/local-time";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";
import { socialLinks } from "@/lib/data/social-link";
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
            Open to full-time Full-Stack Developer roles — frontend, backend, or
            anywhere in between. Let's talk if you're working on something worth
            building.
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2 pl-4">
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">Email</li>
          </ul>

          <a
            href={`mailto:${aboutMe.email}`}
            className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
          >
            {aboutMe.email}
          </a>
        </div>

        {/* Social */}
        <div className="space-y-2 pl-4">
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">Social</li>
          </ul>

          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ label, href }) => (
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
