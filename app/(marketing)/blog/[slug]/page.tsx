import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import { getPostStaticParams, getPublishedPostBySlug } from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Blog Detail",
};

export async function generateStaticParams() {
  return getPostStaticParams();
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return <BlogDetailPage post={post} />;
}
