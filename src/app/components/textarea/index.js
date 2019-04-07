import React from 'react'
import PropTypes from 'prop-types'

const TextareaField = ({ input, label, meta: { touched, error, warning } }) => (
  <div className="field">
    <div className="label">{ label }</div>
    <div className="control">
      <textarea className="textarea" placeholder={label} {...input}></textarea>
    </div>
    { touched && (
      (error && <p className="help is-danger">{ error }</p>) ||
      (warning && <p className="help is-warning">{ warning }</p>)
    )}
  </div>
)

TextareaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default TextareaField
