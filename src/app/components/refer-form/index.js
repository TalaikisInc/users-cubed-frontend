import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

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

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const ReferForm = (props) => {
  const { handleSubmit, loading } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={InputField} label="Email" icon="envelope" autoComplete="email" />
      <Submit label="Send" loading={loading} />
    </Form>
  )
}

export default reduxForm({ form: 'contact', validate, warn })(ReferForm)
