import React, { PureComponent } from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'
import { connect } from 'react-redux'

import { signoutUser, setError } from '../../../modules/auth'
import history from '../../utils/history'

class Signout extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { loading: false }
    this.signout = this.signout.bind(this)
  }

  signout () {
    this.setState({ loading: true })
    if (this.props.currentUser && this.props.currentUser.email) {
      this.props.signoutUser()
      history.push('/signed-out')
    } else {
      this.props.setError('User is already signed out.')
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state

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
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  signoutUser: (state) => dispatch(signoutUser(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
