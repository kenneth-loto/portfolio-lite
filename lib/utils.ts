import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["read"] }],
      leading: [{ leading: ["reading"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseBold(text: string): { text: string; bold: boolean }[] {
  return text.split(/(\*\*.*?\*\*)/).map((part) => {
    const bold = part.startsWith("**") && part.endsWith("**");

    return {
      text: bold ? part.slice(2, -2) : part,
      bold,
    };
  });
}

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

export function formatDate(date: Date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}
