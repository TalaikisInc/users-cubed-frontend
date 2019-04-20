import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import dialCodes from '../../../utils/dialCodes'

class SelectDial extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dialCode: this.props.currentUser.dialCode,
      phone: this.props.currentUser.phone
    }
    this.onChange = this.onChange.bind(this)
  }

  onDial (e) {
    e.preventDefault()
    this.setState({ dialCode: e.target.value })
  }

  onChange (e) {
    e.preventDefault()
    this.setState({ phone: e.target.value })
  }

  render () {
    const list = []
    for (let i = 0; i < dialCodes.length; i++) {
      list.push(<option value={dialCodes[i].dial} key={i}>{dialCodes[i].dial}</option>)
    }
    const { input, label, meta, currentUser } = this.props
    const { touched, error, warning } = meta
    const classes = touched && error ? 'input is-danger' : 'input'
    const selectClasses = touched && error ? 'select is-danger' : 'select'
    const disabledDial = typeof currentUser.dialCode === 'string' && currentUser.dialCode.length > 0
    const disabled = typeof currentUser.phone === 'string' && currentUser.phone.length > 0

    return (
      <div className="field">
        <label className="label">{label }</label>
        <div className="control">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <div className={selectClasses}>
                { disabledDial ? <select name="dialCode" className={selectClasses} value={currentUser.dialCode} disabled>
                  { list }
                </select> : <select name="dialCode" className={selectClasses} value={this.state.dialCode} onChange={this.onDial} autoComplete="tel-country-code">
                  { list }
                </select> }
              </div>
            </div>
            <div className="column is-three-quarters">
              <div className="control">
                { disabled ? <input className={classes} type="tel" placeholder={label} value={currentUser.phone} name='phone' disabled />
                  : <input className={classes} type="tel" placeholder={label} autoComplete="tel-national" name={input.name} onChange={this.onChange} value={this.state.phone} /> }
              </div>
            </div>
          </div>
        </div>
        { touched && (
          (error && <p className="help is-danger">{ error }</p>) ||
          (warning && <p className="help is-warning">{ warning }</p>)
        )}
      </div>
    )
  }
}

SelectDial.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(SelectDial)
