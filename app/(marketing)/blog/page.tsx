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

              <div className="flex flex-col gap-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "line-clamp-2 h-auto self-start whitespace-normal p-0 text-read",
                  )}
                >
                  {post.title}
                </Link>

                <span className="line-clamp-2 text-muted-foreground text-read/read">
                  {post.description}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground text-read">
            No posts yet. Check back soon!
          </p>
        )}
      </div>
    </Section>
  );
}
