import { MoveRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/ui/section";
import { getAllPublishedPosts } from "@/lib/posts";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  const posts = getAllPublishedPosts();

  return (
    <Section className="mt-4">
      <SectionTitle>All Posts</SectionTitle>

      <div className="space-y-8 border-t pt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="space-y-2 pl-4">
              <ul className="list-disc">
                <li className="text-muted-foreground text-xs">
                  {formatDate(post.date)}
                </li>
              </ul>

              <h3 className="line-clamp-2 font-medium text-sm">{post.title}</h3>

              <span className="line-clamp-2 text-muted-foreground text-sm/read">
                {post.description}
              </span>

              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Read more about ${post.title}`}
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto self-start whitespace-normal p-0",
                )}
              >
                Read more
                <span className="sr-only">about {post.title}</span>
                <MoveRightIcon aria-hidden="true" />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground text-sm">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </Section>
  );
}
