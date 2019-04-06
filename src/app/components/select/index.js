import React from 'react'
import { Field, Select, Control, Label, Help } from 'react-bulma-components'

export const renderSelect = ({ input, label, meta: { touched, error, warning } }) => (
  <Field>
    <Label>{ label }</Label>
    <Control>
      <Select {...input}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other?</option>
      </Select>
    </Control>
    { touched && (
      (error && <Help color="danger">{ error }</Help>) ||
      (warning && <Help color="warning">{ warning }</Help>)
    )}
  </Field>
)
