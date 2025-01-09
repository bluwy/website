<script>
  /**
   * @typedef {Object} Props
   * @property {any} value
   * @property {boolean} [checked]
   * @property {boolean} [readonly]
   * @property {Function} [onchange]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props & { [key: string]: any }} */
  let {
    value,
    checked = $bindable(false),
    readonly = false,
    onchange,
    children,
    ...rest
  } = $props()
</script>

<label
  class="
    border rounded-md text-xs transition-colors duration-200 inline-block py-0.5 px-2
    {checked
    ? 'bg-primary-500 bg-opacity-50 border-primary-500'
    : 'bg-gray-400 bg-opacity-20 border-gray-500'}
    {readonly ? 'cursor-default' : 'cursor-pointer'}
  "
>
  <input
    {...rest}
    type="checkbox"
    class="hidden"
    {value}
    bind:checked
    {readonly}
    {onchange}
  />
  {@render children?.()}
</label>
