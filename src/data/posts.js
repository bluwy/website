const postMarkdowns = import.meta.globEager('../posts/*/index.md')

/**
 * @typedef {{
 *   title: string,
 *   date: Date
 * }} PostFrontmatter
 */

/**
 * @typedef {{
 *   frontmatter: PostFrontmatter,
 *   readingTime: string,
 *   excerpt: string,
 *   tocHtml: string,
 *   markdownHtml: string,
 *   slug: string
 * }} Post
 */

/** @type {Post[]} */
export const posts = Object.entries(postMarkdowns).map(([k, v]) => ({
  slug: '/blog/' + k.match(/posts\/\d{4}-\d{2}-\d{2}-(.*)\/index.md/)[1],
  ...v,
  frontmatter: {
    ...v.frontmatter,
    date: new Date(v.frontmatter.date)
  }
}))
