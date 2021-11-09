/**
 * @param {Date} date
 */
export function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
