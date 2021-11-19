<script>
  import { page } from '$app/stores'
  import Icons from '$lib/Icons.svelte'
  import Nav from '$lib/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import 'virtual:windi.css'
  import '$lib/global.pcss'
  import '$data/assets'

  $: isHero = $page.path === '/'
</script>

<Icons />
<Nav />
<main class:pt-24={!isHero}>
  <slot />
</main>
<Footer />
