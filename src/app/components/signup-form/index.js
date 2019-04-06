import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import { renderInput } from '../input'
import { renderCheckbox } from '../checkbox'
import Submit from '../submit'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!isemail.validate(values.username)) {
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
    errors.tosAgreement = 'You should accept the Terms of Service'
  }

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const SignupForm = (props) => {
  const { handleSubmit, disabled } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderInput} label="Email" />
      <Field name="password" type="text" component={renderInput} label="Password" />
      <Field name="repeatPassword" type="text" component={renderInput} label="Repeat Password" />
      <Field name="tosAgreement" component={renderCheckbox} />
      <Submit label="Sign Up" loading={disabled} />
    </form>
  )
}

export default reduxForm({ form: 'signup', validate, warn })(SignupForm)
