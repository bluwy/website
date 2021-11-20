/**
 * @param {Date} date
 */
export function formatDate(date) {
  // Force English since the site is only available in English
  return date.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
