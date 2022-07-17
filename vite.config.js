import path from 'path'
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import WindiCSS from 'vite-plugin-windicss'
import markdown from '@bjornlu/rollup-plugin-markdown'

export default defineConfig({
  plugins: [sveltekit(), WindiCSS(), markdown()],
  resolve: {
    alias: {
      $assets: path.resolve('src/assets'),
      $data: path.resolve('src/data'),
      $posts: path.resolve('src/posts'),
      $projects: path.resolve('src/projects')
    }
  }
})
