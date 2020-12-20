import React from "react"
import PropTypes from "prop-types"
import { config, library } from "@fortawesome/fontawesome-svg-core"
import {
  faTwitter,
  faReddit,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"
import Footer from "./footer"
import Nav from "./nav"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "./layout.css"

// Prevent fontawesome FOUC: https://stackoverflow.com/a/59429852/13265944
config.autoAddCss = false

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
