import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { validate } from 'isemail'

import Page from '../../components/page'
import SigninForm from '../../components/signin-form'
import Error from '../../components/error'
import { DESCRIPTIONS } from '../../../config'
import { signin, setError } from '../../../modules/auth'
import { t, setLocale } from '../../translations'

class Signin extends PureComponent {
  state = { loading: false }

  submit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { target } = e
    const email = target[0].value
    const password = target[1].value
    if (validate(email) && password && password.length > 11) {
      this.props.signin({ email, password })
    } else {
      this.props.setError(t('check_form'))
    }
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    const { error, isAuthenticated, history } = this.props
    if (isAuthenticated) {
      history.push({ pathname: '/dashboard' })
    }

    return (
      <Page title={t('signin')} description={DESCRIPTIONS.signin} path="/signin">
        { error ? <Error msg={error}/> : null }
        <SigninForm handleSubmit={this.submit} loading={loading} />
      </Page>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  signin: (state) => dispatch(signin(state)),
  setError: (state) => dispatch(setError(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
