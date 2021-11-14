<script>
  import { page } from '$app/stores'
  import logo from '$assets/images/logo.svg'
  import { links } from '$data/nav'

  let scrollY = 0

  $: shrink = scrollY > 0
  $: isHero = $page.path === '/'
</script>

<svelte:window bind:scrollY />

<nav
  class="w-full h-24 transition-all ease-out text-7xl z-30 duration-300 fixed @dark:bg-gray-900"
  class:hero={isHero}
  class:shrink
>
  <div class="container h-full">
    <div class="flex flex-row flex-no-wrap h-full justify-between items-center">
      <a class="flex flex-row flex-no-wrap items-center" href="/">
        <img class="mr-3 h-[24px]" src={logo} alt="Bjorn Lu logo" />
        <span class="font-semibold text-lg hidden sm:block">Bjorn Lu</span>
      </a>
      <ul class="flex whitespace-no-wrap">
        {#each links as link (link.title)}
          <li class="my-2 mx-3 text-lg inline-block sm:mx-4">
            <a
              class:font-semibold={$page.path.startsWith(link.to)}
              href={link.to}
              rel={link.external ? 'external' : undefined}
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>

<style>
  .hero {
    @apply bg-transparent text-gray-100 @dark:bg-transparent;
  }

  .shrink {
    @apply shadow h-14 bg-gray-100 text-gray-900 h-[56px] @dark:shadow-none @dark:bg-gray-800 @dark:text-gray-100;
  }
</style>
