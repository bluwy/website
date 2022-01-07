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
export const posts = Object.entries(postMarkdowns)
  .map(([k, v]) => {
    const [, date, name] = k.match(/posts\/(\d{4}-\d{2}-\d{2})-(.*)\/index.md/)
    return {
      slug: '/blog/' + name,
      date: new Date(date),
      ...v
    }
  })
  .sort((a, b) => b.date - a.date)
