import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseUrl } from "@/app/sitemap";
import { BlogDetailPage } from "@/components/pages/blog-detail-page";
import {
  getPostOgImage,
  getPostStaticParams,
  getPublishedPostBySlug,
} from "@/lib/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPostBySlug(slug);

  if (!post) return {};

  const ogPostImage = getPostOgImage(post);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      siteName: "Kenneth Loto",
      publishedTime: post.date.toISOString(),
      url: `${baseUrl}/blog/${post.slug}`,
      images: [{ url: ogPostImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogPostImage],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  const ogPostImage = getPostOgImage(post);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date.toISOString(),
            dateModified: post.date.toISOString(),
            description: post.description,
            url: `${baseUrl}/blog/${post.slug}`,
            image: ogPostImage,
            author: {
              "@type": "Person",
              name: "Kenneth Loto",
            },
          }),
        }}
      />
      <BlogDetailPage post={post} />
    </>
  );
}
