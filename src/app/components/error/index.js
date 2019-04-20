import React from 'react'
import PropTypes from 'prop-types'
import { Notification, Button } from 'react-bulma-components'

const Error = ({ children }) => (
  children ? <Notification color="danger">
    <strong>Error:</strong>  { children }
    <Button remove />
  </Notification>
    : null
)

Error.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]).isRequired
}

export default Error
