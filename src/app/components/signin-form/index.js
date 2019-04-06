import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import renderInput from '../input'
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

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const SigninForm = (props) => {
  const { handleSubmit, loading } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={renderInput} label="Email" />
      <Field name="password" type="text" component={renderInput} label="Password" />
      <Submit label="Sign In" loading={loading} />
    </form>
  )
}

export default reduxForm({ form: 'signup', validate, warn })(SigninForm)
