import React from 'react'
import PropTypes from 'prop-types'

const TextareaField = ({ input, label, meta: { touched, error, warning } }) => (
  <div class="field">
    <div class="label">{ label }</div>
    <div class="control">
      <textarea class="textarea" placeholder={label} {...input}></textarea>
    </div>
    { touched && (
      (error && <p class="help is-danger">{ error }</p>) ||
      (warning && <p class="help is-warning">{ warning }</p>)
    )}
  </div>
)

TextareaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
}

export default TextareaField
