---
title: Svelte Router
desc: A SPA router for Svelte
icon: npm.svg
links:
  - label: GitHub
    link: https://github.com/bluwy/svelte-router
  - label: NPM
    link: https://www.npmjs.com/package/@bjornlu/svelte-router
tags:
  - Svelte
  - TypeScript
---

A simple router for Svelte single-page apps. Supports hash and path-based navigations.

<!-- endexcerpt -->

## What I've Learned

Svelte Router came to fruition based on a side project. Out of [10+ popular routers](https://svelte-community.netlify.app/code/?tag=routers) out there, none fitted my needs. So I built one with all the features I need.

While building a proof-of-concept, I realized it wasn't as simple as it seemed. I've dug through popular routers like [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom), [Vue Router](https://github.com/vuejs/vue-router), [svelte-router-spa](https://github.com/jorgegorka/svelte-router) and [svelte-routing](https://github.com/EmilTholin/svelte-routing) to grasp the general implementation, but most of them over-complicated the process and missed some crucial features that resorted to workarounds. With that said, I don't blame them since tradeoffs are always unavoidable.

With the newfound knowledge, I was able to simplify the routing process and make the code as readable as possible without sacrificing DX on both the user and maintainer side.

Besides that, I also learned using [Cypress](https://cypress.io) for end-to-end tests. Although the application is fairly simple, I got a better idea of how e2e testing works now and it's no harder than unit testing.
