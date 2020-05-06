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
        <section>
          <div className="flex flex-row justify-between max-w-md p-3 mx-auto mt-12 border-4 rounded-lg border-primary-400 bg-primary-500 bg-opacity-25">
            <div className="flex-shrink mr-3">
              <img
                src="/logo.svg"
                alt="Bjorn Lu logo"
                style={{ width: "300px", height: "100%" }}
              />
            </div>
            <div className="flex-shrink">
              <h1 className="text-3xl mt-0">Hello, I'm Bjorn</h1>
              <p>
                A full-stack web developer from Malaysia. Loves open source.
                Writes on various topics of interest. Nice to meet you.
              </p>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <div className="h-16 mx-16 border-l-12 border-r-12 border-primary-600" />
          </div>
        </section>
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
