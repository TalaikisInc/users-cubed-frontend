import React from 'react'
import PropTypes from 'prop-types'

const CheckboxField = ({ input, meta: { touched, error, warning } }) => (
  <div className="field">
    <div className="control">
      <label className="checkbox">
        <input {...input} type="checkbox"/> I agree to the <a href="/terms-of-service">Terms of Service</a>
      </label>
    </div>
    { touched && (
      (error && <p className="help is-danger">{ error }</p>) ||
      (warning && <p className="help is-warning">{ warning }</p>)
    )}
  </div>
)

CheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default CheckboxField
