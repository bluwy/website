import { createMarkdownProcessor } from '@bluwy/markdown'

export default function sveltePreprocessMarkdown() {
  const markdownProcessor = createMarkdownProcessor()

  return {
    /**
     * @param {{ content: string, filename?: string }} param
     */
    async markup({ content, filename }) {
      if (!filename || !filename.endsWith('.svelte.md')) return

      const result = await markdownProcessor.process(content)

      return result.toString()
    }
  }
}
