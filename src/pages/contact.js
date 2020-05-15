import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      allSocialsYaml {
        nodes {
          title
          link
        }
      }
    }
  `)

  const socialLinks = data.allSocialsYaml.nodes

  return (
    <Layout>
      <SEO title="Contact" />
      <div className="container">
        <h1 className="text-center m-0">Find Me</h1>
        <section className="text-center">
          <p>I'm on these few places. Reach me out for any enquiries!</p>
          <div className="space-x-4">
            {socialLinks.map(socialLink => (
              <a
                className="btn"
                href={socialLink.link}
                title={`My ${socialLink.title} profile`}
              >
                {socialLink.title}
              </a>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-center">For Serious Stuff</h2>
          <p className="text-center">
            Need a formal enquiry? No problem. Send a form below.
          </p>
          <div>
            <form
              className="max-w-md mx-auto"
              name="contact"
              method="POST"
              netlify
            >
              <label className="block mb-3" for="name">
                <div>Name</div>
                <input
                  id="name"
                  name="name"
                  className="w-full sm:max-w-xs"
                  type="text"
                  placeholder="Bob Stone"
                  required
                />
              </label>
              <label className="block mb-3" for="question">
                <div>Question</div>
                <input
                  id="question"
                  name="question"
                  className="w-full"
                  type="text"
                  placeholder="What do you...?"
                  required
                />
              </label>
              <label className="block mb-3" for="message">
                <div>Message (optional)</div>
                <textarea
                  id="message"
                  name="message"
                  className="w-full"
                  type="text"
                  rows="4"
                  placeholder="I think that..."
                />
              </label>
              <div className="text-right">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Contact
