---
title: svelte-fast-dimension
desc: Fast dimension bindings for Svelte
featured: true
links:
  - label: GitHub
    link: https://github.com/bluwy/svelte-fast-dimension
tags:
  - Svelte
---

A Svelte preprocessor that converts dimension bindings to use `ResizeObserver`.

<!-- endexcerpt -->

## What is it

Binding dimensions through `bind:clientWidth` and `bind:clientHeight` often has a performance impact, as they use a trick with `iframe` to measure the dimensions. Modern browsers don't require this and are free to use modern APIs like `ResizeObserver` to measure it, leading to a smooth and stable experience.
