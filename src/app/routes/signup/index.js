import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import SignupForm from '../../components/signup-form'
import { DESCRIPTIONS } from '../../../config'
import { t, setLocale } from '../../translations'
import { signup, setError } from '../../../modules/auth'

class Signup extends PureComponent {
  state = { loading: false }

  componentWillMount () {
    const { params } = this.props.match
    if (params.locale) {
      setLocale(params.locale)
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const password = target[1].value
    const tosAgreement = target[3].value === 'true'
    if (isemail.validate(email) && password && password.length > 11 && tosAgreement) {
      this.props.signup({ email, password, tosAgreement })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    const { error, signupStatus } = this.props

    return (
      <Page title={t('signup')} description={DESCRIPTIONS.signup} path="/signup">
        { error ? <Error msg={error}/> : null }
        { signupStatus ? <Message>{t('registered')}<Link to="/confirm">{t('confirm')}</Link>{t('your_account')}</Message>
          : <SignupForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  signupStatus: state.auth.signupStatus
})

const mapDispatchToProps = (dispatch) => ({
  signup: (state) => dispatch(signup(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
