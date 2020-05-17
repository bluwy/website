import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

export default ({ data }) => {
  const post = data.post

  const tableOfContents = `<div class="toc">${post.tableOfContents}</div>`

  const rawHtml = post.html.replace(`<!-- toc -->`, tableOfContents)

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <article className="container">
        <header className="mb-6">
          <h1 className="m-0">{post.frontmatter.title}</h1>
          <div>{post.frontmatter.date}</div>
        </header>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
      }
      tableOfContents(absolute: false, heading: "Table of Contents")
    }
  }
`
