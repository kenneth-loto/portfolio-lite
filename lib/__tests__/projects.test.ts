import { describe, expect, it, vi } from "vitest";

// Mock content-collections

const mockProjects = [
  {
    slug: "project-a",
    title: "Project A",
    description: "Desc A",
    published: true,
    featured: true,
    year: 2026,
    tags: ["react", "typescript"],
  },
  {
    slug: "project-b",
    title: "Project B",
    description: "Desc B",
    published: true,
    featured: true,
    year: 2025,
    tags: ["nextjs", "typescript"],
  },
  {
    slug: "project-c",
    title: "Project C",
    description: "Desc C",
    published: true,
    featured: false,
    year: 2024,
    tags: ["react", "tailwindcss"],
  },
  {
    slug: "project-draft",
    title: "Draft Project",
    description: "Desc Draft",
    published: false,
    featured: true,
    year: 2026,
    tags: ["react"],
  },
];

vi.mock("content-collections", () => ({
  allProjects: mockProjects,
}));

vi.mock("@/app/sitemap", () => ({
  baseUrl: "https://example.com",
}));

// Import after mocks

// NOTE: publishedProjects is computed once at module load time in projects.ts.
// Mocks must be registered before the import below, or changes won't reflect.
const {
  getAllPublishedProjects,
  getFeaturedProjects,
  getPublishedProjectBySlug,
  getProjectStaticParams,
  getProjectOgImage,
  getProjectsByTechStack,
  getAllProjectsTags,
  getCuratedProjectTags,
} = await import("@/lib/projects");

// getAllPublishedProjects()

describe("getAllPublishedProjects()", () => {
  it("returns only published projects", () => {
    expect(
      getAllPublishedProjects().every((project) => project.published),
    ).toBe(true);
  });

  it("excludes draft projects", () => {
    expect(
      getAllPublishedProjects().find(
        (project) => project.slug === "project-draft",
      ),
    ).toBeUndefined();
  });

  it("returns projects sorted by year descending", () => {
    const years = getAllPublishedProjects().map((project) => project.year);

    expect(years).toEqual([...years].sort((a, b) => b - a));
  });
});

// getFeaturedProjects()

describe("getFeaturedProjects()", () => {
  it("returns only featured projects", () => {
    expect(getFeaturedProjects().every((project) => project.featured)).toBe(
      true,
    );
  });

  it("excludes draft projects even if featured", () => {
    expect(
      getFeaturedProjects(99).find(
        (project) => project.slug === "project-draft",
      ),
    ).toBeUndefined();
  });

  it("defaults to a limit of 2", () => {
    expect(getFeaturedProjects()).toHaveLength(2);
  });

  it("respects a custom limit", () => {
    expect(getFeaturedProjects(1)).toHaveLength(1);
  });

  it("returns featured projects sorted by year descending", () => {
    const years = getFeaturedProjects(99).map((project) => project.year);

    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it("returns all available when limit exceeds pool", () => {
    expect(getFeaturedProjects(99)).toHaveLength(2);
  });
});

// getPublishedProjectBySlug()

describe("getPublishedProjectBySlug()", () => {
  it("returns the correct project for a valid slug", () => {
    expect(getPublishedProjectBySlug("project-b")?.slug).toBe("project-b");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPublishedProjectBySlug("does-not-exist")).toBeUndefined();
  });

  it("returns undefined for a draft slug", () => {
    expect(getPublishedProjectBySlug("project-draft")).toBeUndefined();
  });
});

// getProjectStaticParams()

describe("getProjectStaticParams()", () => {
  it("returns slug objects for all published projects", () => {
    expect(getProjectStaticParams()).toEqual([
      { slug: "project-a" },
      { slug: "project-b" },
      { slug: "project-c" },
    ]);
  });

  it("does not include draft slugs", () => {
    expect(
      getProjectStaticParams().map((project) => project.slug),
    ).not.toContain("project-draft");
  });
});

// getProjectOgImage()

describe("getProjectOgImage()", () => {
  it("builds the correct OG image URL", () => {
    expect(
      getProjectOgImage({ title: "Project A", description: "Desc A" }),
    ).toBe(
      "https://example.com/og?title=Project%20A&description=Desc%20A&type=Project&cta=View%20Project%20%E2%9F%B6",
    );
  });

  it("encodes special characters in title and description", () => {
    const url = getProjectOgImage({
      title: "Hello & World",
      description: "A+B=C",
    });

    expect(url).toContain("Hello%20%26%20World");
    expect(url).toContain("A%2BB%3DC");
  });

  it("uses type=Project not type=Blog", () => {
    const url = getProjectOgImage({ title: "X", description: "Y" });

    expect(url).toContain("type=Project");
  });

  it("includes cta=View Project →", () => {
    const url = getProjectOgImage({ title: "X", description: "Y" });

    expect(url).toContain("cta=View%20Project%20%E2%9F%B6");
  });
});

// getProjectsByTechStack()

describe("getProjectsByTechStack()", () => {
  it("returns projects that match the given tech stack", () => {
    expect(
      getProjectsByTechStack("react").map((project) => project.slug),
    ).toEqual(["project-a", "project-c"]);
  });

  it("is case-insensitive for the input", () => {
    expect(getProjectsByTechStack("React")).toEqual(
      getProjectsByTechStack("react"),
    );
  });

  it("returns empty array for unknown tech stack", () => {
    expect(getProjectsByTechStack("svelte")).toEqual([]);
  });

  it("excludes draft projects", () => {
    expect(
      getProjectsByTechStack("react").find(
        (project) => project.slug === "project-draft",
      ),
    ).toBeUndefined();
  });
});

// getAllTags()

describe("getAllTags()", () => {
  it("returns all unique tags sorted alphabetically", () => {
    expect(getAllProjectsTags()).toEqual([
      "nextjs",
      "react",
      "tailwindcss",
      "typescript",
    ]);
  });

  it("does not contain duplicate tags", () => {
    const tags = getAllProjectsTags();

    expect(tags).toHaveLength(new Set(tags).size);
  });
});

// getCuratedProjectTags()

describe("getCuratedProjectTags()", () => {
  it("returns only featured tags that exist in published projects", () => {
    expect(getCuratedProjectTags()).toEqual(["react", "typescript"]);
  });

  it("excludes featured tags with no matching published projects", () => {
    // laravel, flutter, php, gis are in FEATURED_TAGS but not in mock data
    expect(getCuratedProjectTags()).not.toContain("laravel");
    expect(getCuratedProjectTags()).not.toContain("flutter");
  });

  it("excludes tags from draft projects", () => {
    // "react" is in draft but also in published — still returned
    // no tag exclusive to drafts should appear
    expect(getCuratedProjectTags()).not.toContain("svelte");
  });

  it("preserves the order of FEATURED_TAGS", () => {
    const tags = getCuratedProjectTags();

    expect(tags.indexOf("react")).toBeLessThan(tags.indexOf("typescript"));
  });
});
