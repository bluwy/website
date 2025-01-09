<script>
  import Head from '$lib/Head.svelte'
  import PaginationCard from '$lib/PaginationCard.svelte'

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props()

  let rawHtml = $derived(
    data.thisProject.markdownHtml.replace(
      '<!-- toc -->',
      data.thisProject.tocHtml
    )
  )
</script>

<Head title={data.thisProject.title} description={data.thisProject.excerpt} />

<article class="container">
  <h1 class="m-0 text-center mb-2">{data.thisProject.title}</h1>
  <div class="space-x-3 text-center mb-6">
    {#each data.thisProject.links as link (link.label)}
      <a class="btn btn--sm btn--translucent" href={link.link}>
        {link.label}
      </a>
    {/each}
  </div>
  <div class="markdown">
    {@html rawHtml}
  </div>
</article>
<div class="container mt-12">
  <div class="flex flex-row flex-wrap">
    <div class="mb-4 w-full sm:mb-0 sm:pr-2 sm:w-1/2">
      {#if data.prevProject}
        <PaginationCard
          type="prev"
          label={data.prevProject.title}
          href={data.prevProject.slug}
        />
      {/if}
    </div>
    <div class="w-full sm:pl-2 sm:w-1/2">
      {#if data.nextProject}
        <PaginationCard
          type="next"
          label={data.nextProject.title}
          href={data.nextProject.slug}
        />
      {/if}
    </div>
  </div>
</div>

<style lang="postcss">
  /* Do this for all markdown? Looks nice */
  article :global(#preview) ~ :global(p) > :global(img) {
    @apply rounded-lg shadow-2xl;
  }
</style>
