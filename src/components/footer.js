import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allSocialsYaml {
        nodes {
          title
          link
          icon
        }
      }
    }
  `)

  const socialLinks = data.allSocialsYaml.nodes

  return (
    <footer className="mt-12">
      <div className="container">
        <hr className="border-t-2 border-primary-700 opacity-50" />
        <div className="flex flex-col sm:flex-row-reverse justify-between py-8 text-center sm:text-left sm:items-center">
          <div className="flex-shrink space-x-4 text-2xl mb-3 sm:mb-0">
            {socialLinks.map(socialLink => (
              <a
                className="opacity-80 transition-colors duration-200 hover:text-primary-800 focus:text-primary-800 hover:opacity-100 focus:opacity-100 dark:hover:text-primary-300 dark:focus:text-primary-300"
                key={socialLink.title}
                href={socialLink.link}
                title={`My ${socialLink.title} profile`}
              >
                <FontAwesomeIcon icon={socialLink.icon} />
              </a>
            ))}
          </div>
          <div className="flex-shrink">
            &copy; Bjorn Lu {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
