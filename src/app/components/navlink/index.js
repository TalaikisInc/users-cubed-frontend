import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Button } from 'react-bulma-components'

const isActive = (to, current) => {
  if (to === '/' && current === to) {
    return true
  } else if (to !== '/' && current.includes(to)) {
    return true
  }

  return false
}

const Navlink = ({ link, title, current, primary }) => {
  const button = primary ? <Button rounded color="danger">{ title }</Button> : <Button rounded>{ title }</Button>
  return isActive(link, current) ? null : <Navbar.Item href={link}>{ button }</Navbar.Item>
}

Navlink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  primary: PropTypes.bool
}

export default Navlink
