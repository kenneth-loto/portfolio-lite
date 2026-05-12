import { MDXContent } from "@content-collections/mdx/react";
import type { Project } from "content-collections";
import { ArrowUpRightIcon, ClockIcon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { ImageCarousel } from "@/components/pages/projects-detail-page/image-carousel";
import { ShareButton } from "@/components/share-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { aboutMe } from "@/lib/data/about-me";
import { cn, getInitials } from "@/lib/utils";

interface ProjectsDetailPageProps {
  project: Project;
}

export function ProjectsDetailPage({ project }: ProjectsDetailPageProps) {
  return (
    <Section className="mt-4 space-y-16">
      <Link
        href="/projects"
        className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
      >
        <MoveLeftIcon aria-hidden="true" />
        Back to projects
      </Link>

      <article className="space-y-8">
        {/* Article Header */}
        <div className="space-y-8 border-b pb-4">
          {/* Date + Title */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs">{project.year}</p>

            <h1 className="font-medium text-3xl leading-tight tracking-tighter md:text-4xl">
              {project.title}
            </h1>
          </div>

          {/* AboutMe avatar/name · reading time */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={aboutMe.avatar} alt={aboutMe.name} />
                <AvatarFallback>{getInitials(aboutMe.name)}</AvatarFallback>
              </Avatar>

              <span className="text-sm">{aboutMe.name}</span>
            </div>

            {/* Vertical divider between AboutMe and reading time */}
            <Separator orientation="vertical" className="h-6" />

            <span className="flex items-center gap-1.5 font-mono text-muted-foreground text-xs">
              <ClockIcon aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Reading time</span>
              {project.readingTime}
            </span>
          </div>
        </div>

        <ImageCarousel images={project.images} title={project.title} />

        {/* Article body (MDX rendered content) */}
        <div className="prose prose-mono-chrome font-sans md:max-w-none">
          <MDXContent code={project.mdx} />
        </div>
      </article>

      <div className="space-y-16 border-t pt-4">
        <div className="space-y-4">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Tags
          </h2>

          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((tag: string) => (
              <li key={tag}>
                <Badge variant="outline" className="font-mono">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Links
          </h2>

          {/* Action Buttons */}
          {(project.liveDemoUrl || project.githubUrl) && (
            <div className="flex gap-2">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto gap-0.5 p-0",
                  )}
                >
                  Live Demo
                  <ArrowUpRightIcon className="-translate-y-1 size-3 text-muted-foreground" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
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

              <ShareButton title={project.title} />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
