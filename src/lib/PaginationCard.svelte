<script>
  /** @type {'prev' | 'next'} */
  export let type
  /** @type {string} */
  export let label
  /** @type {string} */
  export let href

  $: isPrev = type === 'prev'
</script>

<a class="group block card h-full {isPrev ? 'text-left' : 'text-right'}" {href}>
  <div class="font-semibold text-sm mb-1 opacity-70 group-hover:opacity-90">
    {#if isPrev}
      <span class="mr-2 arrow arrow-left" />
      <span>PREVIOUS</span>
    {:else}
      <span>NEXT</span>
      <span class="ml-2 arrow arrow-right" />
    {/if}
  </div>
  <div class="font-bold text-lg text-gray-800 @dark:text-gray-100">
    {label}
  </div>
</a>

<style>
  .arrow {
    display: inline-block;
    position: relative;
    width: 10px;
    height: 10px;
  }

  .arrow::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 50%;
    width: 2px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    height: 100%;
    transform: translateX(-50%);
    background-color: currentColor;
  }

  .arrow::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 80%;
    height: 80%;
    border-top: 2px solid currentColor;
    border-left: 2px solid currentColor;
    transform: translateX(-50%) rotate(45deg);
  }

  .arrow-left {
    transform: rotate(-90deg);
  }

  .arrow-right {
    transform: rotate(90deg);
  }
</style>
