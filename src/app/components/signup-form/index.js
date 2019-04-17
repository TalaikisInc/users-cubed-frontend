import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import InputField from '../input'
import TaCCheckboxField from '../tac-checkbox'
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

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Please repeat the password'
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Passwords should match'
  }

  if (!values.tosAgreement) {
    errors.tosAgreement = 'You should accept the Terms and Conditions'
  }

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const SignupForm = (props) => {
  const { handleSubmit, loading } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={InputField} label="Email" icon="envelope" autoComplete="email" />
      <Field name="password" type="password" component={InputField} label="Password" icon="lock" autoComplete="new-password" />
      <Field name="repeatPassword" type="password" component={InputField} label="Repeat Password" icon="lock" autoComplete="off" />
      <Field name="tosAgreement" component={TaCCheckboxField} />
      <Submit label="Sign Up" loading={loading} />
    </Form>
  )
}

export default reduxForm({ form: 'signup', validate, warn })(SignupForm)
