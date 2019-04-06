import React from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button } from 'react-bulma-components'

const Submit = ({ label, loading }) => (
  <Field>
    <Control>
      <Button type="primary" loading={loading}>{ label }</Button>
    </Control>
  </Field>
)

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Submit
