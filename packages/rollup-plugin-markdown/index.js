import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'
import remarkHtml from 'remark-html'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
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
  const remarkPipeline = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkPrism)
    .use(remarkData)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        ariaHidden: true,
        tabIndex: -1,
        className: 'anchor'
      },
      content: {
        type: 'element',
        tagName: 'svg',
        properties: {
          width: '24',
          height: '24',
          fill: 'currentColor'
        },
        children: [
          {
            type: 'element',
            tagName: 'use',
            properties: {
              'xlink:href': '#autolink-icon' // Symbol defined in Icons.svelte
            }
          }
        ]
      }
    })
    .use(rehypeStringify)

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

/** @type {import('unified').Plugin} */
function remarkData() {
  const remarkTocPipeline = unified().use(remarkParse).use(remarkHtml)

  return function (tree, file) {
    file.data.tocHtml = remarkTocPipeline.stringify(toc(tree).map)

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
