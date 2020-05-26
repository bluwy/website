import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import PaginationCard from "@/components/pagination-card"

export default ({ data }) => {
  const project = data.project
  const nextProject = data.nextProject
  const prevProject = data.prevProject

  const seoTitle = `${project.frontmatter.title} - Project`

  return (
    <Layout>
      <SEO title={seoTitle} />
      <article className="container">
        <h1 className="text-center m-0">{project.frontmatter.title}</h1>
        <div className="text-center mb-6 space-x-3">
          {project.frontmatter.links.map(link => (
            <a
              key={link.label}
              className="btn btn--sm btn--translucent"
              href={link.link}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </article>
      <div className="container mt-12">
        <div className="flex flex-row flex-wrap">
          <div className="w-full mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
            {prevProject && (
              <PaginationCard
                type="prev"
                label={prevProject.frontmatter.title}
                to={prevProject.fields.slug}
              />
            )}
          </div>
          <div className="w-full sm:w-1/2 sm:pl-2">
            {nextProject && (
              <PaginationCard
                type="next"
                label={nextProject.frontmatter.title}
                to={nextProject.fields.slug}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $nextSlug: String!, $prevSlug: String!) {
    project: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        desc
        links {
          label
          link
        }
      }
    }
    nextProject: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    prevProject: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
