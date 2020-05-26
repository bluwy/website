import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import style from "./pagination-card.module.css"

const PaginationCard = ({ type, label, to }) => {
  const isPrev = type === `prev`

  return (
    <Link
      className={[
        `block card h-full`,
        style.cardHover,
        isPrev ? `text-left` : `text-right`,
      ].join(` `)}
      to={to}
    >
      <div
        className={`${style.cardHoverHeadline} text-sm font-semibold opacity-70 mb-1`}
      >
        {isPrev ? (
          <>
            <span className={`${style.arrow} ${style.arrowLeft} mr-2`}></span>
            <span>PREVIOUS</span>
          </>
        ) : (
          <>
            <span>NEXT</span>
            <span className={`${style.arrow} ${style.arrowRight} ml-2`}></span>
          </>
        )}
      </div>
      <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {label}
      </div>
    </Link>
  )
}

PaginationCard.propTypes = {
  type: PropTypes.oneOf([`prev`, `next`]),
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default PaginationCard
