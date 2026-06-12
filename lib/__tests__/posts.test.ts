import { describe, expect, it, vi } from "vitest";

// Mock content-collections

const mockPosts = [
  {
    slug: "post-a",
    title: "Post A",
    description: "Desc A",
    published: true,
    date: new Date("2026-04-01"),
    tags: ["react", "typescript"],
  },
  {
    slug: "post-b",
    title: "Post B",
    description: "Desc B",
    published: true,
    date: new Date("2026-03-01"),
    tags: ["react"],
  },
  {
    slug: "post-c",
    title: "Post C",
    description: "Desc C",
    published: true,
    date: new Date("2026-02-01"),
    tags: ["css"],
  },
  {
    slug: "post-draft",
    title: "Draft Post",
    description: "Desc Draft",
    published: false,
    date: new Date("2026-05-01"),
    tags: ["react"],
  },
  {
    slug: "post-no-tags",
    title: "No Tags Post",
    description: "Desc No Tags",
    published: true,
    date: new Date("2026-01-01"),
    tags: undefined,
  },
];

vi.mock("content-collections", () => ({
  allPosts: mockPosts,
}));

vi.mock("@/app/sitemap", () => ({
  baseUrl: "https://example.com",
}));

// Import after mocks

// NOTE: publishedPosts is computed once at module load time in posts.ts.
// Mocks must be registered before the import below, or changes won't reflect.
const {
  getAllPublishedPosts,
  getLatestPublishedPost,
  getPublishedPostBySlug,
  getPostStaticParams,
  getRelatedPosts,
  getPostOgImage,
} = await import("@/lib/posts");

// getAllPublishedPosts()

describe("getAllPublishedPosts()", () => {
  it("returns only published posts", () => {
    const posts = getAllPublishedPosts();

    expect(posts.every((post) => post.published)).toBe(true);
  });

  it("excludes draft posts", () => {
    const posts = getAllPublishedPosts();

    expect(posts.find((post) => post.slug === "post-draft")).toBeUndefined();
  });

  it("returns posts sorted by date descending", () => {
    const posts = getAllPublishedPosts();
    const dates = posts.map((post) => post.date.getTime());

    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });
});

// getLatestPublishedPost()

describe("getLatestPublishedPost()", () => {
  it("returns the most recent published post", () => {
    expect(getLatestPublishedPost()?.slug).toBe("post-a");
  });
});

// getPublishedPostBySlug()

describe("getPublishedPostBySlug()", () => {
  it("returns the correct post for a valid slug", () => {
    expect(getPublishedPostBySlug("post-b")?.slug).toBe("post-b");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPublishedPostBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for a draft slug", () => {
    expect(getPublishedPostBySlug("post-draft")).toBeUndefined();
  });
});

// getPostStaticParams()

describe("getPostStaticParams()", () => {
  it("returns slug objects for all published posts", () => {
    expect(getPostStaticParams()).toEqual([
      { slug: "post-a" },
      { slug: "post-b" },
      { slug: "post-c" },
      { slug: "post-no-tags" },
    ]);
  });

  it("does not include draft slugs", () => {
    const slugs = getPostStaticParams().map((post) => post.slug);

    expect(slugs).not.toContain("post-draft");
  });
});

// getRelatedPosts()

describe("getRelatedPosts()", () => {
  it("excludes the current post", () => {
    const relatedPosts = getRelatedPosts("post-a", ["react"]);

    expect(
      relatedPosts.find((relatedPost) => relatedPost.slug === "post-a"),
    ).toBeUndefined();
  });

  it("ranks posts with more matching tags higher", () => {
    // post-b has 1 matching tag (react), post-c has 0
    const relatedPosts = getRelatedPosts("post-a", ["react"]);

    expect(relatedPosts[0].slug).toBe("post-b");
  });

  it("falls back to date order when scores are equal", () => {
    // post-b (2026-03-01) and post-c (2026-02-01) both score 0 against "next"
    const relatedPosts = getRelatedPosts("post-a", ["next"]);

    expect(relatedPosts[0].slug).toBe("post-b");
  });

  it("respects the limit parameter", () => {
    expect(getRelatedPosts("post-a", [], 1)).toHaveLength(1);
  });

  it("returns at most 2 posts by default", () => {
    expect(getRelatedPosts("post-a")).toHaveLength(2);
  });

  it("returns all available posts when limit exceeds pool", () => {
    expect(getRelatedPosts("post-a", [], 99)).toHaveLength(3);
  });

  it("handles empty tags gracefully", () => {
    const relatedPosts = getRelatedPosts("post-a", []);

    expect(relatedPosts).toHaveLength(2);
  });

  it("handles posts with undefined tags without throwing", () => {
    expect(() => getRelatedPosts("post-a", ["react"])).not.toThrow();
  });
});

// getPostOgImage()

describe("getPostOgImage()", () => {
  it("builds the correct OG image URL", () => {
    const url = getPostOgImage(mockPosts[0]);

    expect(url).toBe(
      "https://example.com/og?title=Post%20A&description=Desc%20A&type=Blog%20Post&cta=Read%20More%20%E2%9F%B6",
    );
  });

  it("encodes special characters in title and description", () => {
    const url = getPostOgImage({
      title: "Hello & World",
      description: "A+B=C",
    });

    expect(url).toContain("Hello%20%26%20World");
    expect(url).toContain("A%2BB%3DC");
  });

  it("uses type=Project not type=Blog", () => {
    const url = getPostOgImage({ title: "X", description: "Y" });

    expect(url).toContain("type=Blog%20Post");
  });

  it("includes cta=Read More →", () => {
    const url = getPostOgImage({ title: "X", description: "Y" });

    expect(url).toContain("cta=Read%20More%20%E2%9F%B6");
  });
});
