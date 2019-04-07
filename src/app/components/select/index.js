import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="field">
    <div className="label">{ label }</div>
    <div className="control">
      <div className="select">
        <select {...input}>
          <option value="0">Select dropdown</option>
          <option value="1">With options</option>
        </select>
      </div>
    </div>
    { touched && (
      (error && <p className="help is-danger">{ error }</p>) ||
      (warning && <p className="help is-warning">{ warning }</p>)
    )}
  </div>
)

SelectField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default SelectField
