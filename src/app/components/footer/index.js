import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Footer = ({ company }) => {
  return (
    <footer>
      <div className="p-10 cell-4 offset-4">
        <div>
          <p className="text-secondary text-center">&copy; { new Date().getFullYear() }, <Link to="/">{ company }</Link></p>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  company: PropTypes.string.isRequired
}

export default Footer
