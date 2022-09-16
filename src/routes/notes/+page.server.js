import { markdownHtml } from '../../data/notes.md'

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load() {
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
  return {
    body: {
      notesHtml: markdownHtml
    },
    headers: {
      'cache-control': 'public, maxage=3600'
    }
  }
}
