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

/** @type {import('./$types').PageServerLoad} */
export async function load({ setHeaders }) {
  /** @type {MainPost[]} */
  const allPosts = posts
    .filter((v) => (import.meta.env.PROD ? !v.isDraft : true))
    .map((v) => ({
      slug: v.slug,
      excerpt: v.excerpt,
      title: v.frontmatter.title,
      date: v.frontmatter.date,
      readingTime: v.readingTime
    }))

  setHeaders({
    'cache-control': 'public, maxage=3600'
  })

  return {
    allPosts
  }
}
