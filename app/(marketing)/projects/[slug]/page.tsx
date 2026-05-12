import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectsDetailPage } from "@/components/pages/projects-detail-page";
import {
  getProjectStaticParams,
  getPublishedProjectBySlug,
} from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Projects Detail",
};

export async function generateStaticParams() {
  return getProjectStaticParams();
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = getPublishedProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectsDetailPage project={project} />;
}
