import React, { Fragment } from 'react'
import { Navbar } from 'react-bulma-components'

import Logo from '../logo'
import Navlink from '../navlink'
import Signout from '../signout'

export default ({ isAuthenticated, current }) => (
  <Navbar>
    <Logo />
    <Navbar.Menu>
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
    </Navbar.Menu>
  </Navbar>
)
