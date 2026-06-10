"use client";

import { Button } from "@/components/ui/button";

export function SkipToContent() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
      onClick={() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
    >
      Skip to content
    </Button>
  );
}
