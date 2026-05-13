import { baseUrl } from "@/app/sitemap";
import { getAllPublishedPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPublishedPosts();

  const itemsXml = posts
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.description}</description>
          <pubDate>${post.date.toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Kenneth Loto</title>
      <link>${baseUrl}</link>
      <description>Thoughts on software engineering and web development.</description>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: { "Content-Type": "text/xml" },
  });
}
