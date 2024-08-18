import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeShiki from '@shikijs/rehype'
import { transformerMetaHighlight } from '@shikijs/transformers'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import { remarkCodeTitle } from './remark-code-title.js'
import { remarkData } from './remark-data.js'
import { rehypeData } from './rehype-data.js'

export function createMarkdownProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkCodeTitle)
    .use(remarkData)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeShiki, {
      theme: 'one-dark-pro',
      langs: [
        'html',
        'css',
        'javascript',
        'typescript',
        'ini',
        'xml',
        'svelte',
        'json',
        'bash'
      ],
      addLanguageClass: true,
      transformers: [transformerMetaHighlight()]
    })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        ariaHidden: 'true',
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
}
