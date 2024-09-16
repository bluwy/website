---
title: svelte-preprocess-import-assets
desc: Import assets directly in you markup
icon: svelte.svg
created: '2021-04-27'
featured: true
links:
  - label: GitHub
    link: https://github.com/bluwy/svelte-preprocess-import-assets
  - label: NPM
    link: https://www.npmjs.com/package/svelte-preprocess-import-assets
tags:
  - Svelte
---

A Svelte preprocessor that allows importing assets through `<img src="...">`.

<!-- endexcerpt -->

## What is it

Svelte doesn't have opinions on how assets are handled. By leveraging a bundler, assets can be imported with `import` statements, and the value can be used as the `img` `src`. However, it is one extra line of code that can be automated, which this preprocessor acheives by transforming `img` `src` to direct JavaScript imports.
