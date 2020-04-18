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
      <div className="container">
        <div className="flex flex-row flex-no-wrap justify-between items-center">
          <Link className="flex flex-row flex-no-wrap items-center" to="/">
            <img
              className="mr-1"
              src="/logo.svg"
              alt="Bjorn Lu logo"
              style={{ height: "24px" }}
            />
            <span className="font-bold text-lg hidden sm:block">Bjorn Lu</span>
          </Link>
          <ul>
            {navLinks.map(link => (
              <li className="inline-block mx-3 sm:mx-4 my-2" key={link.label}>
                <Link className="text-lg" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
