import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import { renderInput } from '../input'
import { renderTextarea } from '../textarea'
import Submit from '../submit'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!isemail.validate(values.username)) {
    errors.email = 'Invalid email'
  }

  if (!values.name) {
    errors.name = 'Name is required'
  } else if (values.name.length < 3) {
    errors.name = 'Invalid name'
  }

  if (!values.message) {
    errors.message = 'Message is required'
  } else if (values.message.length < 50) {
    errors.message = 'Invalid message'
  }

  return errors
}

const warn = (values) => {
  const warnings = {}
  return warnings
}

const ContactForm = (props) => {
  const { handleSubmit, disabled } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderInput} label="Name" />
      <Field name="email" type="email" component={renderInput} label="Email" />
      <Field name="message" component={renderTextarea} label="Message" />
      <Submit label="Send" loading={disabled} />
    </form>
  )
}

export default reduxForm({ form: 'signup', validate, warn })(ContactForm)
