import React, { useEffect, useState } from "react"
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

  const [shrink, setShrink] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShrink(window.scrollY > 0)
    window.addEventListener(`scroll`, handleScroll)
    return () => window.removeEventListener(`scroll`, handleScroll)
  })

  return (
    <nav
      className={[
        "fixed z-30 w-full bg-white h-24 transition-all duration-300 ease-out",
        shrink && "shadow",
      ]
        .filter(Boolean)
        .join(" ")}
      style={shrink ? { height: "60px" } : {}}
    >
      <div className="container h-full">
        <div className="flex flex-row flex-no-wrap justify-between items-center h-full">
          <Link className="flex flex-row flex-no-wrap items-center" to="/">
            <img
              className="mr-1"
              src="/logo.svg"
              alt="Bjorn Lu logo"
              style={{ height: "24px" }}
            />
            <span className="font-semibold text-lg hidden sm:block">
              Bjorn Lu
            </span>
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
