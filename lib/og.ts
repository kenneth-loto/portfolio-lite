import { baseUrl } from "@/app/sitemap";
import { ogUrl } from "@/lib/utils";

export async function getFonts() {
  const [regularRes, semiBoldRes] = await Promise.all([
    fetch(`${baseUrl}/fonts/JetBrainsMono-Regular.ttf`),
    fetch(`${baseUrl}/fonts/JetBrainsMono-SemiBold.ttf`),
  ]);

  const [fontRegular, fontSemiBold] = await Promise.all([
    regularRes.arrayBuffer(),
    semiBoldRes.arrayBuffer(),
  ]);

  return { fontRegular, fontSemiBold };
}

export const ogImages = {
  home: ogUrl({
    baseUrl,
    title: "Full-Stack Developer",
    description:
      "Building web applications that are well-structured, maintainable, and easy to change tomorrow.",
    type: "Home",
  }),

  blog: ogUrl({
    baseUrl,
    title: "Writing Thoughts",
    description:
      "Writing about software engineering, web development, and problems I've actually run into.",
    type: "Blog",
  }),

  projects: ogUrl({
    baseUrl,
    title: "Things I've Built",
    description:
      "Full-stack web apps, geospatial systems, and machine learning.",
    type: "Projects",
  }),
};
