import React, { PureComponent, Fragment } from 'react'
import { Navbar } from 'react-bulma-components'
import PropTypes from 'prop-types'

import Logo from '../logo'
import Navlink from '../navlink'
import Signout from '../signout'
import MobileMenu from '../mobile-menu'

class Header extends PureComponent {
  render () {
    const { isAuthenticated, current } = this.props

    return (
      <Fragment>
        <Navbar>
          <Logo />
          <div className="navbar-menu">
            <Navbar.Container>
              <Navbar.Item href="/products">Products</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end">
              { !isAuthenticated ? <Fragment>
                <Navlink link="/signin" title="Sign In" current={current} />
                <Navlink link="/signup" title="Sign Up" current={current} primary />
              </Fragment>
                : <Fragment>
                  <Navlink link="/dashboard" title="Dashboard" current={current} />
                  <Signout />
                </Fragment>
              }
            </Navbar.Container>
          </div>
        </Navbar>
        <MobileMenu />
      </Fragment>
    )
  }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  current: PropTypes.string.isRequired
}

export default Header
