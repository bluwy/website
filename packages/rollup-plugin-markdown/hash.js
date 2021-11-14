import crypto from 'crypto'

/**
 * @param {string} input
 */
export function hash(input) {
  const md5 = crypto.createHash('md5')
  md5.update(input)
  const hash = toSafe(md5.digest('base64')).substr(0, 6)
  return hash
}

const replacements = {
  '+': '-',
  '/': '_',
  '=': ''
}

const replaceRE = new RegExp(`[${Object.keys(replacements).join('')}]`, 'g')

/**
 * @param {string} base64
 */
function toSafe(base64) {
  return base64.replace(replaceRE, (x) => replacements[x])
}
