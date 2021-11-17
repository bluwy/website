# My website

https://bjornlu.com

## Notes

This is largely a port from Gatsby to SvelteKit. The biggest hurdle is to transfer the Markdown processing, which is especially hard due to Gatsby's locked-in Remark ecosystem. I've made [rollup-plugin-markdown](./packages/rollup-plugin-windicss/index.js) to tackle this.

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
- [package.json](./package.json)

## License

MIT
