import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
