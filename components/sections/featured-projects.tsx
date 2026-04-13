import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Section,
  SectionAction,
  SectionHeader,
  SectionTitle,
} from "@/components/ui/section";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  return (
    <Section className="space-y-8">
      <SectionHeader>
        <SectionTitle>Featured Projects</SectionTitle>
        <SectionAction href="/projects">View All</SectionAction>
      </SectionHeader>
      <ul className="list-disc space-y-4 pl-4">
        {projects.map((project, index) => {
          const key = `${index}-${project.title}`;

          return (
            <li key={key}>
              <p className="text-sm">
                <Link
                  href={project.href}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto p-0",
                  )}
                >
                  {project.title}
                </Link>
                {" — "}
                <span className="text-muted-foreground text-sm/relaxed">
                  {project.description}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
