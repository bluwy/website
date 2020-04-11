import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
    <Layout siteTitle={project.title}>
      <SEO title={project.title} />
      <article className="container mb-12">
        <h1>{project.title}</h1>
        <a href={project.link} target="_blank">
          {project.link}
        </a>
        <p dangerouslySetInnerHTML={{ __html: project.overview }} />
        {/* <Img
          alt={`Preview of ${project.title}`}
          fluid={heroImgData.file.childImageSharp.fluid}
        /> */}
        <h2>What I've Learned</h2>
        {project.learned.map(learnedParagraph => (
          <p
            key={learnedParagraph}
            dangerouslySetInnerHTML={{ __html: learnedParagraph }}
          />
        ))}
      </article>
    </Layout>
  )
}
