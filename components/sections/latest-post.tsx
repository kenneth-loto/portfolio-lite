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
          <ul className="list-disc">
            <li className="text-muted-foreground text-xs">
              {formatDate(latestPost.date)}
            </li>
          </ul>

          <div className="flex flex-col gap-2">
            <Link
              href={`/blog/${latestPost.slug}`}
              className={cn(
                buttonVariants({ variant: "link" }),
                "line-clamp-2 h-auto self-start whitespace-normal p-0 text-read",
              )}
            >
              {latestPost.title}
            </Link>

            <span className="line-clamp-2 text-muted-foreground text-read/read">
              {latestPost.description}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-read">
          No posts yet. Check back soon!
        </p>
      )}
    </Section>
  );
}
