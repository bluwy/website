# My website

The [site](https://bjornlu.com) is built with [SvelteKit](https://kit.svelte.dev), [WindiCSS](https://windicss.org/), and [Remark](https://github.com/remarkjs/remark)/[Rehype](https://github.com/rehypejs/rehype)/[Unified](https://github.com/unifiedjs/unified).

## Notes

This is largely a port from Gatsby to SvelteKit. The biggest hurdle is to transfer the Markdown processing, which is especially hard due to Gatsby's locked-in Remark ecosystem. I've made a compatible [rollup-plugin-markdown](./packages/rollup-plugin-markdown) to tackle this.

## Development

```bash
# Install dependencies
$ pnpm install

# Start dev server
$ pnpm dev

# Build production site
$ pnpm build

# Preview production site
$ pnpm preview

# Format code with Prettier
$ pnpm format
```

## Attributions

- [taniarascia.com](https://www.taniarascia.com/): Design inspiration.
- [css.gg](https://css.gg/): CSS icons reference.
- [Google Fonts](https://fonts.google.com/): Free fonts.

## License

MIT
