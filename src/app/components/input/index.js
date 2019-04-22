import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class InputField extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      [this.props.input.name]: this.props.currentUser[this.props.input.name]
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    this.setState({ [this.props.input.name]: e.target.value })
  }

  render () {
    const { input, label, type, icon, autocomplete, currentUser, meta: { touched, error, warning } } = this.props
    const iconClass = `fas fa-${icon}`
    const classes = touched && error ? 'input is-danger' : 'input'
    const disabled = typeof currentUser[input.name] === 'string' && currentUser[input.name].length > 3

    return (
      <div className="field">
        { /* eslint-disable-next-line */ }
        <label className="label" id={input.name}>{ label }</label>
        <div className="control has-icons-left">
          { disabled ? <input id={input.name} className={classes} name={input.name} onChange={this.onChange} type={type} value={this.state[input.name]} placeholder={label} autoComplete={autocomplete} disabled />
            : <input id={input.name} className={classes} name={input.name} onChange={this.onChange} type={type} value={this.state[input.name]} placeholder={label} autoComplete={autocomplete} /> }
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
