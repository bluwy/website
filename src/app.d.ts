/// <reference types="@sveltejs/kit" />

declare module '*.md' {
  export const frontmatter: Record<string, any>
  export const readingTime: string
  export const excerpt: string
  export const tocHtml: string
  export const markdownHtml: string
}
