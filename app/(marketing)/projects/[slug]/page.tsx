import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseUrl } from "@/app/sitemap";
import { ProjectsDetailPage } from "@/components/pages/projects-detail-page";
import {
  getProjectOgImage,
  getProjectStaticParams,
  getPublishedProjectBySlug,
} from "@/lib/projects";

export async function generateStaticParams() {
  return getProjectStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProjectBySlug(slug);

  if (!project) return {};

  const ogImage = getProjectOgImage(project);

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getPublishedProjectBySlug(slug);

  if (!project) notFound();

  const ogImage = getProjectOgImage(project);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: `${baseUrl}/projects/${project.slug}`,
            image: ogImage,
            dateCreated: String(project.year),
            author: {
              "@type": "Person",
              name: "Kenneth Loto",
            },
          }),
        }}
      />
      <ProjectsDetailPage project={project} />
    </>
  );
}
