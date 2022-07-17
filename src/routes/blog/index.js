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

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  /** @type {MainPost[]} */
  const allPosts = posts.map((v) => ({
    slug: v.slug,
    excerpt: v.excerpt,
    title: v.frontmatter.title,
    date: v.frontmatter.date,
    readingTime: v.readingTime
  }))

  return {
    body: {
      allPosts
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
