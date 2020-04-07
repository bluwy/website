import React from "react"
import style from "./hero.module.css"

const Hero = () => {
  return (
    <div class="inline-block">
      <div class={style.hero}>
        <div class={style.heroCircle1} />
        <div class={style.heroCircle2} />
        <div class={style.heroText}>
          <div class={style.heroTextHello}>
            Hello, I'm
        </div>
          <div class={style.heroTextName} data-name="Bjorn Lu">
            Bjorn Lu
        </div>
          <div class={style.heroTextWelcome}>
            Welcome
        </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
