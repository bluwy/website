---
title: Colorblind
desc: Simulate color blindness
icon: npm.svg
featured: true
links:
  - label: Repository
    link: https://github.com/bluwy/colorblind
  - label: NPM
    link: https://www.npmjs.com/package/@bjornlu/colorblind
tags:
  - TypeScript
---

A zero-dependencies color blindness simulation library. Transforms RGB colors to simulate color blindness.

<!-- endexcerpt -->

## What I've Learned

This was my first NPM library that was built simply to remove the [onecolor](https://github.com/One-com/one-color) dependency and add typings to the existing [color-blind](https://github.com/skratchdot/color-blind) package. After some time digging into color-blind's code, I noticed the outdated algorithm used and after much research I went to implement a new algorithm based on the [color blindness simulation research](https://ixora.io/projects/colorblindness/color-blindness-simulation-research/). I've documented further findings in the [README](https://github.com/bluwy/colorblind#prior-research).

The most significant part while building this library was setting up [Rollup](https://github.com/bluwy/colorblind#prior-research) to bundle the TypeScript code into UMD, CommonJS and ES Module. The declaration typings generated with [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript) were tricky to get right at first, but I got it settled after reading through countless issues on GitHub.
