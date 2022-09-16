export function GET() {
  return new Response(undefined, { status: 302, headers: { Location: 'https://github.com/users/bluwy/projects/1' } })
}
