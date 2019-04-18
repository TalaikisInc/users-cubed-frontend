import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const InputField = ({ input, label, type, icon, autocomplete, currentUser, meta: { touched, error, warning } }) => {
  const iconClass = `fas fa-${icon}`
  const classes = touched && error ? 'input is-danger' : 'input'

  return (
    <div className="field">
      <label className="label"> {label }</label>
      <div className="control has-icons-left">
        <input className={classes} name={input.name} onChange={input.onChange} type={type} value={currentUser[input.name]} placeholder={label} autoComplete={autocomplete} />
        <span className="icon is-small is-left">
          <i className={iconClass}></i>
        </span>
      </div>
      { touched && (
        (error && <p className="help is-danger">{ error }</p>) ||
        (warning && <p className="help is-warning">{ warning }</p>)
      )}
    </div>
  )
}

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.string,
  autocomplete: PropTypes.string
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(InputField)
