<script>
  import { socials } from '$data/socials'
  import Icon from './Icon.svelte'
</script>

<footer class="mt-12">
  <div class="container">
    <hr class="border-t-2 border-primary-700 opacity-50" />
    <div
      class="flex flex-col text-center py-8 justify-between sm:flex-row-reverse sm:text-left sm:items-center"
    >
      <div class="flex-shrink space-x-4 mb-3 text-2xl sm:mb-0">
        {#each socials as social (social.title)}
          <a
            class="opacity-80 transition-colors duration-200 hover:opacity-100 hover:text-primary-800 focus:opacity-100 focus:text-primary-800 @dark:hover:text-primary-300 @dark:focus:text-primary-300"
            href={social.link}
            title="My {social.title} profile"
          >
            <Icon svg={social.svg} />
          </a>
        {/each}
      </div>
      <div class="flex-shrink">&copy; Bjorn Lu 2022</div>
    </div>
  </div>
</footer>
