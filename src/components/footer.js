import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allSocialsYaml {
        nodes {
          title
          link
        }
      }
    }
  `)

  const socialLinks = data.allSocialsYaml.nodes

  return (
    <footer className="mt-12">
      <div className="container">
        <hr className="border-t-2 border-primary-700 opacity-50" />
        <div className="flex flex-row justify-between py-8">
          <div className="flex-shrink">
            &copy; Bjorn Lu {new Date().getFullYear()}
          </div>
          <div className="flex-shrink">
            {socialLinks.map(socialLink => (
              <a
                className="font-semibold border-b border-black mr-2"
                key={socialLink.title}
                href={socialLink.link}
                title={`My ${socialLink.title} profile`}
              >
                {socialLink.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
