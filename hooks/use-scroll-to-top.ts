import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Returns a click handler that scrolls the page to the top and replaces
 * the current history entry with `"/"`, without triggering a scroll jump.
 *
 * Intended for anchor elements that act as a "go home" control.
 *
 * @returns A `MouseEvent` handler for use on an `<a>` element.
 *
 * @example
 * const handleScrollTop = useScrollTop();
 * <Link href="/" onClick={handleScrollTop}>Home</Link>
 */
export function useScrollTop() {
  const router = useRouter();

  const handleScrollTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.documentElement.scrollIntoView();
    router.replace("/", { scroll: false });
  };

  return handleScrollTop;
}
