import React from 'react'
import PropTypes from 'prop-types'

const InputField = ({ input, label, type, icon, meta: { touched, error, warning } }) => {
  const iconClass = `fas fa-${icon}`
  const classes = touched && error ? 'input is-danger' : 'input'

  return (
    <div class="field">
      <label class="label"> {label }</label>
      <div class="control has-icons-left">
        <input class={classes} type={type} placeholder={label} {...input} />
        <span class="icon is-small is-left">
          <i class={iconClass}></i>
        </span>
      </div>
      { touched && (
        (error && <p class="help is-danger">{ error }</p>) ||
        (warning && <p class="help is-warning">{ warning }</p>)
      )}
    </div>
  )
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default InputField
