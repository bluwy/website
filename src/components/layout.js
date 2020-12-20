import React from "react"
import PropTypes from "prop-types"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faTwitter,
  faReddit,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
import Footer from "./footer"
import Nav from "./nav"
import "./layout.css"

// Setup icons
library.add(faTwitter, faReddit, faLinkedin, faGithub)

const Layout = ({ isHero = false, children }) => (
  <>
    <Nav isHero={isHero} />
    <main className={isHero ? "" : "pt-24"}>{children}</main>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
