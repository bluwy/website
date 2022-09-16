<script>
  import Head from '$lib/Head.svelte'
  import { formatDate } from '$lib/utils'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Head title="Blog" />

<div class="container">
  <h1 class="m-0 text-center mb-6">Blog Posts</h1>
  <section class="space-y-5 sm:-mx-4">
    {#each data.allPosts as post (post.slug)}
      <a class="card block" href={post.slug}>
        <h2 class="m-0 text-xl">
          {post.title}
        </h2>
        <p class="text-base mb-3 opacity-80">{post.excerpt}</p>
        <p class="m-0 text-sm opacity-60">
          {formatDate(new Date(post.date))} - {post.readingTime}
        </p>
      </a>
    {/each}
  </section>
</div>
