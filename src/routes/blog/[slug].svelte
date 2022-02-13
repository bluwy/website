<script context="module">
  export const prerender = true
</script>

<script>
  import Head from '$lib/Head.svelte'
  import PaginationCard from '$lib/PaginationCard.svelte'
  import { formatDate } from '$lib/utils'

  /** @type {import("./[slug]").SlugThisPost} */
  export let thisPost
  /** @type {import("./[slug]").SlugPagePost | null} */
  export let prevPost
  /** @type {import("./[slug]").SlugPagePost | null} */
  export let nextPost

  $: rawHtml = thisPost.markdownHtml.replace('<!-- toc -->', thisPost.tocHtml)
</script>

<Head title={thisPost.title} description={thisPost.excerpt} />

<article class="container">
  <header class="mb-6">
    <h1 class="m-0">{thisPost.title}</h1>
    <p class="mt-2">
      <span>
        {formatDate(new Date(thisPost.date))}
      </span>
      {#if thisPost.lastUpdate}
        <span class="opacity-70 text-sm">
          (Updated {formatDate(thisPost.lastUpdate)})
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
      {#if prevPost}
        <PaginationCard
          type="prev"
          label={prevPost.title}
          href={prevPost.slug}
        />
      {/if}
    </div>
    <div class="w-full sm:pl-2 sm:w-1/2">
      {#if nextPost}
        <PaginationCard
          type="next"
          label={nextPost.title}
          href={nextPost.slug}
        />
      {/if}
    </div>
  </div>
</div>
