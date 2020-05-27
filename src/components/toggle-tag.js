import React, { useState } from "react"
import PropTypes from "prop-types"

const ToggleTag = ({ children, initialState, onTrue, onFalse }) => {
  const [state, setState] = useState(initialState || false)

  const toggleState = () => {
    setState(!state)
    state ? onFalse && onFalse() : onTrue && onTrue()
  }

  return (
    <button
      className={state ? `ftag ftag--active` : `ftag ftag--disabled`}
      onClick={toggleState}
    >
      {children}
    </button>
  )
}

ToggleTag.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.bool,
  onTrue: PropTypes.func,
  onFalse: PropTypes.func,
}

export default ToggleTag
