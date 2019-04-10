import React, { PureComponent } from 'react'
import { Navbar, Button, Icon } from 'react-bulma-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signoutUser } from '../../../modules/auth'
import api from '../../utils/api'

class Signout extends PureComponent {
  signout (e) {
    e.preventDefault()

    if (this.props.currentUser && this.props.currentUser.token) {
      api({ action: 'TOKEN_DESTROY', tokenId: this.props.currentUser.token }, (res) => {
        if (res && res.error) {
          this.props.history.push({ pathname: '/signed-out', state: { error: res.error } })
        } else if (res && res.status === 'OK.') {
          this.props.history.push({ pathname: '/signed-out', state: { done: true, error: false } })
        }
      })

      this.props.signoutUser()
      this.props.history.push('/signed-out')
    } else {
      this.props.history.push({ pathname: '/signed-out', state: { error: 'User is already signed out.' } })
    }
  }

  render () {
    return (
      <Navbar.Item>
        <Button rounded onClick={this.signout}>
          <Icon icon="sign-out-alt" /> Sign Out
        </Button>
      </Navbar.Item>
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ signoutUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout)
