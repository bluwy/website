<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import Head from '$lib/Head.svelte'

  /** @type {string} */
  export let notesHtml
</script>

<Head title="Notes" />

<article class="container">
  <h1 class="m-0 text-center mb-6">Notes</h1>
  <div class="markdown">
    {@html notesHtml}
  </div>
</article>
