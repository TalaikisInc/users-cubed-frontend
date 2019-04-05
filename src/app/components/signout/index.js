import React from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'

const logout = () => {
  /*
    if (auth.signedIn()) {
      auth.logout()
      redirect(this.props.res, '/signed-out')
    }
  */
}

export default () => (
  <Navbar.Item>
    <Button rounded onClick={logout}>
      <Icon icon="sign-out-alt" /> Sign Out
    </Button>
  </Navbar.Item>
)
