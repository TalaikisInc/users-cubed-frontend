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
    this.onDial = this.onDial.bind(this)
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
    dialCodes.sort((a, b) => {
      return a.dial - b.dial
    })
    for (let i = 0; i < dialCodes.length; i++) {
      // eslint-disable-next-line
      list.push(<option value={dialCodes[i].dial} key={i}>{dialCodes[i].dial}</option>)
    }
    const { input, label, meta, currentUser } = this.props
    const { touched, error, warning } = meta
    const classes = touched && error ? 'input is-danger' : 'input'
    const selectClasses = touched && error ? 'select is-danger' : 'select'
    currentUser[input.name] = typeof currentUser[input.name] !== 'boolean' ? currentUser[input.name] : ''

    return (
      <div className="field">
        { /* eslint-disable-next-line */ }
        <label className="label" htmlFor="phone">{label }</label>
        <div className="control">
          <div className="columns is-gapless">
            <div className="column is-one-quarter">
              <div className={selectClasses}>
                <select name="dialCode" className={selectClasses} value={this.state.dialCode || currentUser.dialCode} onBlur={this.onDial} onChange={this.onDial} autoComplete="tel-country-code">
                  { list }
                </select>
              </div>
            </div>
            <div className="column is-three-quarters">
              <div className="control">
                <input id="phone" className={classes} type="tel" placeholder={label} autoComplete="tel-national" name={input.name} onBlur={this.onChange} value={this.state.phone || currentUser.phone} />
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
