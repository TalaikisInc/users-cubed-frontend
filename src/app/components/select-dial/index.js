import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import dialCodes from '../../utils/dialCodes'

class SelectDial extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { dial: '+44' }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    const dial = e.target.value
    this.setState({ dial })
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

    return (
      <div className="field">
        <label className="label">{label }</label>
        <div className="control">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <div className={selectClasses}>
                <select name="dialCode" className={selectClasses} value={this.state.dial} onChange={this.onChange} autoComplete="tel-country-code">
                  { list }
                </select>
              </div>
            </div>
            <div className="column is-three-quarters">
              <div className="control">
                <input className={classes} type="tel" placeholder={label} autoComplete="tel-national" onChange={input.onChange} value={input.value} />
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

export default SelectDial
