import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Nav = () => {
  const data = useStaticQuery(graphql`
    query {
      allNavLinksYaml {
        nodes {
          label
          to
        }
      }
    }
  `)

  const navLinks = data.allNavLinksYaml.nodes

  return (
    <nav className="fixed w-full">
      <div className="container text-center">
        <ul className="inline-block">
          {navLinks.map(link => (
            <li className="inline-block mx-3 sm:mx-4 my-2" key={link.label}>
              <Link className="text-lg sm:text-xl" to={link.to}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
