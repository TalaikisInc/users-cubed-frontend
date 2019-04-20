import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Signout from '../signout'
import { isServer } from '../../../store'

class MobileMenu extends PureComponent {
  render () {
    const { isAuthenticated, burger } = this.props

    return (
      burger && !isServer && window.innerWidth < 800 ? <ul className="menu-list">
        <li><Link to="/products">Products</Link></li>
        { !isAuthenticated ? <Fragment>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </Fragment>
          : <Fragment>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Signout /></li>
          </Fragment>
        }
      </ul>
        : null
    )
  }
}

const mapStateToProps = (state) => ({
  burger: state.auth.burger,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(MobileMenu)
