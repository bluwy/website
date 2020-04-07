import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Hero from "./hero"
import style from "./header.module.css"

const Header = ({ siteTitle }) => {
  const links = [
    {
      label: `Home`,
      to: `/`
    },
    {
      label: `Projects`,
      to: `/projects`
    },
    {
      label: `Blog`,
      to: `/blog`
    },
    {
      label: `Contact`,
      to: `/contact`
    }
  ]

  return (
    <header className={style.bgBrick}>
      <nav className="text-center">
        <ul className="inline-block">
          {
            links.map(link => (
              <li className="inline-block mx-4 my-2" key={link.label}>
                <Link
                  className="text-xl lg:text-2xl font-cursive text-primary-200 text-glow-primary-500"
                  activeClassName="text-secondary-200 text-glow-secondary-500"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
      <div className="text-center py-6">
        {
          siteTitle
            ? <h1 className="text-4xl lg:text-5xl font-cursive text-primary-200 text-glow-primary-500">{siteTitle}</h1>
            : <Hero />
        }
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
