import unified from "unified"
import remarkParse from "remark-parse"
import remarkReact from "remark-react"

const remark = unified().use(remarkParse).use(remarkReact)

export function markdownToReact(text) {
  return remark.processSync(text).result
}
