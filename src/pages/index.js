import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/heroes/neon"

const Home = () => {
  const data = useStaticQuery(graphql`
    query {
      allSkillsYaml {
        nodes {
          title
          topics
        }
      }
      allProjectsYaml(limit: 3) {
        nodes {
          desc
          slug
          title
        }
      }
    }
  `)

  const skills = data.allSkillsYaml.nodes
  const projects = data.allProjectsYaml.nodes

  return (
    <Layout>
      <SEO />
      <div className="w-full h-screen overflow-hidden">
        <Hero />
      </div>
      <article className="container mb-12">
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
              className="sm:w-1/3 p-4 m-3 rounded-lg border"
              key={skill.title}
            >
              <div className="font-bold text-xl mb-1">{skill.title}</div>
              <ul>
                {skill.topics.map(topic => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <h2>Projects</h2>
        <div className="flex flex-col sm:flex-row -mx-3">
          {projects.map(project => (
            <Link
              className="sm:w-1/3 p-4 m-3 rounded-lg border"
              key={project.title}
              to={`projects/${project.slug}`}
            >
              <div className="font-bold text-lg mb-1">{project.title}</div>
              <div className="opacity-75">{project.desc}</div>
            </Link>
          ))}
        </div>
      </article>
    </Layout>
  )
}

export default Home
