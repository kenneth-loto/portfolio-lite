import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { aboutMe } from "@/lib/data/about-me";
import { socialMediaLinks } from "@/lib/data/social-media";
import { cn } from "@/lib/utils";

export function Connect() {
  return (
    <Section className="space-y-8">
      <SectionTitle>Connect</SectionTitle>
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm/relaxed">
          Feel free to reach me at{" "}
          <Link
            href={`mailto:${aboutMe.email}`}
            className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
          >
            {aboutMe.email}
          </Link>
        </p>
        <div className="flex flex-wrap gap-4">
          {socialMediaLinks.map(({ label, href }) => (
            <div key={label} className="group flex items-center">
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto p-0",
                )}
              >
                {label}
              </Link>
              <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground transition-transform group-has-focus-visible:translate-x-0.5" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
