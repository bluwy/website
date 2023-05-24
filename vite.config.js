import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import WindiCSS from 'vite-plugin-windicss'
import markdown from '@bjornlu/rollup-plugin-markdown'
import { cloudflareRedirect } from 'vite-plugin-cloudflare-redirect'

export default defineConfig({
  plugins: [sveltekit(), WindiCSS(), markdown(), cloudflareRedirect()]
})
