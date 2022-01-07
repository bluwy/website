---
title: My Svelte Code Ordering Style
---

Formatting Svelte code with Prettier is just half the story, the script tag is where the magic happens, but there's no formal way to organize it.

Over time I picked up a pattern to help with readabilty, code flow, and familiarity. Feel free to use and tweak it to your own style. YMMV!

## Order

1. Svelte core imports

1. Svelte third-party library imports

1. Other library imports

1. Svelte third-party component imports

1. Svelte component imports

1. Asset imports

1. Normal JS imports

1. `const` variables

1. `export let` props

1. `export const` props

1. `let` variables

1. Computed variables (with mix of `let` variables)

1. Computed blocks

1. Lifecycle functions

1. Core logic functions

1. `export function` props

1. Event handler functions (name starts with `handle`)

1. Utility functions

> Break this pattern whenever it feels right, e.g. grouping things by feature than type

## Example

```svelte
<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { _ } from 'svelte-i18n'
  import { debounce } from 'lodash'
  import { Modal } from 'svelte-components'
  import Button from './Button.svelte'
  import picture from './picture.svg'
  import { download } from './utils'

  const MAX_NUMBER = 5
  const dispatch = createEventDispatcher()

  export let value
  export let disabled = false
  export const magicNumber = 10

  let currentNumber = 0

  $: nextNumber = currentNumber + 1

  $: if (currentNumber === magicNumber) {
    console.log(':)')
  }

  onMount(() => {
    currentNumber = -currentNumber
  })

  function calculateSeverity() {
    currentNumber = currentNumber * 5 - 1
  }

  export function reset() {
    currentNumber = -currentNumber
  }

  function handleClick() {
    dispatch('alert')
    boo('alert')
  }

  function boo(str) {
    console.log('[Example] ' + str)
  }
</script>

<Button {value} {disabled} on:click={handleClick} />
```
