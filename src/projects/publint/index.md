---
title: publint
desc: Lint packaging errors
icon: publint.svg
created: '2022-02-21'
featured: true
links:
  - label: GitHub
    link: https://github.com/bluwy/publint
  - label: NPM
    link: https://www.npmjs.com/package/publint
  - label: Website
    link: https://publint.bjornlu.com
tags:
  - Svelte
  - Tooling
---

An online and local tool to lint packaging errros and ensure compatibility across different environments. <!-- endexcerpt --> With the migration from CJS to ESM and dual browser-node support, packages are often built for a specific enviroment only and isn't future compatible as new tooling comes. This tool aims to fix them by provising useful feedback and suggestions ahead of time.

## How it works

The rules applied can be found on [this page](https://publint.bjornlu.com/rules). Most of them require reading the `package.json` and published files to easily simulate what would happen when it's being used in a specific environment. The tools starts by traversing `package.json` and validate all relevant exporting fields, like `main`, `module`, and `exports`, in parallel, cumulating a list of messages, and finally reporting them.

To get access to the published files is a challenge to. Online, this is done by fetching from npm and unzipping it. Locally, it uses `npm-pack-list` to get a list of files that will be published, so we don't over-scan a local project.

## What I've learned

Most rules come from experience as they are only noted in hard-to-find sources. Listing them isn't great either, no one wants to read a long guide just to make a package. Instead, something automatic that brings actionable goals to package authors is more effective.

This project also gave first-hand experience with web workers, which is something I'm always curious of how it works in Vite. Luckily, _most_ worked out of the box and I found new things that can be improved in Vite too.
