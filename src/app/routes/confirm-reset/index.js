import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmResetForm from '../../components/confirmreset-form'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'
import { confirmReset, setError } from '../../../modules/auth'

class ConfirmReset extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const token = target[0].value
    if (token && token.length === 64) {
      this.props.confirmReset({ token })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, status } = this.props

    return (
      <Page title={t('confirm_reset')} description={DESCRIPTIONS.confirmreset} path="/confirm-reset">
        { error ? <Error msg={error}/> : null }
        { status ? <Message>{t('reset_confirmed')}<Link to="/signin">{t('signin')}</Link>.</Message>
          : <ConfirmResetForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  status: state.auth.status
})

const mapDispatchToProps = (dispatch) => ({
  confirmReset: (state) => dispatch(confirmReset(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReset)
