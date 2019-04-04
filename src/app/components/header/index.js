import React, { Fragment } from 'react'

import Logo from '../logo'
import Navlink from '../navlink'
import Signout from '../signout'

export default ({ isAuthenticated, current }) => (
  <header>
    <nav>
      <div data-role="appbar" data-expand-point="md">
        <Logo />
        <div className="p-2 cell-2 offset-10">
          <div>
            <ul className="app-bar-menu">
              { !isAuthenticated ? <Fragment>
                <Navlink link="/signin" title="Sign In" icon="mif-enter" current={current} />
                <Navlink link="/signup" title="Sign Up" icon="mif-switch" current={current} primary />
              </Fragment>
                : <Fragment>
                  <Navlink link="/dashboard" title="" icon="mif-users" current={current} />
                  <Signout />
                </Fragment>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
)
