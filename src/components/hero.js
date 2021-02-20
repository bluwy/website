import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from "./hero.module.css"

const HeroImage = () => {
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
      <div className={"text-3xl space-x-12 " + style.socialIconGroup}>
        {socialLinks.map(socialLink => (
          <a
            key={socialLink.title}
            href={socialLink.link}
            title={`My ${socialLink.title} profile`}
          >
            <FontAwesomeIcon
              className={style.socialIcon}
              icon={socialLink.icon}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

const HeroTitleArrow = ({ className }) => (
  <svg
    className={className}
    width="70"
    height="120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 20 L20 60 L50 100"
      strokeWidth="15"
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HeroTitle = ({ children }) => (
  <div className="flex justify-center">
    <div className="relative">
      <div className={"hidden sm:flex " + style.heroTitleArrowLeft}>
        <HeroTitleArrow className={style.arrow1} />
        <HeroTitleArrow className={style.arrow2} />
      </div>
      <div>{children}</div>
      <div className={"hidden sm:flex " + style.heroTitleArrowRight}>
        <HeroTitleArrow className={style.arrow1} />
        <HeroTitleArrow className={style.arrow2} />
      </div>
    </div>
  </div>
)

export const Hero = () => (
  <>
    <section className="w-screen h-screen bg-gray-900">
      <HeroImage />
    </section>
    <section className="border-t-6 border-b-6 py-8 text-gray-100 border-primary-900 bg-gray-800 bg-opacity-90">
      <HeroTitle>
        <div className="text-center">
          <h1 className="text-3xl m-0 mb-1">Hey There!</h1>
          <p>
            I'm a full-stack web developer.
            <br />
            Writes on various topics of interest.
            <br />
            Loves open source.
          </p>
        </div>
      </HeroTitle>
    </section>
  </>
)

export default Hero
