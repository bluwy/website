import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./hero.module.css"

export const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      allSocialsYaml {
        nodes {
          title
          link
          icon
        }
      }
    }
  `)

  const socialLinks = data.allSocialsYaml.nodes

  return (
    <div className={style.background}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Pacifico&display=swap"
        />
      </Helmet>
      <div className={style.hero}>
        <div className={style.heroCircle1}></div>
        <div className={style.heroCircle2}></div>
        <div className={style.heroText}>
          <div className={style.heroTextHello}>Hello, I'm</div>
          <div className={style.heroTextName} data-name="Bjorn Lu">
            Bjorn Lu
          </div>
          <div className={style.heroTextWelcome}>Welcome</div>
        </div>
      </div>
      <div className="absolute bottom-0 mb-8">
        <div className="space-x-12">
          {socialLinks.map(socialLink => (
            <a
            className="text-3xl"
              key={socialLink.title}
              href={socialLink.link}
              title={`My ${socialLink.title} profile`}
            >
              <FontAwesomeIcon className={style.socialIcon}  icon={socialLink.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

const HeroTitleArrow = () => (
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <path
      className={style.arrow1}
      d="M90 60 L60 100 L90 140"
      strokeWidth="15"
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className={style.arrow2}
      d="M140 60 L110 100 L140 140"
      strokeWidth="15"
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const HeroTitle = ({ children }) => (
  <div className="flex justify-center">
    <div className="relative">
      <div className={"hidden sm:block " + style.heroTitleArrowLeft}>
        <HeroTitleArrow />
      </div>
      <div>{children}</div>
      <div className={"hidden sm:block " + style.heroTitleArrowRight}>
        <HeroTitleArrow />
      </div>
    </div>
  </div>
)
