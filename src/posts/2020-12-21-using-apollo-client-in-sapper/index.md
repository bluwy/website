---
title: Using Apollo Client in Sapper
---

If you've tried to get Apollo Client to work with Sapper, you'll quickly notice that queries can get very repetitive, especially when implementing cache hydration.

You may be wondering if there's a cleaner way, but unfortunately, I haven't find the perfect solution I'm satisfied with yet. Nevertheless, I'll discuss the best, "simplest" solutions I've come about.

## Table of Contents

<!-- toc -->

## The Problem

Apollo Client has its own internal caching system, and during SSR, the cache is expected to be extracted, serialized, and hydrated in the client-side.

In Sapper, it's hard to find _where_ to put this logic. Here are some questions you can think about:

1. Where do I set up a per-request server-side Apollo Client to run queries and collect the cache?

2. When is it safe to serialize the cache?

3. Where do I put the cache data?

They're many answers to the questions above, many have its own caveats and roadblocks. Below I'll show my two best solutions.

## Solutions Please

### Method 1: Per-session Caching

This will set up a per-request Apollo Client and you can execute the query as usual. When the app finishes server-side rendering, the cache will be serialized and placed in Sapper's session object.

To set up a per-request Apollo Client, you can directly initialize it as a key of the `session` object. But you may be wondering: you can't put non-serializable data in the `session` object, right? Yesn't.

The trick here is to use the `onDestroy()` callback, which is called after the app is rendered, to **mutate the session object** to fix the serialization. This relies on the fact that Sapper serializes the `session` _only after_ the app is rendered. [Here's the relevant code](https://github.com/sveltejs/sapper/blob/6b143313f422ec670f7cc13ebfc415e2aa1d89e1/runtime/src/server/middleware/get_page_handler.ts#L312-L323).

#### Code

```js title=server.js
// ...
sapper.middleware({
  session: () => ({
    // Instantiate client, but can't serialze? No problem, we'll fix this later
    apollo: new ApolloClient({
      // Make sure queries run once
      ssrMode: true,
      // Use SchemaLink to run queries on local schema (no round trips)
      link: new SchemaLink(...),
      // Collects cache for this session
      cache: new InMemoryCache(),
    })
  })
})
// ...
```

```html title=_layout.svelte
<script>
  import { stores } from '@sapper/app'
  import { onDestroy } from 'svelte'
  import { apollo } from '../apollo' // imports client-side Apollo Client, undefined in server

  const { session } = stores()

  if (!process.browser) {
    onDestroy(() => {
      // Replace apollo client with its cache for serialization
      $session.apollo = $session.apollo.extract()
    })
  } else {
    // Restore the cache string back
    apollo.restore($session.apollo)
    // At client-side, the `$session.apollo` should refer to the client-side version
    $session.apollo = apollo
  }
</script>
```

```js title=apollo.js
export const apollo = process.browser
  ? new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache(),
      ssrForceFetchDelay: 100
    })
  : undefined
```

At this point, you could even return `req` and `res` for the session function, and "fix" it later, provided that you only access it in the server. But it's probably better to stay with Sapper's original intent of session.

#### Query Data

When running queries in `preload()`, you don't have to return the query results since the cache already contains the result, otherwise you would be sending duplicated data.

Since server-side rendering runs synchronously, you can retrieve the cache using `apollo.readQuery()`:

```html title=index.svelte
<script context="module">
  export async function preload(page, session) {
    // Run query, but don't return anything
    await session.apollo.query({ query: MY_QUERY })
  }
</script>

<script>
  import { stores } from '@sapper/app'

  const { session } = stores()

  // Synchronously read query from cache, retrieving the data back
  let data = $session.apollo.readQuery({ query: MY_QUERY })
</script>
```

### Method 2: Per-component Caching

If you're not a fan of bypassing Sapper's preload data, there's still a way to utilize the preload data to hydrate the Apollo Client.

You can run your queries as usual in `preload()`, return the data and hydrate the cache with `apollo.writeQuery()`.

#### Code

```js title=apollo.js
export const apollo = process.browser
  ? new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache(),
      ssrForceFetchDelay: 100,
    })
  : new ApolloClient({
     // Make sure queries run once
      ssrMode: true,
      // Use SchemaLink to run queries on local schema (no round trips)
      link: new SchemaLink(...),
      // Cache not used, but required by Apollo
      cache: new InMemoryCache(),
      // Disable all cache
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache'
        },
        mutate: {
          fetchPolicy: 'no-cache'
        },
        watchQuery: {
          fetchPolicy: 'no-cache'
        }
      }
    })
```

#### Query Data

The data query flow should be similar to fetching REST data. The only extra thing is to hydrate the cache in the client-side.

```html title=index.svelte
<script context="module">
  import { apollo } from '../apollo' // import Apollo Client depending on client or server-side

  export async function preload(page, session) {
    const result = await apollo.query({ query: MY_QUERY })

    return {
      data: result.data
    }
  }
</script>

<script>
  export let data

  if (process.browser) {
    // Write to cache
    apollo.writeQuery({ query: MY_QUERY, data: data })
  }
</script>
```

## Which is Better?

There's no right method between the two, it's all a matter of preference for how you want to handle the cache and how it pairs with Sapper. I'll continue to update this post if I find any major quirks with either approach.

## Fun Fact

Apollo's built-in `getDataFromTree()` API for React isn't any better anyways. Internally, it renders your app, collects all query promises, resolve them, and then render the app again, continuously until no query promises are found.

Although this has a benefit of great DX and able to resolve nested queries (queries that rely on other queries), you'll suffer from at least a double render on each request. [Here's the relevant code](https://github.com/apollographql/apollo-client/blob/e7739b60155d8f20d92bbf89a3050ed561a7819c/src/react/ssr/getDataFromTree.ts).

The cleanest approach I've found so far is by [vue-apollo](https://apollo.vuejs.org/guide/ssr.html), which takes advantage of Vue's [serverPrefetch()](https://ssr.vuejs.org/guide/data.html#logic-collocation-with-components) option that waits for any promises to resolve before rendering (async rendering).

<br/>
<br/>

And that's all.
