import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { toc } from 'mdast-util-toc'
import { toString } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import { load as yamlParse } from 'js-yaml'
import readingTime from 'reading-time'
import shiki from 'shiki'
import { codeToHtml } from './shiki.js'

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
    .use(remarkCodeTitle)
    .use(remarkShiki)
    .use(remarkData)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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

/** @type {import('unified').Plugin} */
function remarkShiki() {
  shiki.render
  const highlighterPromise = shiki.getHighlighter({
    theme: 'one-dark-pro',
    langs: ['html', 'css', 'javascript', 'typescript', 'ini', 'xml']
  })

  return async function (tree) {
    const highlighter = await highlighterPromise
    visit(tree, 'code', (node) => {
      node.type = 'html'
      node.value = codeToHtml(
        highlighter,
        node.value,
        // https://github.com/shikijs/shiki/issues/196
        node.lang === 'svelte' ? 'html' : node.lang
      )
    })
  }
}

/** @type {import('unified').Plugin} */
function remarkCodeTitle() {
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
