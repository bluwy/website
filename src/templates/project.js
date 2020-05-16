import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

export default ({ data }) => {
  const project = data.project

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
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
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
  }
`
