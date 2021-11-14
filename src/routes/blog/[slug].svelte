<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, page }) {
    const res = await fetch(`/blog/${page.params.slug}.json`)

    if (res.ok) {
      return {
        props: await res.json()
      }
    }
  }
</script>

<script>
  import Head from '$lib/Head.svelte'
  import PaginationCard from '$lib/PaginationCard.svelte'
  import { formatDate } from '$lib/utils'

  /** @type {import("./[slug].json").SlugThisPost} */
  export let thisPost
  /** @type {import("./[slug].json").SlugPagePost | null} */
  export let prevPost
  /** @type {import("./[slug].json").SlugPagePost | null} */
  export let nextPost

  $: rawHtml = thisPost.markdownHtml.replace('<!-- toc -->', thisPost.tocHtml)
</script>

<Head title={thisPost.title} description={thisPost.excerpt} />

<article class="container">
  <header class="mb-6">
    <h1 class="m-0">{thisPost.title}</h1>
    <div>{formatDate(new Date(thisPost.date))}</div>
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
