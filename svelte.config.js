import path from 'path'
import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter({
      routes: {
        exclude: ['<all>', '/sponsor', '/sponsors', '/todo']
      }
    }),
    alias: {
      $assets: path.resolve('src/assets'),
      $data: path.resolve('src/data'),
      $posts: path.resolve('src/posts'),
      $projects: path.resolve('src/projects')
    }
  }
}
