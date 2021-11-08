import path from 'path'
import adapter from '@sveltejs/adapter-netlify'
import WindiCSS from 'vite-plugin-windicss'
import markdown from '@bjornlu/rollup-plugin-markdown'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: '#svelte',
    adapter: adapter(),
    vite: {
      plugins: [WindiCSS(), markdown()],
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
