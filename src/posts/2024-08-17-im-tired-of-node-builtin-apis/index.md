---
title: I'm Tired of Node Builtin APIs
---

Node.js has been releasing some neat APIs for common downstream usecases lately. There's

<!-- endexcerpt -->

- [`node:test`](https://nodejs.org/api/test.html) - A test runner, like [mocha](https://mochajs.org), [ava](https://github.com/avajs/ava), [uvu](https://github.com/lukeed/uvu), [jest](https://jestjs.io), [vitest](https://vitest.dev), etc.
- [`parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig) - A CLI argument parser, like [minimist](https://github.com/minimistjs/minimist), [yargs-parser](https://github.com/yargs/yargs-parser), [mri](https://github.com/lukeed/mri), etc.
- [`styleText`](https://nodejs.org/api/util.html#utilstyletextformat-text) - An ANSI color formatter, like [picocolors](https://github.com/alexeyraspopov/picocolors), [chalk](https://github.com/chalk/chalk), [kleur](https://github.com/lukeed/kleur), [kolorist](https://github.com/marvinhagemeister/kolorist), etc.

I've been using them recently, but I noticed a recurring theme: **They like to do it differently**. As in diverging from the well-established design patterns of the alternative libaries above, for what it feels like, very little gain. But let me explain:

## Table of Contents

<!-- toc -->

## `node:test`

You can use `node:test` (and `node:assert` for assertions) like this:

```js
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('pizza', () => {
  it('should be delicious', () => {
    const pizza = makePizza()
    assert.ok(pizza.toppings.length > 0)
  })
})
```

On surface, it seems simple enough, but after [migrating the Astro codebase](https://astro.build/blog/node-test-migration/) from mocha/chai to test/assert, many glaring issues start to appear:

1. Each test files run in isolation (in their own `child_process`), so if you're importing a large module or many files, each test files have to pay the cost of loading them again even if you can be sure there's no side effects between them.

   In mocha, isolation is only enabled if you run with [`--parallel`](https://mochajs.org/#-parallel-p). Or tools like vitest have a specific [`isolation` option](https://vitest.dev/guide/cli-generated.html#isolate) to disable isolation.

   There's a [GitHub issue](https://github.com/nodejs/node/issues/51548) for this feature request.

2. If you want to run a single `it.only` test, you need to make sure all parent `describe` blocks use `describe.only` too, and run with the `--test-only` CLI flag. Unlike all other test runners where you only need `it.only` and it'll run that test only.

   ```js
   import { describe, it } from 'node:test'
   import assert from 'node:assert/strict'

   describe.only('pizza', () => {
     // ...lots of lines
     describe.only('nested', () => {
       // ...even more lines
       it.only('should be delicious', () => {
         // finally it would only run this test, with --test-only
         const pizza = makePizza()
         assert.ok(pizza.toppings.length > 0)
       })
     })
   })
   ```

3. The CLI flags are unnecessarily long and only works with a specific order. For example:

   | node:test           | mocha                            |
   | ------------------- | -------------------------------- |
   | --watch             | --watch, -w                      |
   | --test-timeout      | --timeout, -t                    |
   | --test-name-pattern | --grep, -g                       |
   | --test-concurrency  | --jobs, -j (with --parallel, -p) |
   | --test-force-exit   | --exit                           |
   | --test-only         | (not needed)                     |

   To run a single test with mocha, you can simply type `-g "pizza"` instead of `--test-name-pattern "pizza"`. And if you'd think to create a script command to avoid typing it, you can't because `"test:match": "node --test \"./test.js\" --test-name-pattern"` and `pnpm test:match "pizza"` does not work: `Could not find '/Users/bjorn/my/project/--test-name-pattern'`.

4. The test output is hard to read. If you have `.skip` and `.only` tests, here's how they look like:

   ```bash
   ▶ pizza
     ✔ should be delicious (0.03825ms)
     ﹣ skipped 1 (0.025542ms) # SKIP
     ﹣ skipped 2 (0.378375ms) # SKIP
     ﹣ skipped 3 (0.041167ms) # SKIP
   ▶ pizza (2.092625ms)
   ```

   ```bash
   ▶ pizza
     ✔ should be delicious (0.071791ms)
     ﹣ no only 1 (0.201958ms) # 'only' option not set
     ﹣ no only 2 (0.098708ms) # 'only' option not set
     ﹣ no only 3 (0.031625ms) # 'only' option not set
   ▶ pizza (2.110291ms)
   ```

   The additional descriptions (which should have been omitted) makes it hard to find the tests you're focusing on. Imagine working on a large codebase where all test files are run and logged this output.

   (The syntax highlighting is doing more justice than it should, in practice the skip and only lines are all white.)

5. `node:assert` is very limited. Previously, we had many assertions with chai that can accurately assert a certain shape or output, but with `node:assert`, you only get a minimal set of assertions that provides unhelpful hints if failed. For example:

   Node.js `assert.ok(pizza.toppings.includes("pepperoni"))`:

   ```bash
   $ node --test ./test.js
   ▶ pizza
     ✖ should be delicious (2.061791ms)
       AssertionError [ERR_ASSERTION]: false == true
           at TestContext.<anonymous> (file:///Users/bjorn/my/project/test.js:23:12)
           at Test.runInAsyncScope (node:async_hooks:203:9)
           at Test.run (node:internal/test_runner/test:631:25)
           at Test.start (node:internal/test_runner/test:542:17)
           at node:internal/test_runner/test:946:71
           at node:internal/per_context/primordials:487:82
           at new Promise (<anonymous>)
           at new SafePromise (node:internal/per_context/primordials:455:29)
           at node:internal/per_context/primordials:487:9
           at Array.map (<anonymous>) {
         generatedMessage: true,
         code: 'ERR_ASSERTION',
         actual: false,
         expected: true,
         operator: '=='
       }

   ▶ pizza (3.033875ms)
   ```

   Chai `expect(pizza.toppings).to.include("pepperoni")`:

   ```bash
   $ mocha ./test.js
     1) pizza
         should be delicious:
       AssertionError: expected [ 'cheese', 'tomato' ] to include 'pepperoni'
         at Context.<anonymous> (file:///Users/bjorn/my/project/test2.js:23:31)
         at process.processImmediate (node:internal/timers:476:21)
   ```

   Furthermore, you can't use chai with `node:test` because its reporter [does not support](https://github.com/chaijs/chai/issues/1511) Chai's assertion error format.

6. Tests run slow. When running tests locally, with mocha it was able to finish all tests in Astro in around 2-3 minutes. With `node:test`, it takes at least 5 minutes to finish. It's even more prominent on [`vite-ecosystem-ci`](https://github.com/vitejs/vite-ecosystem-ci) where Astro used to finish around the middle among all frameworks, now it's one of the slowest CI to test.

   For some, this costs many additional CI billing time and a higher carbon footprint, for a smaller feature set.

## `parseArgs`

You can use `parseArgs` with different options depending on your usecase:

```js
import { parseArgs } from 'node:util'

parseArgs({
  allowPositionals: true,
  options: {
    toppings: { type: 'string' }
  }
})

parseArgs({ strict: false })
```

It works well at most times, but slowly you may hit edge cases like this:

<!-- prettier-ignore -->
```js
import { parseArgs } from 'node:util'
import mri from 'mri'
import yargs from 'yargs-parser'
import minimist from 'minimist'

const args1 = ['--foo', 'value', '--bar']
console.log(parseArgs({ args: args1, strict: false }))
console.log(mri(args1))
console.log(yargs(args1))
console.log(minimist(args1))
// parseArgs: { values: { foo: true, bar: true }, positionals: [ 'value' ] }
// mri      : { _: [], foo: 'value', bar: true }
// yargs    : { _: [], foo: 'value', bar: true }
// minimist : { _: [], foo: 'value', bar: true }

const args2 = ['--foo', '--bar', 'value']
console.log(parseArgs({ args: args2, strict: false }))
console.log(mri(args2))
console.log(yargs(args2))
console.log(minimist(args2))
// parseArgs: { values: { foo: true, bar: true }, positionals: [ 'value' ] }
// mri      : { _: [], foo: true, bar: 'value' }
// yargs    : { _: [], foo: true, bar: 'value' }
// minimist : { _: [], foo: true, bar: 'value' }

const args3 = ['--foo', '--bar', 'value']
console.log(parseArgs({ args: args3, options: { foo: { type: 'string' } }, strict: false }))
console.log(mri(args3, { string: ['foo'] }))
console.log(yargs(args3, { string: ['foo'] }))
console.log(minimist(args3, { string: ['foo'] }))
// parseArgs: { values: { foo: '--bar' }, positionals: [ 'value' ] }
// mri      : { _: [], foo: '', bar: 'value' }
// yargs    : { _: [], foo: '', bar: 'value' }
// minimist : { _: [], foo: '', bar: 'value' }

const args4 = ['--foo']
console.log(parseArgs({ args: args4 }))
console.log(mri(args4, { unknown }))
console.log(yargs(args4))
console.log(minimist(args4, { unknown }))
// parseArgs: TypeError [ERR_PARSE_ARGS_UNKNOWN_OPTION]: Unknown option '--foo'
// mri      : Error: Unknown option '--foo'
// yargs    : { _: [], foo: true } (no strict support)
// minimist : Error: Unknown option '--foo'

const args5 = ['--foo']
console.log(parseArgs({ args: args5, options: { foo: { type: 'string', default: 'value' }} }))
console.log(mri(args5, { string: ['foo'], default: { foo: 'value' }, unknown }))
console.log(yargs(args5, { string: ['foo'], default: { foo: 'value' } }))
console.log(minimist(args5, { string: ['foo'], default: { foo: 'value' }, unknown }))
// parseArgs: TypeError [ERR_PARSE_ARGS_INVALID_OPTION_VALUE]: Option '--foo <value>' argument missing
// mri      : { _: [], foo: '' }
// yargs    : { _: [], foo: 'value' } (no strict support)
// minimist : { _: [], foo: '' }

function unknown(arg) {
  throw new Error(`Unknown option '${arg}'`)
}
```

These differences weren't obvious at first and required a [revert](https://github.com/withastro/astro/pull/11733) at the end. Also, you may notice among all the input and output shapes, only `parseArgs` is different from the rest.

Some of these may be bugs while [some may be intentional](https://github.com/nodejs/node/issues/54396). And it's unclear where Node is taking this API in the future, quoting [this comment](https://github.com/nodejs/node/issues/53427#issuecomment-2163584432):

> The addition of `parseArgs()` was controversial, and it was eventually added to Node.js core with the understanding that it would always remain a minimal implementation for the most basic use cases. It is by no means meant to replace more feature-complete argument parsers that exist in the ecosystem.

## `styleText`

You can use `styleText` like this:

```js
import { styleText } from 'node:util'

const s = `I like ${styleText('red', 'pizza')}`
```

Compared to the previously discussed APIs, `styleText` is rather simple and is an answer to an isolated, well-defined need of ANSI color formatting in the JS ecosystem. But again as you may notice, the API is different from the already well-established libraries:

```js
import { styleText } from 'node:util'
import picocolors from 'picocolors'
import chalk from 'chalk'
import kleur from 'kleur'
import * as kolorist from 'kolorist'

const s1 = `I like ${styleText('red', 'pizza')}`
const s2 = `I like ${picocolors.red('pizza')}`
const s3 = `I like ${chalk.red('pizza')}`
const s4 = `I like ${kleur.red('pizza')}`
const s5 = `I like ${kolorist.red('pizza')}`
```

While it may also seem that `styleText` optimizes for multiple styling, but in practice where the imports are often shortened, and there isn't much difference either:

```js
import { styleText as s } from 'node:util'
import c from 'picocolors' // or chalk, kolorist
import k from 'kleur'

const s1 = `I like ${s(['underline', 'bold', 'red'], 'pizza')}`
const s2 = `I like ${c.underline(c.bold(c.red('pizza')))}`
const s3 = `I like ${k.underline().bold().red('pizza')}`
```

Instead, `styleText`'s array of strings syntax gets in the way when reading the entire template string because it gets highlighted the same in IDEs. (Green in the example above)

It's not clear why it needs to be this way, and while API styles are subjective, there's also a big reason why the most adopted libraries all have a similar API design (because it's good). It would also be a lot easier for the ecosystem to rely on one less dependency if all it takes to migrate is to modify an import statement.

## Thoughts and Hope

I'll still be using these APIs for my projects if it helps reduce dependencies for the ecosystem, but it feels like Node is missing a lot of big opportunites here to make a significant impact on the JS ecosystem.

Some are bugs or feature requests that should be reported, but at the same time it's hard to tell whether it's intentional design due to how intentionally different they compare to other well-established libraries. Fixing these takes time too as it goes through the Node.js release cycle. It's easy to be compelled to hop on to a different library instead.

For now, if you're building a new project that will scale up, or work in a large codebase, I'd suggest sticking with the existing alternative libraries. If you're building a small and well-scoped project, the Node builtin APIs should work just fine.

For the future, with respect to the maintainers who brought us these APIs (which are still useful!), I hope the APIs may evolve better and take more inspiration from the existing ecosystem and design patterns.
