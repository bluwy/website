import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import unocss from '@unocss/vite'
import markdown from '@bjornlu/rollup-plugin-markdown'
import { cloudflareRedirect } from 'vite-plugin-cloudflare-redirect'

export default defineConfig({
  plugins: [
    unocss(),
    sveltekit(),
    markdown(),
    cloudflareRedirect(),
    workaroundSvelteKitSafariBug()
  ]
})

/**
 * https://bugs.webkit.org/show_bug.cgi?id=242740
 * https://github.com/sveltejs/kit/issues/2889
 * https://github.com/unocss/unocss/issues/618
 * @returns {import('vite').Plugin}
 */
function workaroundSvelteKitSafariBug() {
  return {
    name: 'workaround-sveltekit-safari-bug',
    apply: 'serve',
    transform(code, id) {
      if (id.endsWith('+layout.svelte')) {
        return code.replace(
          `import 'virtual:uno.css'`,
          `import('virtual:uno.css')`
        )
      }
    }
  }
}
