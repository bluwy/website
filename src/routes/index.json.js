import { projects } from '$data/projects'

/**
 * @typedef {{
 *   slug: string,
 *   icon: string,
 *   title: string,
 *   desc: string
 * }} IndexProject
 */

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  /** @type {IndexProject[]} */
  const featuredProjects = projects
    .filter((v) => v.frontmatter.featured)
    .map((v) => ({
      slug: v.slug,
      icon: v.frontmatter.icon,
      title: v.frontmatter.title,
      desc: v.frontmatter.desc
    }))

  return {
    body: {
      projects: featuredProjects
    }
  }
}
