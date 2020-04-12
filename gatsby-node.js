const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const postsInputDir = `src/posts`
  const postsOutputDir = `blog`

  if (node.internal.type === `MarkdownRemark`) {
    // Gets the post slug, e.g. "/2020-06-23-happy-birthday/"
    let slug = createFilePath({ node, getNode, basePath: postsInputDir })

    // Replace the first 3 "-" to "/", e.g. "/2020/06/23/happy-birthday/"
    for (let i = 0; i < 3; i++) {
      slug = slug.replace(`-`, `/`)
    }

    // Posts are in "blog" directory
    slug = path.join(postsOutputDir, slug)

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/blog-post.js`)
  const projectTemplate = path.resolve(`src/templates/project.js`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
      allProjectsYaml {
        nodes {
          desc
          hero
          learned
          link
          overview
          slug
          title
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Unable to query blog posts or projects`)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes
  const projects = result.data.allProjectsYaml.nodes

  posts.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: postTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  projects.forEach(project => {
    createPage({
      path: `projects/${project.slug}`,
      component: projectTemplate,
      context: {
        project,
      },
    })
  })
}
