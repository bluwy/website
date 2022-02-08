import { posts } from '$data/posts'

/**
 * @typedef {{
 *   slug: string,
 *   markdownHtml: string,
 *   excerpt: string,
 *   tocHtml: string,
 *   title: string,
 *   date: string,
 * }} SlugThisPost
 */

/**
 * @typedef {{
 *   slug: string,
 *   title: string,
 * }} SlugPagePost
 */

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const { slug } = params

  const postIndex = posts.findIndex((v) => v.slug.endsWith(slug))

  if (postIndex < 0) return

  /** @type {SlugThisPost} */
  const thisPost = {
    slug: posts[postIndex].slug,
    markdownHtml: posts[postIndex].markdownHtml,
    excerpt: posts[postIndex].excerpt,
    tocHtml: posts[postIndex].tocHtml,
    title: posts[postIndex].frontmatter.title,
    date: posts[postIndex].date
  }

  /** @type {SlugPagePost} */
  const prevPost =
    postIndex - 1 >= 0
      ? {
          slug: posts[postIndex - 1].slug,
          title: posts[postIndex - 1].frontmatter.title
        }
      : null

  /** @type {SlugPagePost} */
  const nextPost =
    postIndex + 1 < posts.length
      ? {
          slug: posts[postIndex + 1].slug,
          title: posts[postIndex + 1].frontmatter.title
        }
      : null

  return {
    body: {
      thisPost,
      prevPost,
      nextPost
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
