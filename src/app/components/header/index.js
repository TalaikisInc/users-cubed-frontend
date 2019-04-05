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
          <Navlink link="/signin" title="Sign In" icon="sign-in-alt" current={current} />
          <Navlink link="/signup" title="Sign Up" icon="sign-out-alt" current={current} primary />
        </Fragment>
          : <Fragment>
            <Navlink link="/dashboard" title="" icon="user" current={current} />
            <Signout />
          </Fragment>
        }
      </Navbar.Container>
    </Navbar.Menu>
  </Navbar>
)
