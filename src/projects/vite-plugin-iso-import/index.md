---
title: vite-plugin-iso-import
desc: Import modules isomorphically
icon: vite.svg
featured: true
links:
  - label: GitHub
    link: https://github.com/bluwy/vite-plugin-iso-import
tags:
  - Vite
---

A Vite plugin to separate importing modules for the client and server.

<!-- endexcerpt -->

## How it works

The plugin adds two new import suffix: `?client` and `?server`. When making a client build, `?client` imports are preserved while `?server` imports are removed. Vice versa for server builds as well. This technique is acheived by using `es-module-lexer` and `magic-string` to lex all imports and remove the ones that are not needed, all while keeping sourcemaps safe. Special care has been taken to make prebundling work too, which requires hacks around Vite's scanner to properly resolve these imports.
