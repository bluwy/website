<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, page }) {
    const res = await fetch(`/projects/${page.params.slug}.json`)

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

  /** @type {import("./[slug].json").SlugThisProject} */
  export let thisProject
  /** @type {import("./[slug].json").SlugPageProject | null} */
  export let prevProject
  /** @type {import("./[slug].json").SlugPageProject | null} */
  export let nextProject

  $: rawHtml = thisProject.markdownHtml.replace(
    '<!-- toc -->',
    thisProject.tocHtml
  )
</script>

<Head title={thisProject.title} description={thisProject.excerpt} />

<article class="container">
  <h1 class="m-0 text-center mb-2">{thisProject.title}</h1>
  <div class="space-x-3 text-center mb-6">
    {#each thisProject.links as link (link.label)}
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
      {#if prevProject}
        <PaginationCard
          type="prev"
          label={prevProject.title}
          href={prevProject.slug}
        />
      {/if}
    </div>
    <div class="w-full sm:pl-2 sm:w-1/2">
      {#if nextProject}
        <PaginationCard
          type="next"
          label={nextProject.title}
          href={nextProject.slug}
        />
      {/if}
    </div>
  </div>
</div>
