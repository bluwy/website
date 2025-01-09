<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let show = $state(false)
  let p = $state(0)
  let t

  onMount(() => {
    function next() {
      show = true
      p += 0.1
      const remaining = 1 - p
      if (remaining > 0.1) t = setTimeout(next, 100 / remaining)
    }
    t = setTimeout(next, 500)
    return () => clearTimeout(t)
  })

  function handleOutroStart() {
    clearTimeout(t)
    p = 1
  }
</script>

{#if show}
  <div
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200, delay: 150 }}
    onoutrostart={handleOutroStart}
    class="h-1 w-full z-50 top-0 left-0 fixed bg-primary-600 @dark:bg-primary-400 origin-top-left transition-transform ease-linear"
    style:transform="scaleX({p})"
    style:transition-duration="{p >= 1 ? 200 : 500}ms"
  ></div>
{/if}
