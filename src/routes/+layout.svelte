<script>
  import { navigating, page } from '$app/stores'
  import Icons from '$lib/Icons.svelte'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import LoadingBar from '$lib/LoadingBar.svelte'
  import '@unocss/reset/tailwind.css'
  import 'virtual:uno.css'
  import '$lib/global.pcss'
  import '$data/assets'
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props()

  let isHero = $derived($page.url.pathname === '/')
</script>

<Icons />
<Nav />
<main class:pt-24={!isHero}>
  {@render children?.()}
</main>
<Footer />
{#if $navigating}
  <LoadingBar />
{/if}
