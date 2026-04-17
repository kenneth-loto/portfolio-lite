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
});

export default defineConfig({
  content: [posts],
});
