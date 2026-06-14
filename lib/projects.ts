import { allProjects, type Project } from "content-collections";
import { baseUrl } from "@/app/sitemap";
import { capitalize, ogUrl } from "@/lib/utils";
import { CURATED_PROJECT_TAGS } from "./contants";

const publishedProjects: Project[] = allProjects
  .filter((project) => project.published)
  .sort((a, b) => b.year - a.year);

export function getAllPublishedProjects(): Project[] {
  return publishedProjects;
}

export function getFeaturedProjects(limit = 2): Project[] {
  return publishedProjects
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getPublishedProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((project) => project.slug === slug);
}

export function getProjectStaticParams(): { slug: string }[] {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export function getProjectsByTechStack(techStack: string): Project[] {
  const lowercased = techStack.toLowerCase();

  return publishedProjects.filter((project) =>
    project.tags.includes(lowercased),
  );
}

export function getAllProjectsTags(): string[] {
  return [
    ...new Set(publishedProjects.flatMap((project) => project.tags)),
  ].sort();
}

export function getCuratedProjectTags(): string[] {
  return CURATED_PROJECT_TAGS.filter((tag) =>
    publishedProjects.some((project) => project.tags.includes(tag)),
  );
}

export function getProjectOgImage(
  project: Pick<Project, "title" | "description">,
) {
  return ogUrl({
    baseUrl,
    title: project.title,
    description: project.description,
    type: "Project",
    cta: "View Project ⟶",
  });
}

export function getProjectsTechStackOgImage(techStack: string) {
  const capitalized = capitalize(techStack);

  return ogUrl({
    baseUrl,
    title: `${capitalized} Developer Philippines`,
    description: `${capitalized} projects built by Kenneth Loto, a full-stack developer in the Philippines.`,
    type: "Projects",
    cta: "View Projects ⟶",
  });
}
