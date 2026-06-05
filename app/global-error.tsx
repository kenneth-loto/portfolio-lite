"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: '"JetBrains Mono", monospace',
          gap: "0.5rem",
          padding: "1rem",
          backgroundColor: "#1C1C1E",
          color: "#fdfdfd",
          margin: 0,
        }}
      >
        {/* ShieldAlert icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a1a1aa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "360px",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          The app could not be loaded. Try again in a moment.
        </p>
        {error.digest && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#a1a1aa",
              fontFamily: '"JetBrains Mono", monospace',
              margin: 0,
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "none",
            color: "#fdfdfd",
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: "0.875rem",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            marginTop: "0.25rem",
          }}
        >
          {/* RotateCcw icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Try again
        </button>
      </body>
    </html>
  );
}
