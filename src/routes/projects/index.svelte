<script context="module">
  export const prerender = true
</script>

<script>
  import Head from '$lib/Head.svelte'
  import ToggleTag from '$lib/ToggleTag.svelte'
  import ToggleTagSelect from '$lib/ToggleTagSelect.svelte'

  /** @type {import("./index.json").MainProject[]} */
  export let allProjects

  /** @type {string} */
  let search = ''
  /** @type {string[]} */
  let filterTags = []

  $: allProjectTags = [...new Set(allProjects.flatMap((v) => v.tags))].sort()

  $: filteredProjects = allProjects.filter((project) => {
    const titleMatch = project.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const tagsMatch = filterTags.every((tag) => {
      return project.tags.includes(tag)
    })

    return titleMatch && tagsMatch
  })
</script>

<Head title="Projects" />

<div class="container">
  <h1 class="m-0 text-center">Projects</h1>
  <section class="my-6">
    <input
      class="mb-4 w-full sm:max-w-sm"
      type="text"
      bind:value={search}
      placeholder="Filter projects..."
    />
    <ToggleTagSelect tags={allProjectTags} bind:selected={filterTags} />
  </section>
  <section class="space-y-5 sm:-mx-4">
    {#each filteredProjects as project (project.slug)}
      <a class="flex flex-col card sm:flex-row" href={project.slug}>
        <div class="flex-shrink-0 hidden sm:block">
          {#if project.icon}
            <img
              class="rounded-lg bg-gray-200 mr-4 overflow-hidden @dark:bg-gray-800"
              src={project.icon}
              alt="{project.title} icon"
              width="128"
              height="128"
            />
          {:else}
            <div
              class="rounded-lg bg-gray-200 h-32 mr-4 w-32 @dark:bg-gray-800"
            />
          {/if}
        </div>
        <div class="flex flex-col justify-between">
          <div>
            <h2 class="m-0 text-xl">
              {project.title}
            </h2>
            <p class="text-base mb-3 opacity-70">{project.excerpt}</p>
          </div>
          <div class="space-x-2 opacity-80">
            {#each project.tags as tag}
              <ToggleTag value={tag} readonly>
                {tag}
              </ToggleTag>
            {/each}
          </div>
        </div>
      </a>
    {/each}
  </section>
</div>
