"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function ErrorPage({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <Section className="mx-auto h-svh max-w-2xl justify-center px-4 py-0">
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>cat error.log</SectionCommand>

        <div className="mt-4 flex flex-col">
          <h1 className="font-medium text-sm">Something went wrong</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            An unexpected error occurred. Try again, it might be temporary.
          </p>
          {error.digest && (
            <p className="mt-2 font-mono text-muted-foreground text-xs">
              error_id: {error.digest}
            </p>
          )}
        </div>

        <p className="mt-4 text-sm">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="w-fit px-2 py-1.5 font-medium text-foreground transition-colors duration-200 ease-in-out hover:underline hover:underline-offset-2"
          >
            Retry
          </button>
        </p>
      </SectionTerminal>
    </Section>
  );
}
