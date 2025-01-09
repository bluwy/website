<script>
  /**
   * @typedef {Object} Props
   * @property {string} svg
   */

  /** @type {Props} */
  let { svg } = $props()
</script>

<i class="h-[1em] inline-block overflow-visible align-[-0.125em]">
  {@html svg}
</i>

<style lang="postcss">
  i > :global(svg) {
    @apply h-full fill-current block overflow-visible;
  }
</style>
