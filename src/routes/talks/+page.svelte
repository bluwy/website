<script>
  import { talks } from '$data/talks'
  import Head from '$lib/Head.svelte'

  /**
   * @param {string} url
   */
  function inferUrlTtitle(url) {
    if (url.includes('youtube.com')) {
      return 'YouTube'
    } else if (url.includes('podrocket.logrocket.com')) {
      return 'PodRocket'
    } else {
      throw new Error('Unknown URL')
    }
  }
</script>

<Head title="Talks" />

<div class="container">
  <h1 class="m-0 text-center">Talks</h1>
  <section>
    <div class="markdown">
      <h2>Giving talks</h2>
      <p>
        Hi, I'm Bjorn Lu. I like to present topics that are unique and
        resourceful, especially around things you can't find on the web. Feel
        free to reach out to me on
        <a href="https://twitter.com/bluwyoo">Twitter</a> or
        <a href="https://m.webtoo.ls/@bluwy">Mastodon</a> if you'd like me to give
        a talk!
      </p>
      <p>About me:</p>
    </div>
    <table class="info-table">
      <tr>
        <td>Name</td>
        <td>Bjorn Lu</td>
      </tr>
      <tr>
        <td>Legal name</td>
        <td>Bjorn Lu We-Yon</td>
      </tr>
      <tr>
        <td>Chinese name</td>
        <td>卢威荣</td>
      </tr>
      <tr>
        <td>Avatar 1</td>
        <td>
          <img
            class="rounded inline mr-2"
            src="/avatar-1.jpg"
            alt="avatar 1"
            width="40"
          />
          <a class="whitespace-nowrap" href="/avatar-1.jpg">
            https://bjornlu.com/avatar-1.jpg
          </a>
        </td>
      </tr>
      <tr>
        <td>Avatar 2</td>
        <td>
          <img
            class="rounded inline mr-2"
            src="/avatar-2.jpg"
            alt="avatar 2"
            width="40"
          />
          <a class="whitespace-nowrap" href="/avatar-2.jpg">
            https://bjornlu.com/avatar-2.jpg
          </a>
        </td>
      </tr>
      <tr>
        <td>Bio</td>
        <td class="max-w-100">
          I work in open source for the web! I'm an Astro core resident, Svelte
          and Vite core team member.
        </td>
      </tr>
      <tr>
        <td>Company</td>
        <td>N/A</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>Kuching, Sarawak, Malaysia</td>
      </tr>
    </table>
    <div class="markdown">
      <blockquote>
        NOTE: I usually use "Avatar 1" everywhere online, but if a head shot is
        preferred, "Avatar 2" can be used instead.
      </blockquote>
    </div>
  </section>
  <section>
    <h2>Past talks and events</h2>
    <div class="space-y-5 sm:-mx-4">
      {#each talks as talk}
        <a class="block card" href={talk.url} target="_blank">
          <span class="flex justify-between">
            <span>{talk.title}</span>
            <span class="text-sm flex opacity-50">
              {inferUrlTtitle(talk.url)}
              <!-- prettier-ignore -->
              <svg class="ml-0.5" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4L6.4 18Z"/></svg>
            </span>
          </span>
          <span class="opacity-60 flex items-center">
            {talk.venue}
            {#each talk.type as type}
              <div
                class="border rounded-md text-xs transition-colors duration-200 inline-block px-1 ml-2"
              >
                {type}
              </div>
            {/each}
          </span>
        </a>
      {/each}
    </div>
  </section>
</div>

<style>
  .info-table td {
    vertical-align: top;
    padding-bottom: 0.8rem;
  }

  .info-table td:first-child {
    opacity: 0.6;
    white-space: nowrap;
    padding-right: 2rem;
  }
</style>
