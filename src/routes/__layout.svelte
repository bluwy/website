<script>
  import { page } from '$app/stores'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import 'virtual:windi.css'
  import '$lib/global.pcss'

  $: isHero = $page.path === '/'
</script>

<Nav />
<main class:pt-24={!isHero}>
  <slot />
</main>
<Footer />
