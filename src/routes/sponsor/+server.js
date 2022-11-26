export function GET() {
  return new Response(undefined, {
    status: 302,
    headers: { Location: 'https://patreon.com/bluwy' }
  })
}
