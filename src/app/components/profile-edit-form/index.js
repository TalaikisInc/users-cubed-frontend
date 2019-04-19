import React, { PureComponent, Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import isemail from 'isemail'

import InputField from '../input'
import Submit from '../submit'
import Form from '../form'
import SelectCountry from '../select-country'
import DeleteForm from '../delete-form'
import SelectDial from '../select-dial'
import DateField from '../date-field'

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
    const { handleSubmit, loading } = this.props

    return (
      <Fragment>
        <Form onSubmit={handleSubmit}>
          <Field name="email" type="email" component={InputField} label="Email" icon="envelope" autoComplete="email" />
          <Field name="firstName" type="text" component={InputField} label="First name" icon="file-signature" autoComplete="given-name" />
          <Field name="lastName" type="text" component={InputField} label="Last name" icon="file-signature" autoComplete="family-name" />
          <Field name="dob" component={DateField} label="Date of Birth" autoComplete="birthday" />
          <Field name="phone" component={SelectDial} label="Phone" />
          <Field name="address" type="text" component={InputField} label="Address" icon="address-card" autoComplete="shipping street-address" />
          <Field name="city" type="text" component={InputField} label="City" icon="address-card" autoComplete="shipping locality" />
          <Field name="zipCode" type="text" component={InputField} label="Postal Code / ZIP" icon="address-card" autoComplete="shipping postal-code" />
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
