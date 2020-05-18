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
        <div className="flex flex-col sm:flex-row flex-col-reverse justify-between py-8 text-center sm:text-left">
          <div className="flex-shrink">
            &copy; Bjorn Lu {new Date().getFullYear()}
          </div>
          <div className="flex-shrink space-x-3 mb-3 sm:mb-0">
            {socialLinks.map(socialLink => (
              <a
                className="font-semibold transition-colors duration-200 hover:text-primary-800 focus:text-primary-800 dark:hover:text-primary-300 dark:focus:text-primary-300"
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
