// Original gist URL: https://gist.github.com/bluwy/0382476041ee9ae6b4d5eaee719a40df/raw/sponsors.svg
// Note:
// 1. If you visit the link directly, it won't load the user `data:image`
// 2. If you load the URL via `object` tag, it's blocked by X-Frame-Options
// 3. You also can't fetch it

const url = import.meta.env.DEV
  ? 'https://gist.githack.com/bluwy/0382476041ee9ae6b4d5eaee719a40df/raw/sponsors.svg'
  : 'https://gistcdn.githack.com/bluwy/0382476041ee9ae6b4d5eaee719a40df/raw/sponsors.svg'

export function get() {
  return {
    status: 302,
    headers: {
      Location: url
    }
  }
}
