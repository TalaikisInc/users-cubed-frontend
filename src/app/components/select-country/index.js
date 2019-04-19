import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import countries from '../../../utils/countries'

class SelectCountry extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { country: '' }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    const country = e.target.value
    this.setState({ country })
  }

  render () {
    const countriesList = []
    for (let i = 0; i < countries.length; i++) {
      countriesList.push(<option value={countries[i].key} key={i}>{countries[i].country}</option>)
    }
    const { input, label, icon, meta } = this.props
    const { touched, error, warning } = meta
    const classes = touched && error ? 'select is-danger' : 'select'
    const iconClass = `fas fa-${icon}`

    return (
      <div className="field">
        <label className="label"> {label }</label>
        <div className="control has-icons-left">
          <div className={classes}>
            <select {...input} value={this.state.country} onChange={this.onChange}>
              { countriesList }
            </select>
          </div>
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

SelectCountry.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string
}

export default SelectCountry
