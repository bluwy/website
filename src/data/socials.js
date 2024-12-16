import githubIcon from '$assets/images/social-icons/github.svg?raw'
// import redditIcon from '$assets/images/social-icons/reddit.svg?raw'
import blueskyIcon from '$assets/images/social-icons/bluesky.svg?raw'
import twitterIcon from '$assets/images/social-icons/twitter.svg?raw'
import mastodonIcon from '$assets/images/social-icons/mastodon.svg?raw'
import linkedinIcon from '$assets/images/social-icons/linkedin.svg?raw'

export const socials = [
  {
    title: 'GitHub',
    link: 'https://github.com/bluwy',
    svg: githubIcon
  },
  // Not really useful for now. Replacing with bluesky instead to also
  // keep symmetry of the icons on the page
  // {
  //   title: 'Reddit',
  //   link: 'https://reddit.com/user/IamLUG',
  //   svg: redditIcon
  // },
  {
    title: 'Bluesky',
    link: 'https://bsky.app/profile/bluwy.me',
    svg: blueskyIcon
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/bluwyoo',
    svg: twitterIcon
  },
  {
    title: 'Mastodon',
    link: 'https://m.webtoo.ls/@bluwy',
    rel: 'me',
    svg: mastodonIcon
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/bjornlu',
    svg: linkedinIcon
  }
]
