---
title: fmu
desc: JS module utilities written in Rust
icon: fmu.svg
created: '2022-07-12'
featured: true
links:
  - label: GitHub
    link: https://github.com/bluwy/fmu
  - label: NPM
    link: https://www.npmjs.com/package/fmu
  - label: Website
    link: https://bluwy.github.io/fmu
tags:
  - Rust
  - Tooling
---

A WASM library containing utilities for working with JavaScript modules. <!-- endexcerpt --> It's mostly useful for other libraries to be built upon, if a specific functionality is needed, with high performance.

## How it works

[es-module-lexer](https://github.com/guybedford/es-module-lexer) was the main inspiration for `fmu`. Instead of parsing JavaScript, it's enough to simply iterate over each characters to determine the code syntax. Skipping strings and comments are easy too as they have a predictable syntax and rules. When a correct sequence of characters is matched, along with backtracking, scope/depth tracking (for variable shadowing), that all passes. It provides enough heuristic for syntax analysis. This also means that compared to parsing, it may catch things incorrectly, but it's generally a tradeoff for performance.

## What I've learned

This is my first project with Rust. The tooling was a breath of fresh air, along with WebAssembly being very simple to implement. The lower-level patterns, such as Rust's ownership concept, gets easier to work with once you understand the why (The [book](https://doc.rust-lang.org/book/) was of great help). The hardest part for me was dealing with futures since I used `hyper` and jumped straight to `tokio`, but over time it's fun language to code in.
