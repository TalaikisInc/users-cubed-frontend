import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'
import { FacebookLoginButton, GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'

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

const SigninForm = (props) => {
  const { handleSubmit, loading } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={InputField} label="Email" icon="envelope" autoComplete="email" />
      <Field name="password" type="password" component={InputField} label="Password" icon="lock" autoComplete="current-password" />
      <Submit label="Sign In" loading={loading} />
      <FacebookLoginButton onClick={() => this.props.socialSignin('facebook')}>
        <span>Signin with Facebook</span>
      </FacebookLoginButton>
      <GoogleLoginButton onClick={() => this.props.socialSignin('google')}>
        <span>Signin with Google</span>
      </GoogleLoginButton>
      <TwitterLoginButton onClick={() => this.props.socialSignin('twitter')}>
        <span>Signin with Twitter</span>
      </TwitterLoginButton>
    </Form>
  )
}

export default reduxForm({ form: 'signin', validate, warn })(SigninForm)
