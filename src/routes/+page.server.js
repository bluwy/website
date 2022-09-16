import { posts } from '$data/posts'
import { projects } from '$data/projects'

/**
 * @typedef {{
 *   slug: string,
 *   icon?: string,
 *   title: string,
 *   desc: string
 * }} IndexProject
 */

/**
 * @typedef {{
 *   slug: string,
 *   title: string,
 *   date: string,
 *   readingTime: string
 * }} IndexPost
 */

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load() {
  /** @type {IndexProject[]} */
  const featuredProjects = projects
    .filter((v) => v.frontmatter.featured)
    .map((v) => ({
      slug: v.slug,
      icon: v.frontmatter.icon,
      title: v.frontmatter.title,
      desc: v.frontmatter.desc
    }))

  /** @type {IndexPost[]} */
  const recentPosts = posts
    .map((v) => ({
      slug: v.slug,
      title: v.frontmatter.title,
      date: v.frontmatter.date,
      readingTime: v.readingTime
    }))
    .slice(0, 4)

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
  return {
    body: {
      featuredProjects,
      recentPosts
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
