import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Extends `tailwind-merge` with custom class groups for project-specific
 * Tailwind utilities (`leading-reading`).
 * @internal
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      leading: [{ leading: ["reading"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Derives up to two initials from a full name.
 *
 * @param name - Full name string, or `null`/`undefined`.
 * @returns Uppercased initials (e.g. `"JD"`), or `"??"` if no name is provided.
 *
 * @example
 * getInitials("Juan Dela Cruz") // "JD"
 * getInitials(null)             // "??"
 */
export function getInitials(name?: string | null): string {
  if (!name) return "??";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formats a `Date` as a long human-readable string in US English.
 *
 * @param date - The date to format.
 * @returns A string like `"April 25, 2026"`, or `"Invalid Date"` if parsing fails.
 *
 * @example
 * formatDate(new Date("2026-04-25")) // "April 25, 2026"
 */
export function formatDate(date: Date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

/**
 * Builds a fully-encoded OG image URL for the `/og` route.
 *
 * @param params - The title, description, and page type for the OG image.
 * @returns A URL string with all query params properly encoded.
 *
 * @example
 * ogUrl({ title: "My Post", description: "A great read.", type: "Blog Post", cta: "Read More →" })
 * // "https://kennethloto.dev/og?title=My%20Post&description=A%20great%20read.&type=Blog%20Post&cta=Read%20More%20→"
 */
export function ogUrl({
  baseUrl,
  title,
  description,
  type,
  cta,
}: {
  baseUrl: string;
  title: string;
  description: string;
  type: string;
  cta: string;
}) {
  return `${baseUrl}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=${encodeURIComponent(type)}&cta=${encodeURIComponent(cta)}`;
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize.
 * @returns The string with its first letter uppercased.
 *
 * @example
 * capitalize("react")      // "React"
 * capitalize("typescript") // "Typescript"
 * capitalize("")           // ""
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Parses a string and splits it into segments, marking tech stack
 * keywords wrapped in square brackets as linkable.
 *
 * @param text - String with tech stack keywords wrapped in `[brackets]`.
 * @returns Array of segments with text and a flag indicating if it's a tech stack.
 *
 * @example
 * parseInlineLinks("I work across [React] and [Laravel].")
 * // [
 * //   { text: "I work across ", isTech: false },
 * //   { text: "React", isTech: true },
 * //   { text: " and ", isTech: false },
 * //   { text: "Laravel", isTech: true },
 * //   { text: ".", isTech: false },
 * // ]
 */
export function parseInlineLinks(
  text: string,
): { id: string; text: string; isTech: boolean }[] {
  return text.split(/\[(.+?)\]/g).map((part, i) => ({
    id: `${i}-${part}`,
    text: part,
    isTech: i % 2 === 1,
  }));
}
