import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import SigninForm from '../../components/signin-form'
import Error from '../../components/error'
import { DESCRIPTIONS } from '../../../config'
import { signin, setError, setLanguage, getLanguage } from '../../../modules/auth'
import { t } from '../../../translations'

class Signin extends PureComponent {
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
    if (validate(email) && password && password.length > 11) {
      this.props.signin({ email, password })
    } else {
      this.props.setError(t('check_form'))
    }
  }

  render () {
    const { error, isAuthenticated, history, loading } = this.props
    if (isAuthenticated) {
      history.push({ pathname: '/dashboard' })
    }

    return (
      <Page title={t('signin')} description={DESCRIPTIONS.signin} path="/signin">
        { error ? <Error>{error}</Error> : null }
        <SigninForm handleSubmit={this.submit} loading={loading} />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

const mapDispatchToProps = (dispatch) => ({
  signin: (state) => dispatch(signin(state)),
  setError: (state) => dispatch(setError(state)),
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: (state) => dispatch(getLanguage(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
