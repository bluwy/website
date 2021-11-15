import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'
import { toc } from 'mdast-util-toc'
import { toString } from 'mdast-util-to-string'
import { load as yamlParse } from 'js-yaml'
import readingTime from 'reading-time'

const DEFAULT_EXCERPT_LENGTH = 140
const END_EXCERPT = '<!-- endexcerpt -->'

/** @type {import('unified').Plugin} */
export function remarkData() {
  const remarkTocPipeline = unified().use(remarkParse).use(remarkHtml)

  return function (tree, file) {
    file.data.tocHtml = `<div class="toc">${remarkTocPipeline.stringify(
      toc(tree).map
    )}</div>`

    const frontmatterNode =
      tree.children[0]?.type === 'yaml'
        ? tree.children.splice(0, 1)[0]
        : undefined

    if (frontmatterNode) {
      file.data.frontmatter = yamlParse(frontmatterNode.value)
    }

    const plainString = toString(tree)

    if (plainString.includes(END_EXCERPT)) {
      file.data.excerpt = plainString.substring(
        0,
        plainString.indexOf(END_EXCERPT)
      )
    } else {
      file.data.excerpt =
        plainString.substring(0, DEFAULT_EXCERPT_LENGTH) + '...'
    }

    file.data.readingTime = readingTime(plainString).text
  }
}
