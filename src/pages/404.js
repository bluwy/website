import React, { useState } from "react"
import { Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

const NotFoundPage = () => {
  const [currentSentence, nextSentence, noMoreSentence] = useEasterSentence()
  const [clickBuffer, setClickBuffer] = useState(8)

  const clickNextSentence = () => {
    if (clickBuffer > 0) {
      setClickBuffer(v => v - 1)
    } else {
      nextSentence()
    }
  }

  return (
    <Layout>
      <SEO title={noMoreSentence ? `【=◈︿◈=】` : `404`} />
      <div className="container text-center">
        {noMoreSentence ? (
          <>
            <h1 className="mt-20 mb-6 lg:mb-8 text-6xl">【=◈︿◈=】</h1>
            <p>Is anyone there?</p>
            <p>Play.</p>
          </>
        ) : (
          <>
            <h1 className="text-7xl">404</h1>
            {/* eslint-disable-next-line */}
            <p onClick={clickNextSentence}>{currentSentence}</p>
            <p className="markdown">
              Take me <Link to="/">home</Link>.
            </p>
          </>
        )}
      </div>
    </Layout>
  )
}

export default NotFoundPage

function useEasterSentence() {
  const sentences = [
    `There's nothing here. I promise.`,
    `There's really nothing here.`,
    `Nothing to see but an empty void.`,
    `Please go home.`,
    `Why don't you believe me?`,
    `Guess you're very curious, huh?`,
    `You're wasting time.`,
    `What more do you seek?`,
    `The truth? The meaning of life?`,
    `Well, if you insist...`,
    `end`,
  ]

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)

  const currentSentence = sentences[currentSentenceIndex]

  const noMoreSentence = currentSentenceIndex >= sentences.length - 1

  const nextSentence = () => {
    if (currentSentenceIndex + 1 < sentences.length) {
      setCurrentSentenceIndex(v => v + 1)
    }
  }

  return [currentSentence, nextSentence, noMoreSentence]
}
