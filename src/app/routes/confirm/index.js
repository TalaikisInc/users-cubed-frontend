import React, { PureComponent } from 'react'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmForm from '../../components/confirm-form'
import { DESCRIPTIONS } from '../../../config'
import api from '../../utils/api'

class Confirm extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const token = target[0].value
    if (email && password && tosAgreement) {
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
      <Page title="Confirm" description={DESCRIPTIONS.confirm} path="/confirm">
        { location.state && location.state.error ? <Error msg={location.state.error}/> : null }
        { location.state && location.state.done ? <Message msg='Account confirmed, you can now login.' />
          : <ConfirmForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

export default Confirm
