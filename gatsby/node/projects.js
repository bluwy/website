const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const projectsInputDir = `src/projects`
  const projectsOutputDir = `projects`

  if (
    node.internal.type === `MarkdownRemark` &&
    node.fields.collection === "projects"
  ) {
    // Gets the project slug, e.g. "/my-project/"
    let slug = createFilePath({ node, getNode, basePath: projectsInputDir })

    // Projects are in "projects" directory
    slug = `/` + path.join(projectsOutputDir, slug)

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const projectTemplate = path.resolve(`src/templates/project.js`)

  const result = await graphql(`
    query {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "projects" } } }
      ) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Unable to query projects`)
    return
  }

  const projects = result.data.allMarkdownRemark.nodes

  projects.forEach(project => {
    createPage({
      path: project.fields.slug,
      component: projectTemplate,
      context: {
        slug: project.fields.slug,
      },
    })
  })
}
