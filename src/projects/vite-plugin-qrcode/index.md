---
title: vite-plugin-qrcode
desc: Show QR code on server start
featured: true
links:
  - label: GitHub
    link: https://github.com/svitejs/vite-plugin-qrcode
tags:
  - Vite
---

A Vite plugin to show a QR Code on server start to be scanned by mobile devices.

<!-- endexcerpt -->

## What is it

This was a fun project with Dominik (author of `vite-plugin-svelte` and `svite`). The idea stemmed from a [SvelteKit issue](https://github.com/sveltejs/kit/issues/2513). When I saw it, I quickly spin up a quick implementation as an exercise of Vite plugins. Soon after, we polished it up and published it under the `svitejs` organization. The QR Code would only be shown if the server is exposed to the network, which mobile devices can connect to for testing.
