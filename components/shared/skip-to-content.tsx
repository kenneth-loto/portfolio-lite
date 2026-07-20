"use client";

export function SkipToContent() {
  return (
    <button
      type="button"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:text-sm"
      onClick={() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }}
    >
      Skip to content
    </button>
  );
}
