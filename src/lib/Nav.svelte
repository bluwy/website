<script>
  import { page } from '$app/stores'
  import logo from '$assets/images/logo.svg'
  import navLinks from '$data/navLinks'

  let scrollY = 0

  $: shrink = scrollY > 0
  $: isHero = $page.path === '/'
</script>

<svelte:window bind:scrollY />

<nav
  class="
    w-full transition-all ease-out text-7xl z-30 duration-300 fixed dark:bg-gray-900
    {shrink
    ? 'h-14 bg-gray-100 shadow dark:bg-gray-800 dark:shadow-none'
    : 'h-24 bg-gray-100'}
    {isHero && !shrink ? '!bg-transparent !text-gray-100' : ''}
  "
>
  <div class="container h-full">
    <div class="flex flex-row flex-no-wrap h-full justify-between items-center">
      <a class="flex flex-row flex-no-wrap items-center" href="/">
        <img class="mr-3 h-[24px]" src={logo} alt="Bjorn Lu logo" />
        <span class="font-semibold text-lg hidden sm:block"> Bjorn Lu </span>
      </a>
      <ul class="whitespace-no-wrap">
        {#each navLinks as link}
          <li class="my-2 mx-3 text-lg inline-block sm:mx-4" key={link.title}>
            <a
              class:font-semibold={$page.path.startsWith(link.to)}
              href={link.to}
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
