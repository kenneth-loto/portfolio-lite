"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import {
  Section,
  SectionCommand,
  SectionPrompt,
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
    <Section className="mx-auto h-svh max-w-2xl justify-center px-6 py-0">
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand label="show error log">cat error.log</SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col">
          <h1>Something went wrong</h1>
          <p className="text-muted-foreground leading-relaxed">
            An unexpected error occurred. Try again, it might be temporary.
          </p>
          {error.digest && (
            <p className="mt-2 text-muted-foreground text-xs">
              error_id: {error.digest}
            </p>
          )}
        </div>

        <p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="w-fit px-2 py-1.5 text-foreground underline underline-offset-2"
          >
            Retry
          </button>
        </p>
      </SectionTerminal>
    </Section>
  );
}
