import type { Metadata } from "next";
import { ProjectList } from "@/components/pages/projects/list";
import { Section, SectionTitle } from "@/components/ui/section";
import { ogImages } from "@/lib/og";
import { getAllPublishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Full-Stack Developer Portfolio Philippines | Kenneth Loto",
  description:
    "Browse full-stack developer portfolio projects from the Philippines — React, Laravel, Flutter, and TypeScript apps. Open to remote junior dev roles.",
  openGraph: {
    title: "Full-Stack Developer Portfolio Philippines",
    description:
      "Browse full-stack developer portfolio projects from the Philippines — React, Laravel, Flutter, and TypeScript apps. Open to remote junior dev roles.",
    siteName: "Kenneth Loto",
    images: [{ url: ogImages.projects, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImages.projects],
  },
};

export default function Page() {
  const projects = getAllPublishedProjects();

  return (
    <Section className="mt-4">
      <SectionTitle as="h1">Projects</SectionTitle>
      <p className="text-muted-foreground text-sm">
        Browse projects by tech stack from a full-stack developer in the
        Philippines
      </p>
      <ProjectList projects={projects} activeTechStack={null} />
    </Section>
  );
}
