<script>
  import ToggleTag from './ToggleTag.svelte'

  /**
   * @typedef {Object} Props
   * @property {string[]} [tags]
   * @property {string[]} [selected]
   */

  /** @type {Props} */
  let { tags = [], selected = $bindable([]) } = $props()

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
        onchange={handleTagChange}
      >
        {tag}
      </ToggleTag>
    </div>
  {/each}
</div>
