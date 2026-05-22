import { baseUrl } from "@/app/sitemap";

export const ogImages = {
  home: `${baseUrl}/og?title=Full-Stack Developer&description=Building web applications that are well-structured, maintainable, and easy to change tomorrow.&type=Home`,
  blog: `${baseUrl}/og?title=Writing Thoughts&description=Writing about software engineering, web development, and problems I've actually run into.&type=Blog`,
  projects: `${baseUrl}/og?title=Things I've Built&description=Full-stack web apps, geospatial systems, and machine learning.&type=Projects`,
} as const;
