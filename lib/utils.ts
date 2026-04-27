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
