import Link from "next/link";
import {
  Section,
  SectionCommand,
  SectionPwd,
  SectionTerminal,
} from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="mx-auto h-svh max-w-2xl justify-center px-4 py-0">
      <SectionTerminal>
        <SectionPwd />
        <SectionCommand>cat 404.log</SectionCommand>

        <div className="mt-4 flex flex-col">
          <h1 className="font-medium text-sm">Page not found</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you're looking for doesn't exist or was moved.
          </p>
        </div>

        <p className="mt-4 text-sm">
          <Link
            href="/"
            className="w-fit font-medium text-foreground transition-colors duration-200 ease-in-out hover:underline hover:underline-offset-2"
          >
            Back to home
          </Link>
        </p>
      </SectionTerminal>
    </Section>
  );
}
