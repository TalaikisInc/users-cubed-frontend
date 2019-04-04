import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title }) => (
  <h3>{ title }</h3>
)

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title
