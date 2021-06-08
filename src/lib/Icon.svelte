<script>
  /** @type {string} */
  export let svg
</script>

<i class="inline-block overflow-visible h-[1em] align-[-0.125em]">
  {@html svg}
</i>

<style lang="postcss">
  i > :global(svg) {
    @apply block fill-current h-full overflow-visible;
  }
</style>
