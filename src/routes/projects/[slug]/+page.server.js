import { projects } from '$data/projects'

/**
 * @typedef {{
 *   slug: string,
 *   markdownHtml: string,
 *   excerpt: string,
 *   title: string,
 *   links: { label: string, link: string }[]
 * }} SlugThisProject
 */

/**
 * @typedef {{
 *   slug: string,
 *   title: string,
 * }} SlugPageProject
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params

  const projectIndex = projects.findIndex((v) => v.slug.endsWith(slug))

  if (projectIndex < 0) return

  /** @type {SlugThisProject} */
  const thisProject = {
    slug: projects[projectIndex].slug,
    markdownHtml: projects[projectIndex].markdownHtml,
    excerpt: projects[projectIndex].excerpt,
    title: projects[projectIndex].frontmatter.title,
    links: projects[projectIndex].frontmatter.links
  }

  /** @type {SlugPageProject} */
  const prevProject =
    projectIndex - 1 >= 0
      ? {
          slug: projects[projectIndex - 1].slug,
          title: projects[projectIndex - 1].frontmatter.title
        }
      : null

  /** @type {SlugPageProject} */
  const nextProject =
    projectIndex + 1 < projects.length
      ? {
          slug: projects[projectIndex + 1].slug,
          title: projects[projectIndex + 1].frontmatter.title
        }
      : null

  return {
    thisProject,
    prevProject,
    nextProject
  }
}
