import React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"
import Hero from "./hero"
import style from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={style.bgBrick}>
    <Nav />
    <div className="text-center py-6">
      {siteTitle ? (
        <h1 className="text-4xl lg:text-5xl font-cursive text-primary-200 text-glow-primary-500">
          {siteTitle}
        </h1>
      ) : (
        <Hero />
      )}
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
