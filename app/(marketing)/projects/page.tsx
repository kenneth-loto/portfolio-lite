import { MoveRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { ogImages } from "@/lib/og";
import { getAllPublishedProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects I've built — full-stack web apps, geospatial systems, and machine learning.",
  openGraph: {
    images: [
      {
        url: ogImages.projects,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImages.projects],
  },
};

export default function Page() {
  const projects = getAllPublishedProjects();

  return (
    <Section className="mt-4">
      <SectionTitle as="h1">All Projects</SectionTitle>

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
            No projects yet. Check back soon!
          </p>
        )}
      </div>
    </Section>
  );
}
