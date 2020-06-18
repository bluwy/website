import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import PaginationCard from "@/components/pagination-card"

export default ({ data }) => {
  const post = data.post
  const nextPost = data.nextPost
  const prevPost = data.prevPost

  const tableOfContents = `<div class="toc">${post.tableOfContents}</div>`

  const rawHtml = post.html.replace(`<!-- toc -->`, tableOfContents)

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
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
      <div className="container mt-12">
        <div className="flex flex-row flex-wrap">
          <div className="w-full mb-4 sm:mb-0 sm:w-1/2 sm:pr-2">
            {prevPost && (
              <PaginationCard
                type="prev"
                label={prevPost.frontmatter.title}
                to={prevPost.fields.slug}
              />
            )}
          </div>
          <div className="w-full sm:w-1/2 sm:pl-2">
            {nextPost && (
              <PaginationCard
                type="next"
                label={nextPost.frontmatter.title}
                to={nextPost.fields.slug}
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
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
      }
      tableOfContents(absolute: false, heading: "Table of Contents")
    }
    nextPost: markdownRemark(fields: { slug: { eq: $nextSlug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    prevPost: markdownRemark(fields: { slug: { eq: $prevSlug } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
