import React, { PureComponent } from 'react'
import { Navbar } from 'react-bulma-components'

class Logo extends PureComponent {
  state = {
    open: false
  }

  render () {
    return (
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28" />
        </Navbar.Item>
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </Navbar.Brand>
    )
  }
}

export default Logo
