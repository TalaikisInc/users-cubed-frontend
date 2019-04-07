import React from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import InputField from '../input'
import TextareaField from '../textarea'
import Submit from '../submit'
import Form from '../form'

const validate = (values) => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!isemail.validate(values.email)) {
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
  const { handleSubmit, loading } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="name" type="text" component={InputField} label="Name" icon="user" />
      <Field name="email" type="email" component={InputField} label="Email" icon="envelope" />
      <Field name="message" component={TextareaField} label="Message" />
      <Submit label="Send" loading={loading} />
    </Form>
  )
}

export default reduxForm({ form: 'contact', validate, warn })(ContactForm)
