<script>
  import Head from '$lib/Head.svelte'
  import PaginationCard from '$lib/PaginationCard.svelte'
  import { formatDate } from '$lib/utils'

  /** @type {import('./$types').PageData} */
  export let data

  $: rawHtml = data.thisPost.markdownHtml.replace(
    '<!-- toc -->',
    data.thisPost.tocHtml
  )
</script>

<Head title={data.thisPost.title} description={data.thisPost.excerpt} />

<article class="container">
  <header class="mb-6">
    <h1 class="m-0">{data.thisPost.title}</h1>
    <p class="mt-2">
      <span>
        {formatDate(new Date(data.thisPost.date))}
      </span>
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
