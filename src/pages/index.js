import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      allSkillsYaml {
        nodes {
          title
          topics
        }
      }
    }
  `)

  const skills = data.allSkillsYaml.nodes

  return (
    <Layout>
      <SEO />
      <article className="container">
        <h1>Hello</h1>
        <p>
          I'm Bjorn Lu, a full-stack web developer from Malaysia who enjoys
          problem-solving and creative-thinking.
        </p>
        <h2>Skills</h2>
        <p>
          A picked up many skills in various area of development during my
          programming journey. Here's what I know so far!
        </p>
        <div className="flex flex-col sm:flex-row -mx-3">
          {skills.map(skill => (
            <section
              className="sm:w-1/3 p-4 m-3 rounded-lg border border-primary-200 box-glow-full-primary-500"
              key={skill.title}
            >
              <div className="font-bold text-primary-300 text-xl mb-1">
                {skill.title}
              </div>
              <ul>
                {skill.topics.map(topic => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </Layout>
  )
}

export default Home
