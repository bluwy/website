import React from "react"
import PropTypes from "prop-types"
import ToggleTag from "./toggle-tag"

const ToggleTagSelect = ({ tags, selectedTags, onChange }) => {
  const tagOnTrue = tag => () => {
    if (!selectedTags.includes(tag)) {
      onChange(selectedTags.concat([tag]))
    }
  }

  const tagOnFalse = tag => () => {
    onChange(selectedTags.filter(v => v !== tag))
  }

  return (
    <div>
      {tags.map(tag => (
        <div className="inline-block mr-2 mb-2" key={tag}>
          <ToggleTag onTrue={tagOnTrue(tag)} onFalse={tagOnFalse(tag)}>
            {tag}
          </ToggleTag>
        </div>
      ))}
    </div>
  )
}

ToggleTagSelect.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ToggleTagSelect
