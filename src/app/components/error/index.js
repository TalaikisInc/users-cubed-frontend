import React from 'react'
import PropTypes from 'prop-types'
import { Notification, Button } from 'react-bulma-components'

const Error = ({ msg }) => (
  msg.length > 0 ? <Notification color="danger">
    <strong>Error:</strong>  { msg }
    <Button remove />
  </Notification>
    : null
)

Error.propTypes = {
  msg: PropTypes.string.isRequired
}

export default Error
