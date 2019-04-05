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
        <Navbar.Burger active={this.state.open} onClick={() => {
          this.setState({ open: !this.state.open })
        }} />
      </Navbar.Brand>
    )
  }
}

export default Logo
