<script context="module">
  export const prerender = true

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch }) {
    const res = await fetch('/index.json')

    if (res.ok) {
      return {
        props: await res.json()
      }
    }
  }
</script>

<script>
  import Hero from '$lib/Hero.svelte'
  import { formatDate } from '$lib/utils'
  import Head from '$lib/Head.svelte'

  /** @type {import('./index.json').IndexProject[]} */
  export let featuredProjects
  /** @type {import('./index.json').IndexPost[]} */
  export let recentPosts
</script>

<Head />

<article>
  <Hero />
  <section class="container my-20 markdown">
    <p>
      Hi, I'm Bjorn, a frontend web developer and open-source enthusiast. I'm
      also a <a href="https://svelte.dev">Svelte</a> core maintainer,
      contributing to projects like
      <a href="https://github.com/sveltejs/vite-plugin-svelte">
        vite-plugin-svelte
      </a>,
      <a href="https://vitejs.dev">Vite</a>, and
      <a href="https://kit.svelte.dev">SvelteKit</a>.
    </p>
    <p>
      I have my way around many other technologies too, including React, Vue,
      GraphQL, and PostgreSQL. I can quickly pick up new stacks when needed.
    </p>
    <p>
      Sometimes, I write <a href="/blog">blog posts</a> and jot down
      <a href="/notes">interesting stuff</a>. I also have a
      <a href="/todo" rel="external">todo list</a> to keep track of my public work.
    </p>
  </section>
  <section class="container mt-8" />

  <section class="container mt-8">
    <div class="flex flex-row mb-3 justify-between items-center">
      <div>
        <h2 class="m-0">Showcase</h2>
      </div>
      <div>
        <a class="text-sm btn" href="/projects">View all</a>
      </div>
    </div>
    <p class="text-sm opacity-70 markdown">
      I'm interested in developer experience and build tooling. Hence, my
      projects are often <a href="https://www.npmjs.com">npm</a> packages and wacky
      experiments.
    </p>
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each featuredProjects as project (project.title)}
        <div class="w-full p-2 sm:w-1/2">
          <a class="flex card" href={project.slug}>
            <div class="flex-shrink-0">
              {#if project.icon}
                <img
                  class="rounded-lg bg-gray-200 h-12 mr-3 overflow-hidden @dark:bg-gray-800"
                  src={project.icon}
                  alt="{project.title} icon"
                />
              {:else}
                <div
                  class="rounded-lg bg-gray-200 h-12 mr-3 w-12 @dark:bg-gray-800"
                />
              {/if}
            </div>
            <div>
              <h3 class="font-semibold m-0 text-base">
                {project.title}
              </h3>
              <p class="m-0 text-sm opacity-80">
                {project.desc}
              </p>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </section>
  <section class="container mt-8">
    <div class="flex flex-row mb-1 justify-between items-center">
      <div>
        <h2 class="m-0">Recent Posts</h2>
      </div>
      <div>
        <a class="text-sm btn" href="/blog">View all</a>
      </div>
    </div>
    <p class="text-sm opacity-70 markdown">
      Sometimes I write about development and personal experience.
    </p>
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each recentPosts as post (post.title)}
        <div class="w-full p-2 sm:w-1/2">
          <a class="flex card" href={post.slug}>
            <div>
              <h2 class="font-semibold m-0 text-base">
                {post.title}
              </h2>
              <p class="m-0 text-sm opacity-80">
                {formatDate(new Date(post.date))} - {post.readingTime}
              </p>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </section>
</article>
