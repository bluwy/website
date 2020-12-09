---
title: Pick Palette
desc: Color palette manager
icon: pick-palette.svg
featured: true
links:
  - label: Repository
    link: https://github.com/bluwy/pick-palette
  - label: Website
    link: https://pick-palette.netlify.app
tags:
  - Svelte
  - TypeScript
---

A simple color palette manager built with Svelte. Comes with various features, including undo/redo, offline usage, multi-tab editing, color blindness simulation, and more!

<!-- endexcerpt -->

## What I've Learned

This was my first project with Svelte, a new UI framework. Svelte was suprisingly easy to pick up and got hacking quickly. The hardest part would be implementing the undo and redo functionailty using Immer, since multiple reactive stores need to be exported and used internally.

The project also relies heavily on local states (localStorage) and overtime, a new state architecture is built to fit the data flow between stores. This can be found at [`src/store`](https://github.com/bluwy/pick-palette/tree/master/src/store).

Besides that, the user interface fully utilizes Svelte's built-in transitions to perform many sweet animations. Paired with Popper.js, almost any element can be made dynamic.
