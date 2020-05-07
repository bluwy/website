import React from "react"
import PropTypes from "prop-types"
import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"

const Layout = ({ children }) => (
  <>
    <Nav />
    <main className="pt-24">{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
