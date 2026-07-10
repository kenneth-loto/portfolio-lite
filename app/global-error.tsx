"use client";

import * as Sentry from "@sentry/nextjs";
import { Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistMono = Geist_Mono({
  subsets: ["latin"],
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
  const [isHovered, setIsHovered] = useState(false);
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
    <html lang="en" className={geistMono.className}>
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
              <span style={{ color: colors.mutedForeground }}>$</span> cat
              global-error.log
            </p>
          </div>

          {/* Output */}
          <div style={{ marginTop: "16px" }}>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Something went wrong
            </p>
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
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: colors.foreground,
                  fontFamily: "inherit",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "4px 8px",
                  textDecoration: isHovered ? "underline" : "none",
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
