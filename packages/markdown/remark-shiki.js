import { getHighlighter, FontStyle } from 'shiki'
import { visit } from 'unist-util-visit'

/** @type {import('unified').Plugin} */
export function remarkShiki() {
  const highlighterPromise = getHighlighter({
    theme: 'one-dark-pro',
    langs: ['html', 'css', 'javascript', 'typescript', 'ini', 'xml', 'svelte']
  })

  return async function (tree) {
    const highlighter = await highlighterPromise
    visit(tree, 'code', (node) => {
      node.type = 'html'
      node.value = codeToHtml(highlighter, node.value, node.lang)
    })
    visit(tree, 'inlineCode', (node) => {
      node.type = 'html'
      node.value = `<code class="language-text">${escapeHtml(
        node.value
      )}</code>`
    })
  }
}

/**
 * Compatible with Gatsby. Support line highlighting and markup structure.
 * @param {import('shiki').Highlighter} highlighter
 * @param {string} code
 * @param {import('shiki').Lang} [lang]
 * @param {import('shiki').Theme} [theme]
 */
function codeToHtml(highlighter, code, lang, theme) {
  const tokens = highlighter.codeToThemedTokens(code, lang)
  const _theme = highlighter.getTheme(theme)
  return renderToHtml(tokens, {
    fg: _theme.fg,
    bg: _theme.bg,
    langId: lang
  })
}

// Forked from https://github.com/shikijs/shiki/blob/e9209dea35bde4446a9f346b5deaa48ad89409b7/packages/shiki/src/renderer.ts#L6
/**
 *
 * @param {import('shiki').IThemedToken[][]} lines
 * @param {import('shiki').HtmlRendererOptions} options
 */
function renderToHtml(lines, options = {}) {
  const bg = options.bg || '#fff'
  const lang = options.langId || 'text'

  let html = ''

  html += `<div class="gatsby-highlight" data-language="${lang}" style="background-color: ${bg}">`
  html += `<pre class="language-${lang}">`
  html += `<code class="language-${lang}">`

  let nextNumberOfLinesToHighlight = 0

  lines.forEach((/** @type {import('shiki').IThemedToken[]} */ l) => {
    if (l.length === 0) {
      html += `<span class="line"></span>`
      return
    }
    const lineContent = l.map((n) => n.content).join('')
    if (lineContent.match(/\/\/\s*highlight-next-line/)) {
      nextNumberOfLinesToHighlight++
      return
    }
    if (lineContent.match(/\/\/\s*highlight-start/)) {
      nextNumberOfLinesToHighlight = Infinity
      return
    }
    if (lineContent.match(/\/\/\s*highlight-end/)) {
      nextNumberOfLinesToHighlight = 0
      return
    }
    if (l[l.length - 1].content.match(/\/\/\s*highlight-line/)) {
      html += `<span class="line gatsby-highlight-code-line">`
      l.splice(l.length - 1, 1)
    } else if (nextNumberOfLinesToHighlight > 0) {
      html += `<span class="line gatsby-highlight-code-line">`
      nextNumberOfLinesToHighlight--
    } else {
      html += `<span class="line">`
    }

    l.forEach((token) => {
      const cssDeclarations = [`color: ${token.color || options.fg}`]
      if (token.fontStyle & FontStyle.Italic) {
        cssDeclarations.push('font-style: italic')
      }
      if (token.fontStyle & FontStyle.Bold) {
        cssDeclarations.push('font-weight: bold')
      }
      if (token.fontStyle & FontStyle.Underline) {
        cssDeclarations.push('text-decoration: underline')
      }
      html += `<span style="${cssDeclarations.join('; ')}">${escapeHtml(
        token.content
      )}</span>`
    })

    html += `</span>\n`
  })
  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += `</code></pre></div>`

  return html
}

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

/**
 * @param {string} html
 */
function escapeHtml(html) {
  return html.replace(/[&<>"']/g, (chr) => htmlEscapes[chr])
}
