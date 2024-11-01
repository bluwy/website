import { createMarkdownProcessor } from '@bluwy/markdown'

/**
 * @returns {{
 *   name: string,
 *   transform: (code: string, id: string) => Promise<string>
 * }}
 */
export default function rollupPluginMarkdown() {
  const markdownProcessor = createMarkdownProcessor()

  return {
    name: 'rollup-plugin-markdown',
    async transform(code, id) {
      if (!/\.md$/.test(id)) return

      const processed = await markdownProcessor.process(code)

      const { images, ...processedData } = processed.data

      const imagesImport = images
        .map(({ name, path }) => `import ${name} from '${path}'`)
        .join('\n')

      const processedDataExports = Object.entries(processedData)
        .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)}`)
        .join('\n')

      let rawMarkdown = JSON.stringify(processed.toString())
      for (const image of images) {
        rawMarkdown = rawMarkdown.replaceAll(image.name, `"+${image.name}+"`)
      }

      const markdownExports = `export const markdownHtml = ${rawMarkdown}`

      return imagesImport + '\n' + processedDataExports + '\n' + markdownExports
    }
  }
}
