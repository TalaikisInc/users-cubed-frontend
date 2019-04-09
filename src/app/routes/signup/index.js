import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import SignupForm from '../../components/signup-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'
import { signupUser } from '../../../modules/auth'

class Signup extends PureComponent {
  state = {
    loading: false
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const password = target[1].value
    const tosAgreement = target[3].value === 'true'
    if (email && password && tosAgreement) {
      api({ action: 'USER_CREATE', email: email, password: password, tosAgreement: tosAgreement }, (res) => {
        if (res && res.error) {
          this.props.history.push({
            pathname: '/signup',
            state: { error: res.error }
          })
        } else if (res && res.status === 'OK.') {
          this.props.history.push({
            pathname: '/signed',
            state: { done: true, error: false }
          })
        }
      })
    } else {
      this.props.history.push({
        pathname: '/signup',
        state: { error: 'Please check the form.' }
      })
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { location } = this.props

    return (
      <Page title="Signup" description={DESCRIPTIONS.signup} path="/signup">
        { location.state && location.state.error ? <Error msg={location.state.error}/> : null }
        { location.state && location.state.done ? <Message msg='Account registered, please check your email.' />
          : <SignupForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ signupUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)
