import { markdownHtml } from '../../data/notes.md'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  return {
    body: {
      notesHtml: markdownHtml
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
