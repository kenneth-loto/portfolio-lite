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
  },
  {
    slug: "project-b",
    title: "Project B",
    description: "Desc B",
    published: true,
    featured: true,
    year: 2025,
  },
  {
    slug: "project-c",
    title: "Project C",
    description: "Desc C",
    published: true,
    featured: false,
    year: 2024,
  },
  {
    slug: "project-draft",
    title: "Draft Project",
    description: "Desc Draft",
    published: false,
    featured: true,
    year: 2026,
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
