"use client";

import posthog from "posthog-js";
import { useEffect, useRef } from "react";

export function useSectionView(sectionName: string) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;

          posthog.capture("section_viewed", { section: sectionName });

          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}
