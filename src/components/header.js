import React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"
import style from "./header.module.css"

const Header = ({ children, title }) => (
  <header className={style.bgBrick}>
    <Nav />
    <div className="text-center py-6">
      {title ? (
        <h1 className="text-4xl lg:text-5xl m-0 font-cursive text-primary-200 text-glow-primary-500-sm">
          {title}
        </h1>
      ) : (
        children
      )}
    </div>
  </header>
)

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default Header
