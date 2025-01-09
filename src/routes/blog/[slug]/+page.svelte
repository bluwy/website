<script>
  import Head from '$lib/Head.svelte'
  import PaginationCard from '$lib/PaginationCard.svelte'
  import { formatDate } from '$lib/utils'

  /**
   * @typedef {Object} Props
   * @property {import('./$types').PageData} data
   */

  /** @type {Props} */
  let { data } = $props()

  let rawHtml = $derived(
    data.thisPost.markdownHtml.replace('<!-- toc -->', data.thisPost.tocHtml)
  )
</script>

<Head title={data.thisPost.title} description={data.thisPost.excerpt} />

<svelte:head>
  <meta
    name="og:image"
    content={`https://bjornlu.com${data.thisPost.slug}.png`}
  />
  <meta name="og:url" content={`https://bjornlu.com${data.thisPost.slug}`} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<article class="container">
  <header class="mb-6">
    <h1 class="m-0">{data.thisPost.title}</h1>
    <p class="mt-2">
      <span>
        {formatDate(new Date(data.thisPost.date))}
      </span>
      {#if data.thisPost.isDraft}
        <span class="opacity-70 text-sm">(Draft)</span>
      {/if}
      {#if data.thisPost.lastUpdate}
        <span class="opacity-70 text-sm">
          (Updated {formatDate(new Date(data.thisPost.lastUpdate))})
        </span>
      {/if}
    </p>
  </header>
  <div class="markdown">
    {@html rawHtml}
  </div>
</article>
<div class="container mt-12">
  <div class="flex flex-row flex-wrap">
    <div class="mb-4 w-full sm:mb-0 sm:pr-2 sm:w-1/2">
      {#if data.prevPost}
        <PaginationCard
          type="prev"
          label={data.prevPost.title}
          href={data.prevPost.slug}
        />
      {/if}
    </div>
    <div class="w-full sm:pl-2 sm:w-1/2">
      {#if data.nextPost}
        <PaginationCard
          type="next"
          label={data.nextPost.title}
          href={data.nextPost.slug}
        />
      {/if}
    </div>
  </div>
</div>
