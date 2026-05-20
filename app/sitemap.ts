import { allPosts, allProjects } from "content-collections";

export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kennethloto.dev";

export default async function sitemap() {
  const staticRoutes = ["", "/blog", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const blogRoutes = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString().split("T")[0],
  }));

  const projectRoutes = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    // No lastModified — year alone isn't precise enough to be meaningful
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
