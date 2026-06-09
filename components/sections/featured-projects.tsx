import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { getFeaturedProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <Section>
      <SectionTitle>Featured Projects</SectionTitle>

      <div className="flex flex-col gap-8 border-t pt-4">
        {featuredProjects.length > 0 ? (
          featuredProjects.map((featuredProject) => (
            <div
              key={`${featuredProject.title}`}
              className="flex flex-col gap-2 pl-4"
            >
              <p className="list-item list-disc text-muted-foreground text-xs">
                {featuredProject.year}
              </p>

              <h3 className="font-medium text-sm">{featuredProject.title}</h3>

              <p className="text-muted-foreground text-sm/read">
                {featuredProject.description}
              </p>

              <Link
                href={`/projects/${featuredProject.slug}`}
                aria-label={`Read more about ${featuredProject.title}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto self-start p-0",
                )}
              >
                Read more{" "}
                <span className="sr-only">about {featuredProject.title}</span>
                <MoveRightIcon data-icon="inline-end" aria-hidden="true" />
              </Link>
            </div>
          ))
        ) : (
          <p className="pt-4 text-center text-muted-foreground text-sm">
            No featured projects yet. Check back soon!
          </p>
        )}
      </div>
    </Section>
  );
}
