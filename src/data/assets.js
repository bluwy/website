// Assets are only generated in client build, but the current markdown pipeline
// only references the assets in the server build. So no assets are emitted.
// This file is imported by __layout.svelte, which Vite will crawl in the client
// build and generate the assets.

// ts-ignore
const postMarkdownImages = import.meta.glob('../posts/**/*.{png,jpg}')
// ts-ignore
const projectMarkdownImages = import.meta.glob('../projects/**/*.{png,jpg}')
// ts-ignore
const projectIconSvgs = import.meta.glob('../assets/images/project-icons/*.svg')
