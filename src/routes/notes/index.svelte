<script context="module">
  export const prerender = true
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
