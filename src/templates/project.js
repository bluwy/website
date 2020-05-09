import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const project = data.markdownRemark

  const seoTitle = `${project.frontmatter.title} - Project`

  return (
    <Layout>
      <SEO title={seoTitle} />
      <article className="container">
        <h1 className="m-0">{project.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
