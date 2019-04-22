import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class DateField extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { [this.props.input.name]: this.props.currentUser[this.props.input.name] }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    this.setState({ [this.props.input.name]: e.target.value })
  }

  render () {
    const { input, label, autocomplete, currentUser, meta: { touched, error, warning } } = this.props
    const classes = touched && error ? 'input is-danger' : 'input'
    const disabled = typeof currentUser[input.name] === 'string' && currentUser[input.name].length > 0

    return (
      <div className="field">
        { /* eslint-disable-next-line */ }
        <label className="label" htmlFor="date">{ label }</label>
        <div className="control has-icons-left">
          { disabled ? <input id="date" className={classes} type="date" value={currentUser[input.name]} name={input.name} disabled />
            : <input id="date" className={classes} type="date" placeholder={label} autoComplete={autocomplete} name={input.name} onChange={this.onChange}/> }
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
}

DateField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  autocomplete: PropTypes.string
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(DateField)
