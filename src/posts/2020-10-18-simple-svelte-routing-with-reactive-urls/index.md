---
title: Simple Svelte Routing with Reactive URLs
updated: '2022-02-13'
---

Svelte doesn't have an official router yet. If all you need is to conditionally render a few components based on the URL, there's no reason to use one of the [10+ Svelte routers](https://svelte-community.netlify.app/code/?tag=routers) out there that do more than you asked for. We should be able to use native web APIs to do just that!

<!-- endexcerpt -->

Here's a sneak-peak of what we'll acheive:

```svelte
{#if $url.pathname === '/'}
  <h1>Home Sweet Home</h1>
{:else if $url.pathname === '/about'}
  <h1>About What?</h1>
{:else}
  <h1>404</h1>
{/if}
```

Or get your hands dirty at:

- REPL: https://svelte.dev/repl/5abaac000b164aa1aacc6051d5c4f584?version=3
- Repo: https://github.com/bluwy/svelte-url

## Table of Contents

<!-- toc -->

## The Problem

One of the main issue with the native web API is that there's no nice way of detecting URL changes, especially when working with the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API). At least for hash, there's the [`hashchange`](https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event) event.

When dealing with the History API, there's only the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event) event, which is usually triggered when navigating using the browser's forward and backward buttons. However, it will not be triggered when calling [`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) or [`history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)!

This leaves us no choice but to monkey-patch them. More info is discussed in this [StackOverflow answer](https://stackoverflow.com/a/52809105/13265944).

## The Magic

Svelte has an awesome [store](https://svelte.dev/docs#svelte_store) feature, which allows us to easily create reactive variables by subscribing to changes. Combined with the [auto-subscription syntax](https://svelte.dev/tutorial/auto-subscriptions), it's ever easier to retrieve the URL and keeping it in sync with the browser.

Now we can create readable stores for hash and History API routing:

```js:title=hash.js
import { readable } from "svelte/store"

export default readable(window.location.hash, set => {
  const update = () => set(window.location.hash)
  window.addEventListener("hashchange", update)
  return () => window.removeEventListener("hashchange", update)
})
```

```js:title=history.js
import { readable } from "svelte/store"

export default readable(new URL(window.location.href), set => {
  const update = () => set(new URL(window.location.href))

  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  history.pushState = function() {
    originalPushState.apply(this, arguments)
    update()
  }

  history.replaceState = function() {
    originalReplaceState.apply(this, arguments)
    update()
  }

  window.addEventListener("popstate", update)

  return () => {
    // Reverting the monkey-patches this way may be unsafe if there's external
    // code patching it too. The next section discusses more about this.
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
    window.removeEventListener("popstate", update)
  }
})
```

## Touching Up

Two code examples above should provide a nice starting point for your custom routing. But looking at `history.js`, it returns a reactive URL object, which also contains the URL hash. What if we can combine `hash.js` with it too?

```js:title=url.js
import { derived, writable } from "svelte/store"

const href = writable(window.location.href)

const originalPushState = history.pushState
const originalReplaceState = history.replaceState

const updateHref = () => href.set(window.location.href)

history.pushState = function() {
  originalPushState.apply(this, arguments)
  updateHref()
}

history.replaceState = function() {
  originalReplaceState.apply(this, arguments)
  updateHref()
}

window.addEventListener("popstate", updateHref)
window.addEventListener("hashchange", updateHref)

export default derived(href, $href => new URL($href))
```

A few things have changed here, notably there's no `readable` store now. This is mainly because that there's no safe way to revert the monkey-patches as mentioned earlier. And since the URL store is likely to be used throughout the entire lifetime of the app, the store cleanup function is likely to never be called anyways.

There is also two stores now, `href` and the default exported URL store. This is to make sure that when navigating to the same URL (same href), the URL store does not re-compute a new URL object.

## Server-side Rendering

Server-side rendering (SSR), a feature not many routers support, can also be easily implemented using a store. The gist is that instead of reading from `window.location.href`, we should be able to manually specify the current route to render, which basically translates to:

```js:title=ssr.js
import { URL } from "url"
import { writable } from "svelte/store"

const url = writable(new URL("https://example.com"))

export default {
  subscribe: url.subscribe,
  set: href => url.set(new URL(href)),
}
```

However when using stores in the server, they can't be imported directly as the value can leak to other current requests/connections. To prevent that, [Svelte Context](https://svelte.dev/tutorial/context-api) can be used to isolate the URL per request. The store would need to be a function too so that we can create one for each request. Adapting this into `url.js`, we get:

```js:title=url.js
import { derived, writable } from 'svelte/store'

export function createUrlStore(ssrUrl) {
  // Ideally a bundler constant so that it's tree-shakable
  if (typeof window === 'undefined') {
    const { subscribe } = writable(ssrUrl)
    return { subscribe }
  }

  const href = writable(window.location.href)

  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  const updateHref = () => href.set(window.location.href)

  history.pushState = function () {
    originalPushState.apply(this, arguments)
    updateHref()
  }

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments)
    updateHref()
  }

  window.addEventListener('popstate', updateHref)
  window.addEventListener('hashchange', updateHref)

  return {
    subscribe: derived(href, ($href) => new URL($href)).subscribe
  }
}

// If you're using in a pure SPA, you can return a store directly and share it everywhere
// export default createUrlStore()
```

In your main `App.svelte` for SSR, you can then create a context like so:

```js
import { setContext } from 'svelte'
import { createUrlStore } from './url'

// Value passed from the server renderer
export let ssrUrl = ''

setContext('APP', { url: createUrlStore(ssrUrl) })
```

You can view the full server setup in the final [repo](https://github.com/bluwy/svelte-url).

## Conclusion

And we've built ourself a reactive URL store that supports hash-based routing, history-based routing, and server-side rendering! Feel free to copy it in your next project and tweak it to your needs.

With reactive URLs, here's how it should look like now:

```svelte:title=App.svelte
<script>
  import url from './url'

  function handleLinkClick(e) {
    e.preventDefault()
    const href = e.target.href
    history.pushState(href, '', href)
  }
</script>

<nav>
  <a href="/" on:click={handleLinkClick}>Home</a>
  <a href="/about" on:click={handleLinkClick}>About</a>
  <a href="/404" on:click={handleLinkClick}>404</a>
</nav>

{#if $url.pathname === '/'}
  <h1>Home Sweet Home</h1>
{:else if $url.pathname === '/about'}
  <h1>About What?</h1>
{:else}
  <h1>404</h1>
{/if}
```

For more examples, check out:

- REPL: https://svelte.dev/repl/5abaac000b164aa1aacc6051d5c4f584?version=3
- Repo: https://github.com/bluwy/svelte-url

Happy routing!
