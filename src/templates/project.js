import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"
import { markdownToReact } from "../utils/markdown"

export default ({ pageContext: { project } }) => {
  // const heroImgData = useStaticQuery(graphql`
  //   query {
  //     file(relativePath: { eq: "gatsby-astronaut.png" }) {
  //       childImageSharp {
  //         fluid(maxWidth: 600) {
  //           ...GatsbyImageSharpFluid
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <Layout>
      <SEO title={`${project.title} - Project`} />
      <Header title={project.title} />
      <article className="container my-12">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.link}
        </a>
        {markdownToReact(project.overview)}
        {/* <Img
          alt={`Preview of ${project.title}`}
          fluid={heroImgData.file.childImageSharp.fluid}
        /> */}
        <h2>What I've Learned</h2>
        {markdownToReact(project.learned)}
      </article>
    </Layout>
  )
}
