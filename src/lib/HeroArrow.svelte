<script>
  /**
   * @typedef {Object} Props
   * @property {'pink' | 'blue'} glowColor
   */

  /** @type {Props} */
  let { glowColor } = $props()
</script>

<svg
  class:pink={glowColor === 'pink'}
  class:blue={glowColor === 'blue'}
  width="70"
  height="120"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M50 20 L20 60 L50 100"
    stroke-width="15"
    fill="transparent"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style>
  .pink {
    stroke: #ffc4f3;
    mix-blend-mode: screen;
    filter: drop-shadow(0 0 2px #fe13cd) drop-shadow(0 0 10px #fe13cd)
      drop-shadow(0 0 24px #fe13cd);
  }

  .blue {
    margin-left: -1rem;
    stroke: #cbfdff;
    mix-blend-mode: screen;
    filter: drop-shadow(0 0 2px #2df5ff) drop-shadow(0 0 10px #2df5ff)
      drop-shadow(0 0 24px #2df5ff);
  }
</style>
