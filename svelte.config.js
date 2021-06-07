import adapterStatic from '@sveltejs/adapter-static'

export default /** @type {import('@sveltejs/kit').Config} */ ({
  kit: {
    target: '#svelte',
    adapter: adapterStatic()
  }
})
