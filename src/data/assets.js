// Asset paths so client build will copy over these assets

// ts-ignore - please vite transform
const projectMarkdownImages = import.meta.glob('../projects/**/*.png')
// ts-ignore - please vite transform
const projectIconSvgs = import.meta.glob('../assets/images/project-icons/*.svg')
