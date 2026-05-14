import { describe, expect, it } from "vitest";
import { cn, formatDate, getInitials } from "@/lib/utils";

// cn()

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles the custom leading-reading class without stripping it", () => {
    expect(cn("leading-reading", "leading-relaxed")).toBe("leading-relaxed");
    expect(cn("leading-relaxed", "leading-reading")).toBe("leading-reading");
  });

  it("returns empty string when no args", () => {
    expect(cn()).toBe("");
  });
});

// getInitials()

describe("getInitials()", () => {
  it("returns first two initials from a full name", () => {
    expect(getInitials("Juan Dela Cruz")).toBe("JD");
  });

  it("returns single initial for a single word name", () => {
    expect(getInitials("Juan")).toBe("J");
  });

  it("uppercases initials", () => {
    expect(getInitials("juan dela cruz")).toBe("JD");
  });

  it("slices to 2 chars max for many words", () => {
    expect(getInitials("Juan Dela Cruz Santos")).toBe("JD");
  });

  it("trims leading and trailing whitespace", () => {
    expect(getInitials("  Juan Dela  ")).toBe("JD");
  });

  it("returns ?? for null", () => {
    expect(getInitials(null)).toBe("??");
  });

  it("returns ?? for undefined", () => {
    expect(getInitials(undefined)).toBe("??");
  });

  it("returns ?? for empty string", () => {
    expect(getInitials("")).toBe("??");
  });
});

// formatDate()

describe("formatDate()", () => {
  it("formats a valid date correctly", () => {
    expect(formatDate(new Date("2026-04-25"))).toBe("April 25, 2026");
  });

  it("formats first day of the year", () => {
    expect(formatDate(new Date("2026-01-01"))).toBe("January 1, 2026");
  });

  it("formats last day of the year", () => {
    expect(formatDate(new Date("2026-12-31"))).toBe("December 31, 2026");
  });

  it("returns Invalid Date for a bad date", () => {
    expect(formatDate(new Date("not-a-date"))).toBe("Invalid Date");
  });
});
