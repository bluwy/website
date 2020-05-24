import React, { useEffect, useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import style from "./nav.module.css"
import logo from "@/images/logo.svg"

const Nav = () => {
  const data = useStaticQuery(graphql`
    query {
      allNavLinksYaml {
        nodes {
          title
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
      className={[style.nav, shrink && style.navShrink]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container h-full">
        <div className="flex flex-row flex-no-wrap justify-between items-center h-full">
          <Link className="flex flex-row flex-no-wrap items-center" to="/">
            <img
              className="mr-3"
              src={logo}
              alt="Bjorn Lu logo"
              style={{ height: "24px" }}
            />
            <span className="font-semibold text-lg hidden sm:block">
              Bjorn Lu
            </span>
          </Link>
          <ul>
            {navLinks.map(link => (
              <li className="inline-block mx-3 sm:mx-4 my-2" key={link.title}>
                <Link
                  className="text-lg"
                  to={link.to}
                  activeClassName="font-semibold"
                  partiallyActive={true}
                >
                  {link.title}
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
