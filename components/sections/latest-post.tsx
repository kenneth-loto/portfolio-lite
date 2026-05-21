import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { getLatestPublishedPost } from "@/lib/posts";
import { cn, formatDate } from "@/lib/utils";

export function LatestPost() {
  const latestPost = getLatestPublishedPost();

  return (
    <Section>
      <SectionTitle>Latest Post</SectionTitle>

      {latestPost ? (
        <div className="space-y-2 border-t pt-4 pl-4">
          <p className="list-item list-disc text-muted-foreground text-xs">
            {formatDate(latestPost.date)}
          </p>

          <h3 className="font-medium text-sm">{latestPost.title}</h3>

          <p className="line-clamp-2 text-muted-foreground text-sm/read">
            {latestPost.description}
          </p>

          <Link
            href={`/blog/${latestPost.slug}`}
            className={cn(buttonVariants({ variant: "link" }), "h-auto p-0")}
          >
            Read more
            <span className="sr-only">about {latestPost.title}</span>
            <MoveRightIcon aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-sm">
          No posts yet. Check back soon!
        </p>
      )}
    </Section>
  );
}
