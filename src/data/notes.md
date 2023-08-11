<!-- Useful, but too much effort, discontinued -->

## 11 August 2023

- Pushing to GitHub gists only work with SSH.

## 9 January 2022

- Cloudflare [does not support pnpm](https://community.cloudflare.com/t/add-pnpm-to-pre-installed-cloudflare-pages-tools/288514) by default, but can be workaround with the build command `npx pnpm i --store=node_modules/.pnpm-store && npm run build` and environment variable `NPM_FLAGS` = `--version`.

## 8 January 2022

- You cannot sign in to Google if Safari has the `requestIdleCallback` experimental option turned on. [Thanks](https://discussions.apple.com/thread/251820986?answerId=251820986021#251820986021).

## 6 June 2021

- Bundlers compile ESM to CJS with `module.export.default` for compatibility with CJS in ESM. This only happens if you have named exports, as CJS doesn't exactly support it. This is also the reason for `require('module').default` syntax.

## 3 June 2021

- Playwright doesn't like using Chromium browser running `--single-process` in Ubuntu

## 2 June 2021

- [Gqless](https://github.com/gqless/gqless) generates GraphQL queries on the fly by sniffing variable usages. Likely with Proxies.

## 16 May 2021

- 20 GB partition size for Linux root directory is not enough for snaps.

## 14 May 2021

- [Vagrant](https://www.vagrantup.com) setups an entire stack on your PC, including the OS. Feels like a waste of storage and bandwidth, with the only benefit of saving time.

## 10 May 2021

- WebView browser versions in Android emulators are usually pinned and can't be upgraded.

## 8 May 2021

- Svelte `createEventDispatcher()` and `bubble()` (the logic that forwards DOM events) have similar code that simulates dispatching an event.

## 7 May 2021

- `@vitejs/plugin-legacy` set `modernPolyfills: true` and `renderLegacyChunks: false` to only build polyfills for the generated chunks.

## 6 May 2021

- To make sure Vite and plugins know they're working on production build, set `process.env.VITE_USER_NODE_ENV = "production"`.

## 4 May 2021

- In Ubuntu, if `~/` disk space runs out and unable to start the GUI, go to `ctrl-alt-f2` (or any other fn except `f1`). Make disk space there.

## 2 May 2021

- Scroll-snapped list need `scroll-snap-align` property in the children.

## 30 May 2021

- Terser doesn't mangle DOM polyfills well. e.g. `function CustomEvent() {}` will not work whether it's scoped or not. I should probably report this bug.

## 28 April 2021

- If BIOS doesn't boot GRUB, but booted Windows instead, go to BIOS menu and manually boot with GRUB, then enter `sudo efibootmgr -o 0 1` to switch the boot sequence between the 0th and 1st bootloader (or similar command).

## 16 April 2021

- Transfering money via cryptocurrencies is a very viable option to PayPal or TransferWise.

## 11 April 2021

- Svelte compiler exposes metadata, including `vars`.

## 9 April 2021

- When you have a git branch relation like: `master` < `feat-a` < `feat-b`. If `feat-a` gets squash merged into `master`, and to get `feat-b` merged into `master`, run `git rebase master -i` to interactively drop squash commits and rebase. Note the commits will be recommitted, changing commit time.

## 6 April 2021

- In bash, `$()` means execute and return a value; `\` means execute only

## 5 April 2021

- Babel is only a parser/transpiler, nothing fancy

## 3 April 2021

- When reading the source of a software, remember that you're reading bleeding-edge code that may not be released yet.

## 30 March 2021

- VSCode has a search editor that places the search result directly in code view.

## 29 March 2021

- Sentry release version needs to match the SDK's release name.

- Facebook created [Origami Design](https://origami.design/) that has much better and programmable prototyping functionality.

## 28 March 2021

- `@vue/compiler-sfc` automatically [transforms asset URLs to JS imports](https://github.com/vuejs/vue-next/blob/2424768808e493ae1b59860ccb20a7c96d72d20a/packages/compiler-sfc/src/templateTransformAssetUrl.ts#L84).

- `@vue/compiler-sfc` splits Vue SFCs into 3 virtual imports for template, script, and style. These virtual import paths are appended query strings to denote additional metadata. Flexible enough to allow integration for Vite, Rollup, and Webpack.

- `@vue/compiler-sfc` uses `@babel/parser` to parse JS, TS, and other superset syntax [via the `plugins` options](https://github.com/vuejs/vue-next/blob/2e3984fd5b4fa02b28947ebf769413d2e31e971d/packages/compiler-sfc/src/compileScript.ts#L105-L107), allowing it to support many syntax out-of-the-box.

- Vue SFC and Svelte supports superset languages like TypeScript and Postcss by implementing a preprocess API, but this API is bound by the respective parser/compiler rather than the bundler, resulting in duplicated preprocessing configuration. `@sveltejs/vite-plugin-svelte` is leveraging bundler preprocess with `useVitePreprocess` option.

## 26 March 2021

- TypeScript uses a [neat trick](https://github.com/microsoft/TypeScript/blob/aa67b16e996124ef55848eac58d7ee0b30d5b113/src/compiler/sys.ts#L1429-L1436) to check if the filesystem is case-sensitive. Given a valid file path, if we invert the casings and it still exists, that means it's case-insenstive.

## 25 March 2021

- Apollo Client offline support sucks. [urql seems to be better](https://formidable.com/open-source/urql/docs/graphcache/offline/).

## 22 March 2021

- Node streams apply [backpressuring](https://nodejs.org/en/docs/guides/backpressuring-in-streams/) to prevent memory monopolization when stream reads is more than writes, because writing to disk is slower than reads.

- The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) doesn't have a streaming API. It's limited to a single pass hashing due to the algorithm limitation. [Issue](https://github.com/w3c/webcrypto/issues/73).

## 19 March 2021

- [linkedom](https://github.com/WebReflection/linkedom) is a DOM parser that walks the tree via flattening it, resulting in O(n) reads.

- Android emulator WebViews can be inspected via [chrome://inspect](chrome://inspect).
