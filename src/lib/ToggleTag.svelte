<script>
  /** @type {any} */
  export let value
  export let checked = false
  export let readonly = false
</script>

<label
  class="
    border rounded-md text-sm transition-colors duration-200 inline-block py-0.5 px-2
    {checked
    ? 'bg-primary-500 bg-opacity-50 border-primary-500'
    : 'bg-gray-400 bg-opacity-20 border-gray-500'}
  "
>
  <input
    {...$$restProps}
    type="checkbox"
    class="hidden"
    {value}
    bind:checked
    {readonly}
    on:change
  />
  <slot />
</label>
