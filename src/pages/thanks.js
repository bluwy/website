import React from "react"
import { Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

const Thanks = () => {
  return (
    <Layout>
      <SEO title="Thanks" />
      <div className="container text-center">
        <h1 className="text-7xl">Thanks</h1>
        <p>Your enquiry will be responded shortly.</p>
        <p className="markdown">
          In the meantime, let's go <Link to="/">home</Link>.
        </p>
      </div>
    </Layout>
  )
}

export default Thanks
