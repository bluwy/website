import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
// import logo from "@/images/logo.svg"

const Home = ({ data }) => {
  const skills = data.skills.nodes
  const projects = data.projects.nodes
  const posts = data.posts.nodes

  return (
    <Layout>
      <SEO />
      <article>
        <section className="container text-center py-10">
          <h1 className="text-3xl m-0">Hello, I'm Bjorn</h1>
          <p>
            A full-stack web developer from Malaysia.
            <br />
            Writes on various topics of interest.
            <br />
            Loves open source.
          </p>
        </section>
        <section className="border-t-4 border-b-4 border-primary-600 bg-primary-500 bg-opacity-50 dark:border-primary-900 dark:bg-primary-700 dark:bg-opacity-20">
          <div className="container py-8">
            <h2 className="mt-0">Check Me Out</h2>
            <p className="mb-8">
              I've picked up many skills in various area of development
              throughout the years. Here's what I know so far!
            </p>
            <table className="w-full">
              <tbody>
                {skills.map(skill => (
                  <tr key={skill.title}>
                    <th className="table-row sm:table-cell font-semibold text-left align-top pr-3">
                      {skill.title}
                    </th>
                    <td className="table-row sm:table-cell">
                      {skill.topics.join(", ")}
                      <br />
                      <br />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="container mt-8">
          <div className="flex flex-row justify-between items-center mb-1">
            <div>
              <h2 className="m-0">Featured Projects</h2>
            </div>
            <div>
              <Link className="btn text-sm" to="/projects">
                View all
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-wrap sm:flex-row -mx-2">
            {projects.map(project => (
              <div
                className="w-full sm:w-1/2 p-2"
                key={project.frontmatter.title}
              >
                <Link className="card flex" to={project.fields.slug}>
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-lg h-12 overflow-hidden mr-3"
                      src={require(`@/images/project-icons/${project.frontmatter.icon}`)}
                      alt={`${project.frontmatter.title} icon`}
                    />
                  </div>
                  <div>
                    <div className="text-md font-semibold">
                      {project.frontmatter.title}
                    </div>
                    <div className="text-sm opacity-80">
                      {project.frontmatter.desc}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className="container mt-8">
          <div className="flex flex-row justify-between items-center mb-1">
            <div>
              <h2 className="m-0">Recent Posts</h2>
            </div>
            <div>
              <Link className="btn text-sm" to="/blog">
                View all
              </Link>
            </div>
          </div>
          <div className="flex flex-col flex-wrap sm:flex-row -mx-2">
            {posts.map(post => (
              <div className="w-full sm:w-1/2 p-2" key={post.frontmatter.title}>
                <Link className="card flex" to={post.fields.slug}>
                  <div>
                    <div className="text-md font-semibold">
                      {post.frontmatter.title}
                    </div>
                    <div className="text-sm opacity-80">
                      {post.frontmatter.date} - {post.timeToRead} min read
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query {
    skills: allSkillsYaml {
      nodes {
        title
        topics
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fields: { collection: { eq: "projects" } }
        frontmatter: { featured: { eq: true } }
      }
      sort: { fields: frontmatter___title }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          desc
          icon
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { collection: { eq: "posts" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
    ) {
      nodes {
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

export default Home
