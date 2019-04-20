import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ConfirmResetForm from '../../components/confirmreset-form'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { confirmReset, setError, setLanguage, getLanguage } from '../../../modules/auth'

class ConfirmReset extends PureComponent {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    const token = params.token
    if (token && token.length === 64) {
      this.props.confirmReset({ token })
    }

    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  submit (e) {
    e.preventDefault()
    const { target } = e
    const token = target[0].value
    if (token && token.length === 64) {
      this.props.confirmReset({ token })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, confirmResetStatus, loading } = this.props

    return (
      <Page title={t('confirm_reset')} description={DESCRIPTIONS.confirmreset} path="/confirm-reset">
        { confirmResetStatus ? <Message>{t('reset_confirmed')}<Link to="/signin">{t('signin')}</Link>.</Message>
          : <ConfirmResetForm handleSubmit={this.submit} loading={loading} />
        }
        { error ? <Error>{error}</Error> : null }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  confirmResetStatus: state.auth.confirmResetStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  confirmReset: (state) => dispatch(confirmReset(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmReset)
