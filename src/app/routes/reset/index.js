import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ResetForm from '../../components/reset-form'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { reset, setError, setLanguage, getLanguage } from '../../../modules/auth'

class Reset extends PureComponent {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  componentWillMount () {
    this.props.setError(null)
    const { params } = this.props.match
    if (params.locale) {
      this.props.setLanguage(params.locale)
    } else {
      this.props.getLanguage()
    }
  }

  submit (e) {
    e.preventDefault()
    const { target } = e
    const email = target[0].value
    if (email && isemail.validate(email)) {
      this.props.reset({ email })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, resetStatus, loading } = this.props

    return (
      <Page title={t('reset')} description={DESCRIPTIONS.reset} path="/reset">
        { resetStatus ? <Message>{t('password_reset')}<Link to="/confirm-reset">{t('confirm')}</Link>{t('reset_sent')}</Message>
          : <ResetForm handleSubmit={this.submit} loading={loading} />
        }
        { error ? <Error>{error}</Error> : null }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  resetStatus: state.auth.resetStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  reset: (state) => dispatch(reset(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
