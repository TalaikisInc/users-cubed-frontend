import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const isActive = (to, current) => {
  if (to === '/' && current === to) {
    return true
  } else if (to !== '/' && current.includes(to)) {
    return true
  }

  return false
}

const Navlink = ({ link, title, icon, current, primary }) => {
  let classes = primary ? 'button rounded alert' : 'button rounded'
  classes = isActive(link, current) ? classes.concat(' active') : classes

  return (
    <li className="brand no-hover">
      <Link to={link}>
        <button className={classes}><span className={icon}></span> { title }</button>
      </Link>
    </li>
  )
}

Navlink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navlink
