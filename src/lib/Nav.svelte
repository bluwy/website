<script>
  import { page } from '$app/stores'
  import logo from '$assets/images/logo.svg'
  import { links } from '$data/nav'

  let scrollY = 0

  $: shrink = scrollY > 0
  $: isHero = $page.url.pathname === '/'
</script>

<svelte:window bind:scrollY />

<nav
  class="h-24 w-full text-7xl z-30 fixed @dark:bg-gray-900"
  class:hero={isHero}
  class:shrink
>
  <div class="container h-full">
    <div class="flex flex-row flex-no-wrap h-full justify-between items-center">
      <a class="flex flex-row flex-no-wrap items-center" href="/">
        <img class="h-[24px] w-[24px] mr-3" src={logo} alt="Bjorn Lu logo" />
        <span class="font-semibold text-lg hidden sm:block">Bjorn Lu</span>
      </a>
      <ul class="flex whitespace-no-wrap">
        {#each links as link (link.title)}
          <li class="my-2 mx-3 text-lg inline-block sm:mx-4">
            <a
              class:font-semibold={$page.url.pathname.startsWith(link.to)}
              href={link.to}
              rel={link.external ? 'external' : undefined}
              data-sveltekit-preload-code="tap"
              data-sveltekit-preload-data="tap"
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style lang="postcss">
  nav {
    transition: height 200ms 150ms ease-out, background-color 150ms ease-out;
  }
  .hero {
    @apply bg-transparent text-gray-100 @dark:bg-transparent;
  }

  .shrink {
    @apply bg-gray-100 h-14 h-[56px] shadow text-gray-900 @dark:bg-gray-800 @dark:shadow-none @dark:text-gray-100;
    transition: height 200ms ease-out, background-color 150ms 200ms ease-out;
  }
</style>
