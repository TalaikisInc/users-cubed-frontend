import React, { PureComponent } from 'react'
import isemail from 'isemail'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Page from '../../components/page'
import Error from '../../components/error'
import Message from '../../components/message'
import SignupForm from '../../components/signup-form'
import { DESCRIPTIONS } from '../../../config'
import { t } from '../../../translations'
import { signup, setError, setLanguage, getLanguage } from '../../../modules/auth'

class Signup extends PureComponent {
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
    const password = target[1].value
    const tosAgreement = target[3].value === 'true'
    if (isemail.validate(email) && password && password.length > 11 && tosAgreement) {
      this.props.signup({ email, password, tosAgreement })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, signupStatus, loading } = this.props

    return (
      <Page title={t('signup')} description={DESCRIPTIONS.signup} path="/signup">
        { error ? <Error>{error}</Error> : null }
        { signupStatus ? <Message>{t('registered')}<Link to="/confirm">{t('confirm')}</Link>{t('your_account')}</Message>
          : <SignupForm handleSubmit={this.submit} loading={loading} />
        }
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  signupStatus: state.auth.signupStatus,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  signup: (state) => dispatch(signup(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
