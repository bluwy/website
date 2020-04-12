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
    <nav className="text-center">
      <ul className="inline-block">
        {navLinks.map(link => (
          <li className="inline-block mx-3 sm:mx-4 my-2" key={link.label}>
            <Link
              className="text-lg sm:text-xl font-cursive text-primary-200 text-glow-primary-500-xs"
              activeClassName="text-secondary-200 text-glow-secondary-500"
              to={link.to}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
