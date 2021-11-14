<script>
  import { socials } from '$data/socials'
  import Icon from './Icon.svelte'
</script>

<footer class="mt-12">
  <div class="container">
    <hr class="border-t-2 border-primary-700 opacity-50" />
    <div
      class="flex flex-col sm:flex-row-reverse justify-between py-8 text-center sm:text-left sm:items-center"
    >
      <div class="flex-shrink space-x-4 text-2xl mb-3 sm:mb-0">
        {#each socials as social (social.title)}
          <a
            class="opacity-80 transition-colors duration-200 hover:text-primary-800 focus:text-primary-800 hover:opacity-100 focus:opacity-100 @dark:hover:text-primary-300 @dark:focus:text-primary-300"
            href={social.link}
            title="My {social.title} profile"
          >
            <Icon svg={social.svg} />
          </a>
        {/each}
      </div>
      <div class="flex-shrink">
        &copy; Bjorn Lu {new Date().getFullYear()}
      </div>
    </div>
  </div>
</footer>
