import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectList } from "@/components/pages/projects/list";
import { Section, SectionTitle } from "@/components/ui/section";
import { getCuratedProjectTags, getProjectsByTechStack } from "@/lib/projects";
import { capitalize } from "@/lib/utils";

interface Props {
  params: Promise<{ techStack: string }>;
}

export async function generateStaticParams() {
  return getCuratedProjectTags().map((tag) => ({ techStack: tag }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { techStack } = await params;
  const capitalized = capitalize(techStack);

  return {
    title: `${capitalized} Developer Philippines | Kenneth Loto`,
    description: `Browse full-stack ${capitalized} projects built by Kenneth Loto, a developer based in the Philippines.`,
    openGraph: {
      title: `${capitalized} Developer Philippines`,
      description: `Browse full-stack ${capitalized} projects built by Kenneth Loto, a developer based in the Philippines.`,
      siteName: "Kenneth Loto",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page({ params }: Props) {
  const { techStack } = await params;
  const curatedTags = getCuratedProjectTags();

  if (!curatedTags.includes(techStack)) notFound();

  const projects = getProjectsByTechStack(techStack);
  const capitalized = capitalize(techStack);

  return (
    <Section className="mt-4">
      <SectionTitle as="h1">Projects</SectionTitle>
      <p className="text-muted-foreground text-sm">
        {capitalized} projects by a developer in the Philippines
      </p>
      <ProjectList projects={projects} activeTechStack={techStack} />
    </Section>
  );
}
