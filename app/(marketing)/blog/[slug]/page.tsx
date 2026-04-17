import { MDXContent } from "@content-collections/mdx/react";
import { ClockIcon, MoveLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { author } from "@/lib/data/author";
import { getPostStaticParams, getPublishedPostBySlug } from "@/lib/posts";
import { cn, formatDate, getInitials } from "@/lib/utils";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Blog Detail",
};

export async function generateStaticParams() {
  return getPostStaticParams();
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;

  const post = getPublishedPostBySlug(slug);

  if (!post) notFound();

  return (
    <Section className="space-y-16">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost-text" }),
          "px-0 font-sans",
        )}
      >
        <MoveLeftIcon />
        Back to Blog
      </Link>

      <article className="space-y-8">
        {/* Article Header */}
        <div className="space-y-8 border-b pb-4">
          {/* Date + Title */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs">
              {formatDate(post.date)}
            </p>

            <h1 className="font-sans font-semibold text-3xl leading-tight tracking-tighter md:text-4xl">
              {post.title}
            </h1>
          </div>

          {/* Author avatar/name · reading time */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
              </Avatar>

              <span className="font-sans text-sm">{author.name}</span>
            </div>

            {/* Vertical divider between author and reading time */}
            <Separator orientation="vertical" className="h-6" />

            <span className="flex items-center gap-1.5 font-mono text-muted-foreground text-xs">
              <ClockIcon aria-hidden="true" className="size-3.5" />
              <span className="sr-only">Reading time</span>
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Article body (MDX rendered content) */}
        <div className="prose prose-mono-chrome font-sans md:max-w-none">
          <MDXContent code={post.mdx} />
        </div>
      </article>

      <div className="border-t pt-4">
        {/* TODO: Make tags a button */}
        {/* TODO: Create the related posts ui */}
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((tag: string) => (
            <li key={tag}>
              <Badge variant="outline" className="font-mono">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
