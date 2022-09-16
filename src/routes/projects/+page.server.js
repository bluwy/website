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
export async function load() {
  /** @type {MainProject[]} */
  const allProjects = projects.map((v) => ({
    slug: v.slug,
    excerpt: v.excerpt,
    icon: v.frontmatter.icon,
    title: v.frontmatter.title,
    tags: v.frontmatter.tags
  }))

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
  return {
    body: {
      allProjects
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
