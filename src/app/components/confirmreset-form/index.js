import React from 'react'
import { Field, reduxForm } from 'redux-form'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'

const validate = (values) => {
  const errors = {}
  if (!values.token) {
    errors.token = 'Password reset token is required'
  } else if (values.token.length !== 64) {
    errors.token = 'Invalid password reset token'
  }

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const ConfirmResetForm = (props) => {
  const { handleSubmit, loading } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="token" type="text" component={InputField} label="Token" icon="check" />
      <Submit label="Confirm" loading={loading} />
    </Form>
  )
}

export default reduxForm({ form: 'confirmReset', validate, warn })(ConfirmResetForm)
