const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = arg => {
  remarkOnCreateNode(arg)
  postOnCreateNode(arg)
  projectOnCreateNode(arg)
}

exports.createPages = async arg => {
  await postCreatePages(arg)
  await projectCreatePages(arg)
}

//#region Remark

function remarkOnCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const collectionName = getNode(node.parent).sourceInstanceName

    createNodeField({
      node,
      name: `collection`,
      value: collectionName,
    })
  }
}

//#endregion

//#region Posts

function postOnCreateNode({ node, getNode, actions }) {
  const { createNodeField } = actions
  const postsInputDir = `src/posts`
  const postsOutputDir = `blog`

  if (
    node.internal.type === `MarkdownRemark` &&
    node.fields.collection === "posts"
  ) {
    // Gets the post slug, e.g. "/2020-06-23-happy-birthday/"
    let slug = createFilePath({ node, getNode, basePath: postsInputDir })

    // Get post title, e.g. "/happy-birthday/"
    slug = slug.match(/\d{4}-\d{2}-\d{2}-(.*)/)[1]

    // Posts are in "blog" directory
    slug = `/` + path.join(postsOutputDir, slug)

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

async function postCreatePages({ graphql, actions, reporter }) {
  const { createPage } = actions
  const postTemplate = path.resolve(`src/templates/blog-post.js`)

  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "posts" } } }) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Unable to query blog posts`)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  posts.forEach(post => {
    createPage({
      path: post.fields.slug,
      component: postTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })
}

//#endregion

//#region Projects

function projectOnCreateNode({ node, getNode, actions }) {
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

async function projectCreatePages({ graphql, actions, reporter }) {
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

//#endregion
