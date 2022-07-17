export function GET() {
  return {
    status: 302,
    headers: { Location: 'https://github.com/users/bluwy/projects/1' }
  }
}
