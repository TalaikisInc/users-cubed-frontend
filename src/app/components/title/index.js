import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'react-bulma-components'

const Title = ({ title, subtitle }) => (
  <Fragment>
    <Heading size={5}>{ title }</Heading>
    <Heading subtitle renderAs="p">
      { subtitle }
    </Heading>
  </Fragment>
)

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default Title
