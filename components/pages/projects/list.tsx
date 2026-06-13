import type { Project } from "content-collections";
import { MoveRightIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getCuratedProjectTags } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectListProps {
  projects: Project[];
  activeTechStack: string | null;
}

export function ProjectList({ projects, activeTechStack }: ProjectListProps) {
  const curatedTags = getCuratedProjectTags();

  return (
    <>
      {/* Tech filter buttons */}
      <div className="flex flex-wrap gap-2">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({
              variant: activeTechStack === null ? "default" : "outline",
            }),
            "h-auto px-3 py-1 text-xs",
          )}
          aria-label="Show all projects"
        >
          All
        </Link>
        {curatedTags.map((tag) => (
          // `as Route` needed — typed routes can't resolve ambiguity
          // between /projects/[slug] and /projects/tech-stack/[techStack]
          <Link
            key={tag}
            href={`/projects/tech-stack/${tag}` as Route}
            className={cn(
              buttonVariants({
                variant: activeTechStack === tag ? "default" : "outline",
              }),
              "h-auto px-3 py-1 text-xs",
            )}
            aria-label={`Filter by ${tag} projects`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Project list */}
      <div className="space-y-8 border-t pt-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.slug} className="space-y-2 pl-4">
              <ul className="list-disc" role="presentation">
                <li className="text-muted-foreground text-xs">
                  {project.year}
                </li>
              </ul>
              <h2 className="line-clamp-2 font-medium text-sm">
                {project.title}
              </h2>
              <span className="line-clamp-2 text-muted-foreground text-sm/read">
                {project.description}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Read more about ${project.title}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto self-start whitespace-normal p-0",
                )}
              >
                Read more <span className="sr-only">about {project.title}</span>
                <MoveRightIcon data-icon="inline-end" aria-hidden="true" />
              </Link>
            </div>
          ))
        ) : (
          <p className="pt-4 text-center text-muted-foreground text-sm">
            No projects found for this stack. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}
