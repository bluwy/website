import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin} */
export function remarkCodeTitle() {
  return function (tree) {
    visit(tree, 'code', (node, index) => {
      if (!node.lang) return
      if (!node.lang.includes(':title=')) return

      const [lang, title] = node.lang.split(':title=')
      node.lang = lang

      tree.children.splice(index, 0, {
        type: 'html',
        value: `<div class="gatsby-code-title">${title}</div>`
      })
    })
  }
}
