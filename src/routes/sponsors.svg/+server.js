/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
  const result = await fetch(
    'https://gist.github.com/bluwy/0382476041ee9ae6b4d5eaee719a40df/raw/sponsors.svg',
    {
      method: 'GET',
      // https://developers.cloudflare.com/workers/examples/cache-using-fetch/
      cf: {
        cacheTtl: 259200, // Cloudflare caches 3 days. GitHub sets 5 minutes by default, but we don't need that frequency.
        cacheEverything: true
      }
    }
  )

  if (!result.ok)
    return new Response('Failed to fetch SVG endpoint', { status: 500 })

  return new Response(result.body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'image/svg+xml',
      'Content-Length': result.headers.get('Content-Length'),
      'Cache-Control': import.meta.env.DEV
        ? 'no-store'
        : 'public, max-age=604800, s-maxage=259200' // Browser caches 1 week. Shared cache 3 days.
    }
  })
}
