import { allPosts, type Post } from "content-collections";

const publishedPosts: Post[] = allPosts
  .filter((post) => post.published)
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function getAllPublishedPosts(): Post[] {
  return publishedPosts;
}

export function getLatestPublishedPost(): Post | undefined {
  return publishedPosts[0];
}

export function getPublishedPostBySlug(slug: string): Post | undefined {
  return publishedPosts.find((post) => post.slug === slug);
}

export function getPostStaticParams(): { slug: string }[] {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[] = [],
  limit = 2,
): Post[] {
  const relatedPosts = publishedPosts.filter(
    (post) => post.slug !== currentSlug,
  );

  const scoredPosts = relatedPosts.map((post) => {
    const matchingTags = (post.tags ?? []).filter((tag) => tags.includes(tag));

    return {
      post,
      score: matchingTags.length,
    };
  });

  const sortedByRelevance = scoredPosts.sort((a, b) => b.score - a.score);

  return sortedByRelevance.slice(0, limit).map((item) => item.post);
}
