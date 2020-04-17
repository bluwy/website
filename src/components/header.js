import React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"

const Header = ({ children, title }) => (
  <header>
    <Nav />
    <div className="text-center py-6">
      {title ? (
        <h1 className="text-4xl lg:text-5xl m-0">
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
