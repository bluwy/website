const projectMarkdowns = import.meta.glob('../projects/*/index.md', {
  eager: true
})
const projectIcons = import.meta.glob('../assets/images/project-icons/*', {
  eager: true
})

/**
 * @typedef {{
 *   title: string,
 *   desc: string,
 *   icon?: string,
 *   links: { label: string, link: string }[],
 *   tags: string[],
 *   featured?: boolean
 * }} ProjectFrontmatter
 */

/**
 * @typedef {{
 *   frontmatter: ProjectFrontmatter,
 *   readingTime: string,
 *   excerpt: string,
 *   tocHtml: string,
 *   markdownHtml: string,
 *   slug: string
 * }} Project
 */

/** @type {Project[]} */
export const projects = Object.entries(projectMarkdowns).map(([k, v]) => ({
  slug: '/projects/' + k.match(/projects\/(.*)\/index.md/)[1],
  ...v,
  frontmatter: {
    ...v.frontmatter,
    icon: v.frontmatter.icon
      ? projectIcons['../assets/images/project-icons/' + v.frontmatter.icon]
          .default
      : undefined
  }
}))
