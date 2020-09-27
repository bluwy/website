import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

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
        <section className="text-center mb-10">
          <p>I'm on these few places. Reach me out for any questions!</p>
          <div className="space-x-4">
            {socialLinks.map(socialLink => (
              <a
                className="btn"
                key={socialLink.title}
                href={socialLink.link}
                title={`My ${socialLink.title} profile`}
              >
                {socialLink.title}
              </a>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-center">Serious Stuff</h2>
          <p className="text-center">
            Need a formal enquiry? No problem. Send a form below.
          </p>
          <div>
            {/* Gatsby strips out input fields that are not included in the JSX form. Why Gatsby? */}
            {/* https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-static-site-generators */}
            <form
              className="max-w-md mx-auto"
              name="contact"
              method="POST"
              action="/thanks"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <div className="flex flex-wrap">
                <label className="mb-3 w-full sm:w-1/2 sm:pr-2">
                  <div className="mb-1">Name</div>
                  <input name="name" className="w-full" type="text" required />
                </label>
                <label className="mb-3 w-full sm:w-1/2 sm:pl-2">
                  <div className="mb-1">Email</div>
                  <input
                    name="email"
                    className="w-full"
                    type="email"
                    required
                  />
                </label>
              </div>
              <label className="block mb-3">
                <div className="mb-1">Subject</div>
                <input name="subject" className="w-full" type="text" required />
              </label>
              <label className="block mb-3">
                <div className="mb-1">Message</div>
                <textarea
                  name="message"
                  className="w-full"
                  type="text"
                  rows="4"
                  required
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
