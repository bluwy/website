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

  $: isHero = $page.url.pathname === '/'
</script>

<Icons />
<Nav />
<main class:pt-24={!isHero}>
  <slot />
</main>
<Footer />
{#if $navigating}
  <LoadingBar />
{/if}
