<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
    const res = await fetch('/blog.json')

    if (res.ok) {
      return {
        props: await res.json()
      }
    }
  }
</script>

<script>
  import { formatDate } from '$lib/utils'

  /** @type {import("./index.json").MainPost[]} */
  export let allPosts
</script>

<div class="container">
  <h1 class="text-center m-0 mb-6">Blog Posts</h1>
  <section class="space-y-5 sm:-mx-4">
    {#each allPosts as post (post.slug)}
      <a class="card block" href={post.slug}>
        <div class="text-xl font-semibold">
          {post.title}
        </div>
        <div class="mb-3 opacity-80">{post.excerpt}</div>
        <div class="text-sm opacity-50">
          {formatDate(new Date(post.date))} - {post.readingTime}
        </div>
      </a>
    {/each}
  </section>
</div>
