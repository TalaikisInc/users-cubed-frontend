import React from 'react'
import { Field, Textarea, Control, Label, Help } from 'react-bulma-components'

const renderTextarea = ({ input, label, meta: { touched, error, warning } }) => (
  <Field>
    <Label>{ label }</Label>
    <Control>
      <Textarea {...input} onChange={this.onChange} placeholder={label} />
    </Control>
    { touched && (
      (error && <Help color="danger">{ error }</Help>) ||
      (warning && <Help color="warning">{ warning }</Help>)
    )}
  </Field>
)

export default renderTextarea
