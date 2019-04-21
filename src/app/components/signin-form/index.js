import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons'
import { connect } from 'react-redux'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'
import { socialSignin } from '../../../modules/auth'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!isemail.validate(values.email)) {
    errors.email = 'Invalid email'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 12) {
    errors.password = 'Password should be more than 11 characters'
  }

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

let SigninForm = (props) => {
  const { handleSubmit, loading, socialSignin } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={InputField} label="Email" icon="envelope" autoComplete="email" />
      <Field name="password" type="password" component={InputField} label="Password" icon="lock" autoComplete="current-password" />
      <Submit label="Sign In" loading={loading} />
      <FacebookLoginButton onClick={() => socialSignin('facebook')}>
        <span>Signin with Facebook</span>
      </FacebookLoginButton>
      <GoogleLoginButton onClick={() => socialSignin('google')}>
        <span>Signin with Google</span>
      </GoogleLoginButton>
      <TwitterLoginButton onClick={() => socialSignin('twitter')}>
        <span>Signin with Twitter</span>
      </TwitterLoginButton>
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  socialSignin: (state) => dispatch(socialSignin(state))
})

SigninForm = connect(null, mapDispatchToProps)(SigninForm)

export default reduxForm({ form: 'signin', validate, warn })(SigninForm)
