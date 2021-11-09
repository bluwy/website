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

  /** @type {import('./index.json').IndexProject[]} */
  export let projects
</script>

<article>
  <Hero />
  <section class="container mt-8">
    <h2 class="mt-0">Check Me Out</h2>
    <p class="mb-6">
      I've picked up many skills in various area of development throughout the
      years. Here's what I know so far!
    </p>
    <table class="w-full mb-8">
      <tbody>
        {#each skills as skill (skill.title)}
          <tr>
            <th
              class="table-row sm:table-cell font-semibold text-left align-top pr-3"
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
    <div class="flex flex-row justify-between items-center mb-1">
      <div>
        <h2 class="m-0">Featured Projects</h2>
      </div>
      <div>
        <a class="btn text-sm" href="/projects">View all</a>
      </div>
    </div>
    <div class="flex flex-col flex-wrap sm:flex-row -mx-2">
      {#each projects as project (project.title)}
        <div class="w-full sm:w-1/2 p-2">
          <a class="card flex" href={project.slug}>
            <div class="flex-shrink-0">
              <img
                class="rounded-lg h-12 overflow-hidden mr-3"
                src={project.icon}
                alt="{project.title} icon"
              />
            </div>
            <div>
              <div class="text-md font-semibold">
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
  <!-- 
  <section class="container mt-8">
    <div class="flex flex-row justify-between items-center mb-1">
      <div>
        <h2 class="m-0">Recent Posts</h2>
      </div>
      <div>
        <a class="btn text-sm" href="/blog"> View all </a>
      </div>
    </div>
    <div class="flex flex-col flex-wrap sm:flex-row -mx-2">
      {#each posts as post (post.frontmatter.title)}
        <div class="w-full sm:w-1/2 p-2">
          <a class="card flex" href={post.fields.slug}>
            <div>
              <div class="text-md font-semibold">
                {post.frontmatter.title}
              </div>
              <div class="text-sm opacity-80">
                {post.frontmatter.date} - {post.timeToRead} min read
              </div>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </section> -->
</article>
