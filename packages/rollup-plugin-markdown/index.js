import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import remarkPrism from 'remark-prism'
import { toc } from 'mdast-util-toc'
import { toString } from 'mdast-util-to-string'
import { load as yamlParse } from 'js-yaml'
import readingTime from 'reading-time'

const DEFAULT_EXCERPT_LENGTH = 140
const END_EXCERPT = '<!-- endexcerpt -->'

/**
 * @returns {{
 *   name: string,
 *   transform: (code: string, id: string) => Promise<string>
 * }}
 */
export default function rollupPluginMarkdown() {
  const remarkTocPipeline = remark().use(remarkHtml)

  const remarkPipeline = remark()
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkPrism)
    .use(remarkHtml)
    .use(() => (tree, file) => {
      file.data.tocHtml = remarkTocPipeline.stringify(toc(tree).map, file)

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
    })

  return {
    name: 'rollup-plugin-markdown',
    async transform(code, id) {
      if (!/\.md$/.test(id)) return

      const processed = await remarkPipeline.process(code)

      const module = {
        ...processed.data,
        markdownHtml: processed.toString()
      }

      return Object.entries(module)
        .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`)
        .join('\n')
    }
  }
}
