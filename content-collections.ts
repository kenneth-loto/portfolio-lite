import fs from "node:fs";
import path from "node:path";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import readingTime from "reading-time";
import rehypePrettyCode from "rehype-pretty-code";
import * as v from "valibot";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const imagePath = v.pipe(
  v.string(),
  v.trim(),
  v.regex(
    /^\/[^\s]+\.(png|jpe?g)$/i,
    "Image must be a root-relative path starting with / and ending in png, jpg, or jpeg",
  ),
);

const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "**/*.mdx",
  exclude: ["_template.mdx"],
  schema: v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(20, "Title must be at least 20 characters"),
      v.maxLength(60, "Title must not exceed 60 characters for SEO"),
    ),
    date: v.pipe(
      v.string(),
      v.isoDate("Date must be a valid ISO date e.g. 2025-01-30"),
      v.transform((value) => new Date(value)),
    ),
    description: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(50, "Description must be at least 50 characters"),
      v.maxLength(160, "Description must not exceed 160 characters for SEO"),
    ),
    tags: v.optional(
      v.pipe(
        v.array(
          v.pipe(
            v.string(),
            v.trim(),
            v.toLowerCase(),
            v.minLength(1, "Tag must not be empty"),
          ),
        ),
        v.minLength(2, "At least 2 tags are required"),
        v.maxLength(5, "Maximum 5 tags allowed"),
      ),
      [],
    ),
    published: v.optional(v.boolean(), false),
    content: v.string(),
  }),

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark-default",
          },
        ],
      ],
    });

    return {
      ...document,
      mdx,
      slug: generateSlug(document.title),
      readingTime: readingTime(document.content).text,
    };
  },

  onSuccess: (posts) => {
    const postsBySlug = new Map<string, { title: string; file: string }>();
    const duplicates: string[] = [];

    for (const post of posts) {
      const existing: { title: string; file: string } | undefined =
        postsBySlug.get(post.slug);

      if (existing !== undefined) {
        duplicates.push(
          `"${post.slug}"\n  → ${existing.file} ("${existing.title}")\n  → ${post._meta.filePath} ("${post.title}")`,
        );
      } else {
        postsBySlug.set(post.slug, {
          title: post.title,
          file: post._meta.filePath,
        });
      }
    }

    if (duplicates.length > 0) {
      throw new Error(`Duplicate slugs found:\n${duplicates.join("\n")}`);
    }
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.mdx",
  exclude: ["_template.mdx"],
  schema: v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(4, "Title must be at least 4 characters"),
      v.maxLength(60, "Title must not exceed 60 characters for SEO"),
    ),
    year: v.pipe(
      v.number(),
      v.integer("Year must be a whole number"),
      v.minValue(2020, "Year must be 2020 or later"),
      v.maxValue(
        new Date().getFullYear(),
        `Year must not exceed ${new Date().getFullYear()}`,
      ),
    ),
    description: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(50, "Description must be at least 50 characters"),
      v.maxLength(160, "Description must not exceed 160 characters for SEO"),
    ),
    images: v.pipe(
      v.array(imagePath),
      v.minLength(3, "At least 3 images are required"),
      v.maxLength(8, "Maximum 8 images allowed per project"),
    ),
    tags: v.pipe(
      v.array(
        v.pipe(
          v.string(),
          v.trim(),
          v.toLowerCase(),
          v.minLength(1, "Tag must not be empty"),
        ),
      ),
      v.minLength(1, "At least 1 tag is required"),
      v.maxLength(5, "Maximum 5 tags allowed"),
    ),
    liveDemoUrl: v.optional(
      v.pipe(v.string(), v.url("liveDemoUrl must be a valid URL")),
    ),
    githubUrl: v.optional(
      v.pipe(v.string(), v.url("githubUrl must be a valid URL")),
    ),
    featured: v.optional(v.boolean(), false),
    published: v.optional(v.boolean(), false),
    content: v.string(),
  }),

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark-default",
          },
        ],
      ],
    });

    return {
      ...document,
      mdx,
      slug: generateSlug(document.title),
      readingTime: readingTime(document.content).text,
    };
  },

  onSuccess: (projects) => {
    const projectsBySlug = new Map<string, { title: string; file: string }>();
    const duplicates: string[] = [];
    const missingImages: string[] = [];

    for (const project of projects) {
      const existing = projectsBySlug.get(project.slug);

      if (existing !== undefined) {
        duplicates.push(
          `"${project.slug}"\n  → ${existing.file} ("${existing.title}")\n  → ${project._meta.filePath} ("${project.title}")`,
        );
      } else {
        projectsBySlug.set(project.slug, {
          title: project.title,
          file: project._meta.filePath,
        });
      }
    }

    for (const project of projects) {
      for (const imagePath of project.images) {
        const fullPath = path.join(process.cwd(), "public", imagePath);

        if (!fs.existsSync(fullPath)) {
          missingImages.push(`  → ${imagePath} (in ${project._meta.filePath})`);
        }
      }
    }

    if (duplicates.length > 0) {
      throw new Error(`Duplicate slugs found:\n${duplicates.join("\n")}`);
    }

    if (missingImages.length > 0) {
      throw new Error(
        `Missing images in /public:\n${missingImages.join("\n")}`,
      );
    }
  },
});

export default defineConfig({
  content: [posts, projects],
});
