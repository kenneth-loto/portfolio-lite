"use client";

import * as Sentry from "@sentry/nextjs";
import { Space_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const colors = {
  identity: "#34c759",
  env: "#b95cf0",
  path: "#ff9500",
  git: "#5ac8fa",
  background: "#1c1c1e",
  foreground: "#fdfdfd",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
};

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <html lang="en" className={spaceMono.className}>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "0 1.5rem",
          backgroundColor: colors.background,
          color: colors.foreground,
          margin: 0,
        }}
      >
        <div style={{ maxWidth: "672px" }}>
          {/* Prompt line */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <p
              aria-hidden="true"
              style={{
                fontSize: "0.875rem",
                margin: 0,
                lineHeight: 1.625,
                wordBreak: "break-all",
              }}
            >
              <span style={{ color: colors.identity }}>
                Kenneth@LAPTOP-F4NAR8GJ
              </span>{" "}
              <span style={{ color: colors.env }}>MINGW64</span>{" "}
              <span style={{ color: colors.path }}>
                /c/Next.js/portfolio-lite
              </span>{" "}
              <span style={{ color: colors.git }}>(main)</span>
            </p>

            {/* Command */}
            <p style={{ fontSize: "0.875rem" }}>
              <span aria-hidden="true">
                <span style={{ color: colors.mutedForeground }}>$</span> cat
                global-error.log
              </span>
              <span
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  padding: 0,
                  margin: "-1px",
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                show error log
              </span>
            </p>
          </div>

          {/* Output */}
          <div style={{ marginTop: "16px" }}>
            <h1
              style={{
                fontSize: "0.875rem",
                margin: 0,
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: colors.mutedForeground,
                lineHeight: 1.75,
              }}
            >
              The app could not be loaded. Try again in a moment.
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: colors.mutedForeground,
                  margin: "8px 0 0",
                }}
              >
                error_id: {error.digest}
              </p>
            )}

            {/* Retry as a command */}
            <p style={{ fontSize: "0.875rem", margin: "16px 0 0" }}>
              <button
                type="button"
                onClick={() => unstable_retry()}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.foreground,
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 8px",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                  transition: prefersReducedMotion
                    ? "none"
                    : "color 200ms ease-in-out",
                }}
              >
                Retry
              </button>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
