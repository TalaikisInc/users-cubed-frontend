import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TaCCheckboxField extends PureComponent {
  render () {
    const { touched, error, warning, input } = this.props

    return (
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input {...input} type="checkbox"/> I agree to the <a href="/terms-and-conditions" target="_blank">Terms and Conditions</a>
          </label>
        </div>
        { touched && (
          (error && <p className="help is-danger">{ error }</p>) ||
          (warning && <p className="help is-warning">{ warning }</p>)
        )}
      </div>
    )
  }
}

TaCCheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

export default TaCCheckboxField
