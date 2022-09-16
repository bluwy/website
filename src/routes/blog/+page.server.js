import { posts } from '$data/posts'

/**
 * @typedef {{
 *   slug: string,
 *   excerpt: string,
 *   title: string,
 *   date: string,
 *   readingTime: string
 * }} MainPost
 */

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load() {
  /** @type {MainPost[]} */
  const allPosts = posts.map((v) => ({
    slug: v.slug,
    excerpt: v.excerpt,
    title: v.frontmatter.title,
    date: v.frontmatter.date,
    readingTime: v.readingTime
  }))

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
  return {
    body: {
      allPosts
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
