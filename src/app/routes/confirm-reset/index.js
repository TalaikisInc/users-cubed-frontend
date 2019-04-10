import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmResetForm from '../../components/confirmreset-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'

class ConfirmReset extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const token = target[0].value
    if (token && token.length === 64) {
      api({ action: 'CONFIRM', token: token }, (res) => {
        if (res && res.error) {
          this.props.history.push({
            pathname: '/confirm',
            state: { error: res.error }
          })
        } else if (res && res.status === 'OK.') {
          this.props.history.push({
            pathname: '/confirm',
            state: { done: true, error: false }
          })
        }
      })
    } else {
      this.props.history.push({
        pathname: '/confirm',
        state: { error: 'Please check the form.' }
      })
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { location } = this.props

    return (
      <Page title="Confirm Password Reset" description={DESCRIPTIONS.confirmreset} path="/confirm-reset">
        { location.state && location.state.error ? <Error msg={location.state.error}/> : null }
        { location.state && location.state.done ? <Message>Password reset confirmed, your new password is emailed to you. Please check email and <Link to="/signin">login</Link>.</Message>
          : <ConfirmResetForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

export default ConfirmReset
