import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ResetForm from '../../components/reset-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'

class Reset extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    if (email && isemail.validate(email)) {
      api({ action: 'RESET_CREATE', email: email }, (res) => {
        if (res && res.error) {
          this.props.history.push({
            pathname: '/reset',
            state: { error: res.error }
          })
        } else if (res && res.status === 'OK.') {
          this.props.history.push({
            pathname: '/reset',
            state: { done: true, error: false }
          })
        }
      })
    } else {
      this.props.history.push({
        pathname: '/reset',
        state: { error: 'Please check the form.' }
      })
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { location } = this.props

    return (
      <Page title="Reset Password" description={DESCRIPTIONS.reset} path="/reset">
        { location.state && location.state.error ? <Error msg={location.state.error}/> : null }
        { location.state && location.state.done ? <Message>Password is reset. Email asking to <Link to="/confirm-reset">confirm</Link> the password reset is sent to you.</Message>
          : <ResetForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

export default Reset
