const postMarkdowns = import.meta.glob('../posts/*/index.md', { eager: true })

/**
 * @typedef {{
 *   title: string,
 *   date: Date,
 *   updated: Date
 * }} PostFrontmatter
 */

/**
 * @typedef {{
 *   frontmatter: PostFrontmatter,
 *   readingTime: string,
 *   excerpt: string,
 *   tocHtml: string,
 *   markdownHtml: string,
 *   slug: string,
 *   isDraft: boolean
 * }} Post
 */

/** @type {Post[]} */
export const posts = Object.entries(postMarkdowns)
  .map(([k, v]) => {
    const [, date, name] = k.match(/posts\/(\d{4}-\d{2}-\d{2})-(.*)\/index.md/)
    const isDraft = date === '0000-00-00'
    return {
      slug: '/blog/' + name,
      isDraft,
      ...v,
      frontmatter: {
        ...v.frontmatter,
        date: isDraft ? new Date() : new Date(date),
        updated: v.frontmatter.updated
          ? new Date(v.frontmatter.updated)
          : undefined
      }
    }
  })
  .sort((a, b) => b.frontmatter.date - a.frontmatter.date)
