import { MDXContent } from "@content-collections/mdx/react";
import type { Post } from "content-collections";
import { ClockIcon, MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { ShareButton } from "@/components/share-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { aboutMe } from "@/lib/data/about-me";
import { getRelatedPosts } from "@/lib/posts";
import { cn, formatDate, getInitials } from "@/lib/utils";

interface BlogDetailPageProps {
  post: Post;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const relatedPosts = getRelatedPosts(post.slug, post.tags ?? []);

  return (
    <Section className="mt-4 space-y-16">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "link" }),
          "h-auto self-start p-0",
        )}
      >
        <MoveLeftIcon data-icon="inline-start" aria-hidden="true" />
        Back to blog
      </Link>

      <article className="space-y-8">
        {/* Article Header */}
        <div className="space-y-8 border-b pb-4">
          {/* Date + Title */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-xs">
              {formatDate(post.date)}
            </p>

            <h1 className="font-medium text-3xl leading-tight tracking-tighter md:text-4xl">
              {post.title}
            </h1>
          </div>

          {/* AboutMe avatar/name · reading time */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={aboutMe.avatar} alt={aboutMe.name} />
                <AvatarFallback>{getInitials(aboutMe.name)}</AvatarFallback>
              </Avatar>

              <span className="text-sm">{aboutMe.name}</span>
            </div>

            {/* Vertical divider between AboutMe and reading time */}
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

      <div className="space-y-16 border-t pt-4">
        <div className="space-y-4">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Tags
          </h2>

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

        <div className="space-y-4">
          <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Links
          </h2>

          <ShareButton title={post.title} />
        </div>

        {relatedPosts.length > 0 && (
          <div className="space-y-8">
            <h2 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
              Related Posts
            </h2>

            <div className="space-y-8 border-t pt-4">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.slug} className="space-y-2 pl-4">
                  <ul className="list-disc" role="presentation">
                    <li className="text-muted-foreground text-xs">
                      {formatDate(relatedPost.date)}
                    </li>
                  </ul>

                  <h3 className="line-clamp-2 font-medium text-sm">
                    {relatedPost.title}
                  </h3>

                  <span className="line-clamp-2 text-muted-foreground text-sm/read">
                    {relatedPost.description}
                  </span>

                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    aria-label={`Read more about ${relatedPost.title}`}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "h-auto self-start whitespace-normal p-0",
                    )}
                  >
                    Read more
                    <span className="sr-only">about {relatedPost.title}</span>
                    <MoveRightIcon data-icon="inline-end" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
