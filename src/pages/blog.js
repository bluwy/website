import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

const Blog = ({ data }) => {
  const posts = data.posts.nodes

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="container">
        <h1 className="text-center m-0 mb-6">Blog Posts</h1>
        <section className="flex flex-row flex-wrap -mx-2">
          {posts.map(post => (
            <div className="w-full sm:w-1/2 p-2">
              <Link
                className="card block"
                key={post.frontmatter.title}
                to={post.fields.slug}
              >
                <div className="text-xl font-semibold">
                  {post.frontmatter.title}
                </div>
                <div className="mb-3 opacity-75">{post.excerpt}</div>
                <div className="text-sm opacity-50">
                  {post.frontmatter.date} - {post.timeToRead} min read
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    posts: allMarkdownRemark(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        excerpt
        timeToRead
        frontmatter {
          title
          date(formatString: "D MMMM YYYY")
        }
        fields {
          slug
        }
      }
    }
  }
`

export default Blog
