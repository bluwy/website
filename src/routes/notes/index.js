import { markdownHtml } from '../../data/notes.md'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  return {
    body: {
      notesHtml: markdownHtml
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
