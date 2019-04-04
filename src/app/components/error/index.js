import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ msg }) => (
  msg.length > 0 ?
    <div className="p-5">
      <div className="mx-auto p-2 bg-red fg-white text-center">
        { msg }
      </div>
    </div>
    : null
)

Error.propTypes = {
  msg: PropTypes.string.isRequired
}

export default Error
