import { ArrowUpRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  return (
    <Section>
      <SectionTitle>Featured Projects</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        {projects.map((project, index) => {
          const key = `${index}-${project.title}`;
          return (
            <div key={key} className="space-y-2 pl-4">
              <ul className="list-disc">
                <li className="text-muted-foreground text-xs">
                  {project.year}
                </li>
              </ul>

              <h3 className="font-medium text-sm">{project.title}</h3>

              <p className="text-muted-foreground text-sm/read">
                {project.description}
              </p>

              {/* Action Buttons */}
              {(project.live_demo || project.github_url) && (
                <div className="flex gap-2">
                  {project.live_demo && (
                    <a
                      href={project.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "h-auto gap-0.5 self-start whitespace-normal p-0",
                      )}
                    >
                      Live Demo
                      <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground" />
                    </a>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "h-auto gap-0.5 p-0",
                      )}
                    >
                      GitHub
                      <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground" />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
