import React, { PureComponent, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'
import SelectCountry from '../select-country'
import DeleteForm from '../delete-form'
import SelectDial from '../select-dial'

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
          <Field name="email" type="email" value={currentUser.email} component={InputField} label="Email" icon="envelope" autoComplete="email" />
          <Field name="firstName" type="text" component={InputField} label="First name" icon="file-signature" autoComplete="given-name" />
          <Field name="lastName" type="text" component={InputField} label="Last name" icon="file-signature" autoComplete="family-name" />
          <Field name="dialCode" component={SelectDial} label="Country Code" icon="phone" autoComplete="tel-country-code" />
          <Field name="phone" type="text" component={InputField} label="Phone" icon="phone" autoComplete="tel-national" />
          <Field name="address" type="text" component={InputField} label="Address" icon="address-card" autoComplete="shipping street-address" />
          <Field name="city" type="text" component={InputField} label="City" icon="address-card" autoComplete="shipping locality" />
          <Field name="zip" type="text" component={InputField} label="Postal Code / ZIP" icon="address-card" autoComplete="shipping postal-code" />
          <Field name="country" type="text" component={SelectCountry} label="Country" icon="globe" autoComplete="shipping country" />
          <Field name="password" type="password" component={InputField} label="Password" icon="lock" autoComplete="off" />
          <Submit label="Submit" loading={loading} />
        </Form>
        <hr />
        <DeleteForm />
      </Fragment>
    )
  }
}

export default reduxForm({ form: 'profile-edit', validate, warn })(ProfileEditForm)
