import React from "react"

const Footer = () => (
  <footer className="mt-12">
    <div className="container">
      <hr className="border-t-2 border-primary-700 opacity-50" />
      <div className="flex flex-row flex-wrap justify-center sm:flex-row-reverse sm:justify-between py-8">
        <div className="flex-shrink">
          <a
            className="font-semibold border-b border-black mr-2"
            href="https://reddit.com/user/IamLUG"
            title="My Reddit profile"
          >
            Reddit
          </a>
          <a
            className="font-semibold border-b border-black"
            href="https://github.com/BjornLuG"
            title="My GitHub profile"
          >
            GitHub
          </a>
        </div>
        <div className="flex-shrink">
          &copy; Bjorn Lu {new Date().getFullYear()}
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
