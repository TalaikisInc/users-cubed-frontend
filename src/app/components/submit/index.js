import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button } from 'react-bulma-components'

const Submit = ({ label }) => (
  <Field kind="group">
    <Control>
      <Button type="primary">{ label }</Button>
    </Control>
  </Field>
)

Submit.propTypes = {
  label: PropTypes.string.isRequired
}

export default Submit
