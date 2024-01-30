import { visit } from 'unist-util-visit'
import parse from 'fenceparser'

/** @type {import('unified').Plugin} */
export function remarkCodeTitle() {
  return function (tree) {
    const handledNodes = new Set()
    visit(tree, 'code', (node, index) => {
      if (!node.lang || !node.meta) return
      if (!node.meta.includes('title=')) return

      // The same node could be visited twice because we splice below
      if (handledNodes.has(node)) return
      handledNodes.add(node)

      const parsed = parse(node.meta)

      tree.children.splice(index, 0, {
        type: 'html',
        value: `<div class="gatsby-code-title">${parsed.title}</div>`
      })
    })
  }
}
