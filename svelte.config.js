import path from 'path'
import { windi } from 'svelte-windicss-preprocess'
import adapter from '@sveltejs/adapter-netlify'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [windi()],
  kit: {
    target: '#svelte',
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $assets: path.resolve('src/assets'),
          $data: path.resolve('src/data'),
          $posts: path.resolve('src/posts'),
          $projects: path.resolve('src/projects')
        }
      }
    }
  }
}

export default config
