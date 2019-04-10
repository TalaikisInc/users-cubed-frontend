import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import { setCurrentUser } from '../../../modules/auth'
import SigninForm from '../../components/signin-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'

class Signin extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const password = target[1].value
    if (validate(email) && password && password.length > 11) {
      api({ action: 'TOKEN_CREATE', email: email, password: password }, (res) => {
        if (res && res.error) {
          this.props.history.push({ pathname: '/signin', state: { error: res.error } })
        } else if (res && res.token) {
          this.props.setCurrentUser(res)
          this.props.history.push({ pathname: '/dashboard' })
        }
      })
    } else {
      this.props.history.push({ pathname: '/signin', state: { error: 'Please check the form.' } })
    }
    this.setState({ loading: false })
  }

  render() {
    return (
      <Page title="Signin" description={DESCRIPTIONS.signin} path="/signin">
        <SigninForm handleSubmit={this.submit} loading={this.state.loading} />
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ setCurrentUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signin)
