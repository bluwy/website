import { projects } from '$data/projects'

/**
 * @typedef {{
 *   slug: string,
 *   excerpt: string,
 *   icon: string,
 *   title: string,
 *   tags: string[]
 * }} MainProject
 */

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  /** @type {MainProject[]} */
  const allProjects = projects.map((v) => ({
    slug: v.slug,
    excerpt: v.excerpt,
    icon: v.frontmatter.icon,
    title: v.frontmatter.title,
    tags: v.frontmatter.tags
  }))

  return {
    allProjects
  }
}
