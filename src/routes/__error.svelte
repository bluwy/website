<script>
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

  let sentenceIndex = 0
  let clickBuffer = 8

  $: currentSentence = sentences[sentenceIndex]
  $: noMoreSentence = sentenceIndex >= sentences.length - 1

  function clickNextSentence() {
    if (clickBuffer > 0) {
      clickBuffer--
    } else if (!noMoreSentence) {
      sentenceIndex++
    }
  }
</script>

<div class="container text-center">
  {#if noMoreSentence}
    <h1 class="mt-20 mb-6 text-5xl lg:mb-8 lg:text-6xl">【=◈︿◈=】</h1>
    <p>Is anyone there?</p>
    <p>Play.</p>
  {:else}
    <h1 class="text-7xl">404</h1>
    <p type="button" on:click={clickNextSentence}>{currentSentence}</p>
    <p class="markdown">
      Take me <a href="/">home</a>.
    </p>
  {/if}
</div>
