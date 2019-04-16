import React, { PureComponent } from 'react'
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

class ProfileEditForm extends PureComponent {
  render () {
    const { handleSubmit, loading, currentUser } = this.props

    return (
      <Form onSubmit={handleSubmit}>
        <Field name="email" type="email" value={currentUser.email} component={InputField} label="Email" icon="envelope" />
        <Field name="firstName" type="text" component={InputField} label="First name" icon="envelope" />
        <Field name="lastName" type="text" component={InputField} label="Last name" icon="envelope" />
        <Field name="phone" type="text" component={InputField} label="Phone" icon="envelope" />
        <Field name="address" type="text" component={InputField} label="Phone" icon="envelope" />
        <Field name="city" type="text" component={InputField} label="Phone" icon="envelope" />
        <Field name="country" type="text" component={InputField} label="Phone" icon="envelope" />
        <Field name="password" type="password" component={InputField} label="Password" icon="lock" />
        <Submit label="Reset" loading={loading} />
      </Form>
    )
  }
}

export default reduxForm({ form: 'profile-edit', validate, warn })(ProfileEditForm)
