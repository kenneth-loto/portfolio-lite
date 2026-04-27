import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `true` on the client, `false` on the server (SSR).
 *
 * Useful for skipping hydration mismatches when rendering client-only content.
 *
 * @example
 * const mounted = useMounted();
 * if (!mounted) return null;
 */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
