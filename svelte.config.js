import { windi } from 'svelte-windicss-preprocess'
import adapterStatic from '@sveltejs/adapter-static'

export default /** @type {import('@sveltejs/kit').Config} */ ({
  preprocess: [windi()],
  kit: {
    target: '#svelte',
    adapter: adapterStatic()
  }
})
