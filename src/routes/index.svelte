<script context="module">
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
  import { skills } from '$data/skills'
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
  <section class="container mt-8">
    <h2 class="mt-0">Check Me Out</h2>
    <p class="mb-6 markdown">
      I'm currently working on build tools around
      <a href="https://vitejs.dev">Vite</a> and
      <a href="https://svelte.dev">Svelte</a>. Primarily maintaining
      <a href="https://github.com/sveltejs/vite-plugin-svelte">
        vite-plugin-svelte
      </a>, and also helping out on
      <a href="https://github.com/vitejs/vite">Vite</a>
      and
      <a href="https://github.com/sveltejs/kit">SvelteKit</a>. Project
      development-wise, I'm fairly proficient with these tools:
    </p>
    <table class="mb-8 w-full">
      <tbody>
        {#each skills as skill (skill.title)}
          <tr>
            <th
              class="font-semibold text-left pr-3 table-row align-top sm:table-cell"
            >
              {skill.title}
            </th>
            <td class="table-row sm:table-cell">
              {skill.topics.join(', ')}
              <br />
              <br />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="flex flex-row mb-1 justify-between items-center">
      <div>
        <h2 class="m-0">Featured Projects</h2>
      </div>
      <div>
        <a class="text-sm btn" href="/projects">View all</a>
      </div>
    </div>
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each featuredProjects as project (project.title)}
        <div class="w-full p-2 sm:w-1/2">
          <a class="flex card" href={project.slug}>
            <div class="flex-shrink-0">
              <img
                class="rounded-lg h-12 mr-3 overflow-hidden"
                src={project.icon}
                alt="{project.title} icon"
              />
            </div>
            <div>
              <div class="font-semibold text-md">
                {project.title}
              </div>
              <div class="text-sm opacity-80">
                {project.desc}
              </div>
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
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each recentPosts as post (post.title)}
        <div class="w-full p-2 sm:w-1/2">
          <a class="flex card" href={post.slug}>
            <div>
              <div class="font-semibold text-md">
                {post.title}
              </div>
              <div class="text-sm opacity-80">
                {formatDate(new Date(post.date))} - {post.readingTime}
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </section>
</article>
