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

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ setHeaders }) {
  /** @type {MainProject[]} */
  const allProjects = projects.map((v) => ({
    slug: v.slug,
    excerpt: v.excerpt,
    icon: v.frontmatter.icon,
    title: v.frontmatter.title,
    tags: v.frontmatter.tags
  }))

  setHeaders({
    'cache-control': 'public, maxage=3600'
  })

  return {
    allProjects
  }
}
