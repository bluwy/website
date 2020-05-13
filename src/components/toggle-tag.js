import React, { useState } from "react"
import PropTypes from "prop-types"

const ToggleTag = ({ className, children, initialState, onTrue, onFalse }) => {
  const [state, setState] = useState(initialState || false)

  const toggleState = () => {
    setState(!state)
    state ? onFalse && onFalse() : onTrue && onTrue()
  }

  return (
    <button
      className={
        state
          ? `${className} tag tag--active`
          : `${className} tag tag--disabled`
      }
      onClick={toggleState}
    >
      {children}
    </button>
  )
}

ToggleTag.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  initialState: PropTypes.bool,
  onTrue: PropTypes.func,
  onFalse: PropTypes.func,
}

export default ToggleTag
