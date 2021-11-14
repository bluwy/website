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
  import Head from '$lib/Head.svelte'

  /** @type {import("./index.json").MainPost[]} */
  export let notesHtml
</script>

<Head title="Notes" />

<article class="container">
  <h1 class="m-0 text-center mb-6">Notes</h1>
  <div class="markdown">
    {@html notesHtml}
  </div>
</article>
