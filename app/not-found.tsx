"use client";

import Link from "next/link";
import {
  Section,
  SectionCommand,
  SectionPrompt,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";
import { trackClick } from "@/lib/track-click";

export default function NotFound() {
  return (
    <Section className="mx-auto h-svh max-w-2xl justify-center px-6 py-0">
      <SectionTerminal>
        <SectionPrompt>
          <SectionPwd />
          <SectionCommand>cat 404.log</SectionCommand>
        </SectionPrompt>

        <div className="flex flex-col">
          <h1 className="font-medium text-sm">Page not found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you're looking for doesn't exist or was moved.
          </p>
        </div>

        <Link
          href="/"
          onClick={() => trackClick("back_to_home", "/")}
          className="w-fit font-medium text-foreground text-sm transition-colors duration-200 ease-in-out hover:underline hover:underline-offset-2"
        >
          Back to home
        </Link>
      </SectionTerminal>
    </Section>
  );
}
