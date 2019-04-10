import React, { PureComponent } from 'react'
import { Navbar } from 'react-bulma-components'

import logo from '../../assets/logo.svg'

class Logo extends PureComponent {
  state = {
    open: false
  }

  toggleBurger = () => {

  }

  render () {
    return (
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <img src={logo} alt="BlueBlood Ltd." width="112" height="28" />
        </Navbar.Item>
        <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" onClick={this.toggleBurger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </Navbar.Brand>
    )
  }
}

export default Logo
