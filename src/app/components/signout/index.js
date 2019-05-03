import React, { PureComponent } from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'
import { connect } from 'react-redux'

import { signoutUser, setError } from '../../../modules/auth'
import history from '../../../utils/history'

class Signout extends PureComponent {
  constructor (props) {
    super(props)
    this.signout = this.signout.bind(this)
  }

  signout () {
    if (this.props.currentUser && this.props.currentUser.email) {
      this.props.signoutUser()
      history.push('/signed-out')
    } else {
      this.props.setError('User is already signed out.')
    }
  }

  render () {
    const { loading } = this.props

    return (
      <Navbar.Item>
        <Button rounded onClick={this.signout} loading={loading}>
          <Icon icon="sign-out-alt" /> Sign Out
        </Button>
      </Navbar.Item>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  signoutUser: () => dispatch(signoutUser()),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
