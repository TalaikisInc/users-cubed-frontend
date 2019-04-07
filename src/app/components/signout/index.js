import React from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'

const signout = () => {
  /*
    if (auth.signedIn()) {
      auth.logout()
      redirect(this.props.res, '/signed-out')
    }
  */
}

const Signout = () => (
  <Navbar.Item>
    <Button rounded onClick={signout}>
      <Icon icon="sign-out-alt" /> Sign Out
    </Button>
  </Navbar.Item>
)

export default Signout
