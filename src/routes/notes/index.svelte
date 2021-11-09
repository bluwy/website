<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
    const res = await fetch('/notes.json')

    if (res.ok) {
      return {
        props: await res.json()
      }
    }
  }
</script>

<script>
  /** @type {import("./index.json").MainPost[]} */
  export let notesHtml
</script>

<article class="container">
  <h1 class="text-center m-0 mb-6">Notes</h1>
  <div class="markdown">
    {@html notesHtml}
  </div>
</article>
