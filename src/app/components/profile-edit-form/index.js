import React, { PureComponent, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'
import SelectCountry from '../select-country'
import DeleteForm from '../delete-form'

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
      <Fragment>
        <Form onSubmit={handleSubmit}>
          <Field name="email" type="email" value={currentUser.email} component={InputField} label="Email" icon="envelope" />
          <Field name="firstName" type="text" component={InputField} label="First name" icon="file-signature" />
          <Field name="lastName" type="text" component={InputField} label="Last name" icon="file-signature" />
          <Field name="phone" type="text" component={InputField} label="Phone" icon="phone" />
          <Field name="address" type="text" component={InputField} label="Address" icon="address-card" />
          <Field name="city" type="text" component={InputField} label="City" icon="address-card" />
          <Field name="country" type="text" component={SelectCountry} label="Country" icon="address-card" />
          <Field name="password" type="password" component={InputField} label="Password" icon="lock" />
          <Submit label="Submit" loading={loading} />
        </Form>
        <hr />
        <DeleteForm />
      </Fragment>
    )
  }
}

export default reduxForm({ form: 'profile-edit', validate, warn })(ProfileEditForm)
