import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { Link } from 'react-router-dom'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import ResetForm from '../../components/reset-form'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'
import { reset, setError } from '../../../modules/auth'

class Reset extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    if (email && isemail.validate(email)) {
      this.props.reset({ email })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, status } = this.props

    return (
      <Page title={t('reset')} description={DESCRIPTIONS.reset} path="/reset">
        { error ? <Error msg={error}/> : null }
        { status ? <Message>{t('password_reset')}<Link to="/confirm-reset">{t('confirm')}</Link>{t('reset_sent')}</Message>
          : <ResetForm handleSubmit={this.submit} loading={loading} />
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
  reset: (state) => dispatch(reset(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
