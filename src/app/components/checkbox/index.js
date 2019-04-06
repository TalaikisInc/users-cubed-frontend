import React from 'react'
import { Field, Control, Help, Checkbox } from 'react-bulma-components'

export const renderCheckbox = ({ input, meta: { touched, error, warning } }) => (
  <Field>
    <Control>
      <Checkbox {...input} onChange={this.onChange}>
        I agree to the <a href="#terms-of-service">Terms of Service</a>
      </Checkbox>
    </Control>
    { touched && (
      (error && <Help color="danger">{ error }</Help>) ||
      (warning && <Help color="warning">{ warning }</Help>)
    )}
  </Field>
)
