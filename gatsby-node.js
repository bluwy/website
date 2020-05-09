const addCollection = require("./gatsby/node/add-collection")
const posts = require("./gatsby/node/posts")
const projects = require("./gatsby/node/projects")

exports.onCreateNode = arg => {
  addCollection.onCreateNode(arg)
  posts.onCreateNode(arg)
  projects.onCreateNode(arg)
}

exports.createPages = async arg => {
  await posts.createPages(arg)
  await projects.createPages(arg)
}
