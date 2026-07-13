import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates a CSS `ch` width that fits the longest string in a set.
 *
 * @param items - Strings to size against (e.g. tag names, status labels).
 * @param padding - Extra character buffer (default 4). Adds breathing room.
 * @returns A CSS `ch` value like `"12ch"`.
 *
 * @example
 * getAutoGridColumnWidth(["Next.js", "React", "TailwindCSS"])
 * // "15ch"
 */
export function getAutoGridColumnWidth(items: string[], padding = 4) {
  const maxLength = items.reduce((max, item) => Math.max(max, item.length), 0);

  return `${maxLength + padding}ch`;
}

/**
 * Converts a camelCase string to CONSTANT_CASE.
 *
 * Inserts underscores at camelCase boundaries, then uppercases the result.
 *
 * @param value - A camelCase string (e.g. `"machineLearning"`).
 * @returns The CONSTANT_CASE equivalent (e.g. `"MACHINE_LEARNING"`).
 *
 * @example
 * camelToConstantCase("machineLearning")
 * // "MACHINE_LEARNING"
 */
export function camelToConstantCase(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
}
