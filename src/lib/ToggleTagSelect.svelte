<script>
  import ToggleTag from './ToggleTag.svelte'

  /** @type {string[]} */
  export let tags = []
  /** @type {string[]} */
  export let selected = []

  function handleTagChange(e) {
    const tag = e.target.value
    if (e.target.checked) {
      selected.push(tag)
      selected = selected
    } else {
      selected = selected.filter((t) => t !== tag)
    }
  }
</script>

<div>
  {#each tags as tag (tag)}
    <div class="mr-2 mb-2 inline-block">
      <ToggleTag
        value={tag}
        checked={selected.includes(tag)}
        on:change={handleTagChange}
      >
        {tag}
      </ToggleTag>
    </div>
  {/each}
</div>
