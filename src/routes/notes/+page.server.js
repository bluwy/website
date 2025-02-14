import { markdownHtml } from '../../data/notes.md'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    notesHtml: markdownHtml
  }
}
