<script>
  import Head from '$lib/Head.svelte'

  const sentences = [
    `There's nothing here. I promise.`,
    `There's really nothing here.`,
    `Nothing to see but an empty void.`,
    `Please go home.`,
    `Why don't you believe me?`,
    `Guess you're very curious, huh?`,
    `You're wasting time.`,
    `What more do you seek?`,
    `The truth? The meaning of life?`,
    `Well, if you insist...`,
    `end`
  ]

  let sentenceIndex = $state(0)
  let clickBuffer = 8

  let currentSentence = $derived(sentences[sentenceIndex])
  let noMoreSentence = $derived(sentenceIndex >= sentences.length - 1)

  function clickNextSentence() {
    if (clickBuffer > 0) {
      clickBuffer--
    } else if (!noMoreSentence) {
      sentenceIndex++
    }
  }
</script>

<Head title={noMoreSentence ? '【=◈︿◈=】' : '404'} />

<div class="container text-center">
  {#if noMoreSentence}
    <h1 class="mt-20 mb-6 text-5xl lg:mb-8 lg:text-6xl">【=◈︿◈=】</h1>
    <p>Is anyone there?</p>
    <p>Play.</p>
  {:else}
    <h1 class="text-7xl">404</h1>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <p type="button" onclick={clickNextSentence}>{currentSentence}</p>
    <p class="markdown">
      Take me <a href="/">home</a>.
    </p>
  {/if}
</div>
