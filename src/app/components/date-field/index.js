import React from 'react'
import PropTypes from 'prop-types'

const DateField = ({ input, label, autocomplete, meta: { touched, error, warning } }) => {
  const classes = touched && error ? 'input is-danger' : 'input'

  return (
    <div className="field">
      <label className="label"> {label }</label>
      <div className="control has-icons-left">
        <input className={classes} type="date" placeholder={label} autoComplete={autocomplete} {...input} />
        <span className="icon is-small is-left">
          <i className="fas fa-calendar-day"></i>
        </span>
      </div>
      { touched && (
        (error && <p className="help is-danger">{ error }</p>) ||
        (warning && <p className="help is-warning">{ warning }</p>)
      )}
    </div>
  )
}

DateField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  autocomplete: PropTypes.string
}

export default DateField
