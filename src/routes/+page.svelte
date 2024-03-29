<script>
  import Hero from '$lib/Hero.svelte'
  import { formatDate } from '$lib/utils'
  import Head from '$lib/Head.svelte'
  import svelteLogo from '$assets/images/oss-icons/svelte.svg'
  import viteLogo from '$assets/images/oss-icons/vite.svg'
  import astroLogo from '$assets/images/oss-icons/astro.svg'

  /** @type {import('./$types').PageData} */
  export let data
</script>

<Head />

<article>
  <Hero />
  <section class="container mt-20 mb-10 markdown">
    <p>
      Hi, I'm Bjorn. I work in open source for the web! I'm an
      <a href="https://astro.build">Astro</a>
      core resident, <a href="https://svelte.dev">Svelte</a> and
      <a href="https://vitejs.dev">Vite</a> core team member. Currently
      maintaining
      <a href="https://github.com/sveltejs/vite-plugin-svelte">
        vite-plugin-svelte
      </a>,
      <a href="https://vitejs.dev">Vite</a>,
      <a href="https://astro.build">Astro</a> and sometimes
      <a href="https://kit.svelte.dev">SvelteKit</a>.
    </p>
  </section>

  <section class="container my-10 flex justify-center items-center gap-12">
    <a href="https://svelte.dev">
      <img src={svelteLogo} alt="svelte" class="w-12" />
    </a>
    <a href="https://vitejs.dev">
      <img src={viteLogo} alt="vite" class="w-13" />
    </a>
    <a href="https://astro.build">
      <img src={astroLogo} alt="astro" class="w-10 astro-logo" />
    </a>
  </section>

  <section class="container mt-20">
    <div class="flex flex-row mb-3 justify-between items-center">
      <div>
        <h2 class="m-0">Showcase</h2>
      </div>
      <div>
        <a class="text-sm btn" href="/projects">View all</a>
      </div>
    </div>
    <p class="text-sm opacity-70 markdown">
      I'm interested in developer experience and build tools. My projects are
      often experimental npm packages.
    </p>
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each data.featuredProjects as project (project.title)}
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
      I write about technical notes, guides, and personal experience.
    </p>
    <div class="flex flex-col flex-wrap -mx-2 sm:flex-row">
      {#each data.recentPosts as post (post.title)}
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
  <section class="container mt-8 -mb-6">
    <h2 class="m-0 mb-1">Sponsors</h2>
    <p class="text-sm opacity-70 markdown">
      My open source adventure is sponsored by these fine folks. You can also
      support me on
      <a href="https://github.com/sponsors/bluwy">GitHub Sponsors</a>!
    </p>
    <object
      class="w-full max-w-xl mx-auto"
      data="/sponsors.svg"
      type="image/svg+xml"
      title="Sponsors"
      style="color-scheme: normal"
    />
  </section>
</article>

<style>
  @media (prefers-color-scheme: light) {
    .astro-logo {
      /* transform to #17191E */
      filter: brightness(0) invert(9%) sepia(10%) saturate(832%)
        hue-rotate(185deg) brightness(93%) contrast(97%);
    }
  }
</style>
