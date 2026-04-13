import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Section,
  SectionAction,
  SectionHeader,
  SectionTitle,
} from "@/components/ui/section";
import { blog } from "@/lib/data/blog";
import { cn } from "@/lib/utils";

export function LatestBlog() {
  return (
    <Section className="space-y-8">
      <SectionHeader>
        <SectionTitle>Latest Blog</SectionTitle>
        <SectionAction href="/blog">View All</SectionAction>
      </SectionHeader>
      <ul className="list-disc space-y-4 pl-4">
        {blog.map((blog, index) => {
          const key = `${index}-${blog.title}`;

          return (
            <li key={key}>
              <p className="text-sm">
                <Link
                  href={blog.href}
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "h-auto p-0",
                  )}
                >
                  {blog.title}
                </Link>
                {" — "}
                <span className="text-muted-foreground text-sm/relaxed">
                  {blog.description}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
