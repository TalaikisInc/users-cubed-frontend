import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ input, label, meta: { touched, error, warning } }) => (
  <div class="field">
    <div class="label">{ label }</div>
    <div class="control">
      <div class="select">
        <select {...input}>
          <option value="0">Select dropdown</option>
          <option value="1">With options</option>
        </select>
      </div>
    </div>
    { touched && (
      (error && <p class="help is-danger">{ error }</p>) ||
      (warning && <p class="help is-warning">{ warning }</p>)
    )}
  </div>
)

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default SelectField
