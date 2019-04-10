import React from 'react'
import PropTypes from 'prop-types'
import { Notification, Button } from 'react-bulma-components'

const Message = ({ children }) => (
  children ? <Notification color="success">
    { children }
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

export default Message
