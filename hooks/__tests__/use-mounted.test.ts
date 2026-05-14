import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useMounted } from "@/hooks/use-mounted";

describe("useMounted()", () => {
  it("returns true on the client", () => {
    const { result } = renderHook(() => useMounted());

    expect(result.current).toBe(true);
  });
});
