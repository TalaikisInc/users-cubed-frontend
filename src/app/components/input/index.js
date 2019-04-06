import React from 'react'
import { Field, Input, Control, Label, Help } from 'react-bulma-components'

const renderInput = ({ input, label, type, meta: { touched, error, warning } }) => (
  <Field>
    <Label>{label}</Label>
    <Control>
      <Input {...input} placeholder={label} type={type} />
    </Control>
    { touched && (
      (error && <Help color="danger">{ error }</Help>) ||
      (warning && <Help color="warning">{ warning }</Help>)
    )}
  </Field>
)

export default renderInput
