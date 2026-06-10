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
 * ogUrl({ title: "My Post", description: "A great read.", type: "Blog Post" })
 * // "https://kennethloto.dev/og?title=My%20Post&description=A%20great%20read.&type=Blog%20Post"
 */
export function ogUrl({
  baseUrl,
  title,
  description,
  type,
}: {
  baseUrl: string;
  title: string;
  description: string;
  type: string;
}) {
  return `${baseUrl}/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=${encodeURIComponent(type)}`;
}
