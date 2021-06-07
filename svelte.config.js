import path from 'path'
import { windi } from 'svelte-windicss-preprocess'
import adapterStatic from '@sveltejs/adapter-static'

export default /** @type {import('@sveltejs/kit').Config} */ ({
  preprocess: [windi()],
  kit: {
    target: '#svelte',
    adapter: adapterStatic(),
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
})
