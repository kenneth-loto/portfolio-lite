import { allProjects, type Project } from "content-collections";

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
