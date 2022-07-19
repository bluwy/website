<script>
  export let description = ''
  export let title = ''

  const siteAuthor = 'Bjorn Lu'
  const siteDescription =
    'Bjorn Lu is a frontend web developer and open-source enthusiast'

  $: finalTitle = title ? `${title} - ${siteAuthor}` : siteAuthor
  $: finalDescription = description || siteDescription
</script>

<svelte:head>
  <meta name="description" content={finalDescription} />
  <meta name="author" content={siteAuthor} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={finalDescription} />
  <meta property="og:type" content="website" />
  <title>{finalTitle}</title>
</svelte:head>
