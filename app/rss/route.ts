import { baseUrl } from "@/app/sitemap";
import { getAllPublishedPosts } from "@/lib/posts";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPublishedPosts();

  const itemsXml = posts
    .map(
      (post) =>
        `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${escapeXml(`${baseUrl}/blog/${post.slug}`)}</link>
        <description>${escapeXml(post.description)}</description>
          <pubDate>${post.date.toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Kenneth Loto</title>
      <link>${escapeXml(baseUrl)}</link>
      <description>Thoughts on software engineering and web development.</description>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
      // Cache for 1 week — posts don't change in real time
      "Cache-Control": "public, max-age=604800, s-maxage=604800",
    },
  });
}
