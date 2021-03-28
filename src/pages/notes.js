import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

export default ({ data }) => {
  const notes = data.notes

  return (
    <Layout>
      <SEO title="Notes" />
      <article className="container">
        <h1 className="text-center m-0 mb-6">Notes</h1>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: notes.html }}
        />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    notes: markdownRemark(
      fields: { collection: { eq: "data" } }
      fileAbsolutePath: { regex: "/notes.md$/" }
    ) {
      html
    }
  }
`
