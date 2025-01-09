<script>
  import Head from '$lib/Head.svelte'

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props()
</script>

<Head title="Notes" />

<article class="container">
  <h1 class="m-0 text-center mb-6">Notes</h1>
  <div class="markdown">
    {@html data.notesHtml}
  </div>
</article>
