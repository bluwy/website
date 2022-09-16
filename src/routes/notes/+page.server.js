import { markdownHtml } from '../../data/notes.md'

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({ setHeaders }) {
  setHeaders({
    'cache-control': 'public, maxage=3600'
  })

  return {
    notesHtml: markdownHtml
  }
}
