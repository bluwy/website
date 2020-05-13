import React, { useState, useMemo } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ToggleTagSelect from "../components/toggle-tag-select"

const Projects = ({ data }) => {
  const projects = data.projects.nodes

  const tags = [
    ...new Set(projects.flatMap(project => project.frontmatter.tags)),
  ].sort()

  const [search, setSearch] = useState(``)
  const [filterTags, setFilterTags] = useState([])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const titleMatch = project.frontmatter.title
        .toLowerCase()
        .includes(search.toLowerCase())

      const tagsMatch = filterTags.every(tag => {
        return project.frontmatter.tags.includes(tag)
      })

      return titleMatch && tagsMatch
    })
  }, [projects, search, filterTags])

  return (
    <Layout>
      <SEO title="Projects" />
      <div className="container">
        <h1 className="text-center m-0">Projects</h1>
        <section className="my-6">
          <input
            className="px-3 py-1 mb-4 w-full sm:max-w-sm rounded-md placeholder-black bg-gray-300 bg-opacity-25 border-2 border-gray-500 transition-all duration-300 hover:bg-opacity-50 focus:bg-opacity-50 hover:bg-primary-300 focus:bg-primary-300 hover:border-primary-500 focus:border-primary-500"
            type="text"
            value={search}
            placeholder="Filter projects..."
            onChange={e => setSearch(e.target.value)}
          />
          <ToggleTagSelect
            tags={tags}
            selectedTags={filterTags}
            onChange={setFilterTags}
          />
        </section>
        <section className="space-y-5 sm:-mx-4">
          {filteredProjects.map(project => (
            <Link
              className="flex flex-col sm:flex-row p-4 rounded-lg bg-opacity-25 transition-all duration-200 hover:bg-opacity-50 focus:bg-opacity-50 hover:bg-primary-300 focus:bg-primary-300"
              key={project.frontmatter.title}
              to={project.fields.slug}
            >
              <div className="flex-shrink-0 hidden sm:block">
                <img
                  className="rounded-lg overflow-hidden mr-4"
                  src={require(`../images/project-icons/${project.frontmatter.icon}`)}
                  alt={`${project.frontmatter.title} icon`}
                  width="160"
                  height="160"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-xl font-semibold mb-1">
                    {project.frontmatter.title}
                  </div>
                  <div className="mb-3 opacity-75">{project.excerpt}</div>
                </div>
                <div className="space-x-2">
                  {project.frontmatter.tags.map(tag => (
                    <div className="tag" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { fields: frontmatter___title }
    ) {
      nodes {
        excerpt
        frontmatter {
          title
          icon
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`

export default Projects
