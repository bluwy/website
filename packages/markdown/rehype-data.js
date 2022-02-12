import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin} */
export function rehypeData() {
  return function (tree, file) {
    file.data.images = []

    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const path = node.properties.src
        if (path.startsWith('.')) {
          const name = hash(path)
          file.data.images.push({ name, path })
          node.properties.src = name
        }
      }
    })
  }
}

/**
 * @param {string} input
 */
export function hash(input) {
  return '_' + input.replace(/[\\\/\.]/g, '_')
}
