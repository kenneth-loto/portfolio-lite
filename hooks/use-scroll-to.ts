/**
 * Returns a helper that scrolls to a DOM element by id.
 *
 * @returns A function that accepts an element `id` and calls `scrollIntoView` on it.
 *
 * @example
 * const scrollTo = useScrollTo();
 * scrollTo("connect"); // scrolls to <div id="connect">
 */
export function useScrollTo() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  return scrollTo;
}
