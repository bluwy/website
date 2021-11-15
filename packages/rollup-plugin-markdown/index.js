import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { remarkCodeTitle } from './remark-code-title.js'
import { remarkShiki } from './remark-shiki.js'
import { remarkData } from './remark-data.js'
import { rehypeData } from './rehype-data.js'

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
    .use(rehypeData)
    .use(rehypeStringify)

  return {
    name: 'rollup-plugin-markdown',
    async transform(code, id) {
      if (!/\.md$/.test(id)) return

      const processed = await remarkPipeline.process(code)

      const { images, ...processedData } = processed.data

      const imagesImport = images
        .map(({ name, path }) => `import ${name} from '${path}'`)
        .join('\n')

      const processedDataExports = Object.entries(processedData)
        .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`)
        .join('\n')

      let rawMarkdown = JSON.stringify(processed.toString())
      for (const image of images) {
        rawMarkdown = rawMarkdown.replace(image.name, `" + ${image.name} + "`)
      }

      const markdownExports = `export const markdownHtml = ${rawMarkdown}`

      return imagesImport + '\n' + processedDataExports + '\n' + markdownExports
    }
  }
}
