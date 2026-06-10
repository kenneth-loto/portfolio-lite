"use client";

import { useCallback, useState } from "react";

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (title: string) => {
    const url = window.location.href;

    try {
      await navigator.share({ title, url });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (error) {
        if (error instanceof Error && error.name === "NotAllowedError") return;
        console.error("Failed to copy:", error);
      }
    }
  }, []);

  return { share, copied };
}
