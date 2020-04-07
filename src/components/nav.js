import React from "react"
import { Link } from "gatsby"
import navLinks from "../data/nav-links"

const Nav = () => (
  <nav className="text-center">
    <ul className="inline-block">
      {navLinks.map(link => (
        <li className="inline-block mx-3 sm:mx-4 my-2" key={link.label}>
          <Link
            className="text-lg sm:text-xl font-cursive text-primary-200 text-glow-primary-500"
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

export default Nav
