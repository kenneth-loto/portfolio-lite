import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalTime } from "@/hooks/use-local-time";

describe("useLocalTime()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns a formatted time string on mount", () => {
    const { result } = renderHook(() => useLocalTime());

    // e.g. "3:04:05 PM GMT+8" — validate shape not exact value
    expect(result.current).toMatch(/\d{1,2}:\d{2}:\d{2}\s(AM|PM)/);
  });

  it("defaults to Asia/Manila timezone", () => {
    const { result } = renderHook(() => useLocalTime());

    expect(result.current).toContain("GMT+8");
  });

  it("accepts a custom timezone", () => {
    const { result } = renderHook(() => useLocalTime("Asia/Tokyo"));

    expect(result.current).toContain("GMT+9");
  });

  it("updates the time every second", () => {
    const { result } = renderHook(() => useLocalTime());
    const initial = result.current;

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).not.toBe(initial);
  });

  it("clears the interval on unmount", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = renderHook(() => useLocalTime());

    unmount();
    expect(clearSpy).toHaveBeenCalledOnce();
  });

  it("updates formatter when timezone changes", () => {
    const { result, rerender } = renderHook(({ tz }) => useLocalTime(tz), {
      initialProps: { tz: "Asia/Manila" },
    });

    expect(result.current).toContain("GMT+8");

    rerender({ tz: "Asia/Tokyo" });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toContain("GMT+9");
  });
});
