import React from "react"
import style from "./footer.module.css"

const Footer = () => (
  <footer className={style.bgBrick}>
    <div className="text-center pt-3 pb-4 text-4xl font-cursive text-primary-200 text-glow-primary-500">
      neon <span className="text-3xl">2020</span>
    </div>
  </footer>
)

export default Footer
