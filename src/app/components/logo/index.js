import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <Link to="/" className="brand no-hover">
    <span style={{ width: 'auto' }} className="p-2 border bd-dark border-radius">
      users<sup>3</sup>
    </span>
  </Link>
)
