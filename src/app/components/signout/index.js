import React, { PureComponent } from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'
import { connect } from 'react-redux'

import { signoutUser, setError } from '../../../modules/auth'

class Signout extends PureComponent {
  signout (e) {
    e.preventDefault()
    if (this.props.currentUser && this.props.currentUser.token) {
      this.props.signoutUser()
      this.props.history.push('/signed-out')
    } else {
      this.props.setError('User is already signed out.')
    }
  }

  render () {
    return (
      <Navbar.Item>
        <Button rounded onClick={() => this.signout}>
          <Icon icon="sign-out-alt" /> Sign Out
        </Button>
      </Navbar.Item>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  signoutUser: (state) => dispatch(signoutUser(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
