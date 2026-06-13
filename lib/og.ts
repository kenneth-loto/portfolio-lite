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
    title: "Full-Stack Developer Philippines",
    description:
      "Full-Stack Developer in the Philippines building apps with React, Laravel, Flutter, and TypeScript. Open to remote junior and entry-level roles.",
    type: "Home",
    cta: "View Portfolio ⟶",
  }),

  blog: ogUrl({
    baseUrl,
    title: "Writing Thoughts",
    description:
      "Writing about software engineering, web development, and problems I've actually run into.",
    type: "Blog",
    cta: "Read Blog ⟶",
  }),

  projects: ogUrl({
    baseUrl,
    title: "Things I've Built",
    description:
      "GIS health monitoring systems, ML-powered Android apps, and full-stack web applications built with React, Laravel, and Flutter.",
    type: "Projects",
    cta: "View Projects ⟶",
  }),
};
