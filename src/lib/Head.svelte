<script>
  /**
   * @typedef {Object} Props
   * @property {string} [description]
   * @property {string} [title]
   */

  /** @type {Props} */
  let { description = '', title = '' } = $props()

  const siteAuthor = 'Bjorn Lu'
  const siteDescription =
    'Bjorn Lu is a frontend web developer and open-source enthusiast'

  let finalTitle = $derived(title ? `${title} - ${siteAuthor}` : siteAuthor)
  let finalDescription = $derived(description || siteDescription)
</script>

<svelte:head>
  <meta name="description" content={finalDescription} />
  <meta name="author" content={siteAuthor} />
  <meta property="og:title" content={finalTitle} />
  <meta property="og:description" content={finalDescription} />
  <meta property="og:type" content="website" />
  <title>{finalTitle}</title>
</svelte:head>
