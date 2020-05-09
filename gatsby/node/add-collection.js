exports.onCreateNode = ({ node, actions, getNode }) => {
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
