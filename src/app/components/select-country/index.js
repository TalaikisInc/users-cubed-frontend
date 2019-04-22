import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import countries from '../../../utils/countries'

class SelectCountry extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { country: '' }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    this.setState({ country: e.target.value })
  }

  render () {
    const countriesList = []
    for (let i = 0; i < countries.length; i++) {
      // eslint-disable-next-line
      countriesList.push(<option value={countries[i].key} key={i}>{countries[i].country}</option>)
    }
    const { input, label, icon, meta, currentUser } = this.props
    const { touched, error, warning } = meta
    const classes = touched && error ? 'select is-danger' : 'select'
    const iconClass = `fas fa-${icon}`
    const disabled = typeof currentUser.country === 'string' && currentUser.country.length > 0

    return (
      <div className="field">
        { /* eslint-disable-next-line */ }
        <label className="label" htmlFor="country"> {label }</label>
        <div className="control has-icons-left">
          <div className={classes}>
            { disabled ? <select id="country" name='country' value={currentUser.country} disabled>
              { countriesList }
            </select> : <select {...input} id="country" value={this.state.country} onBlur={this.onChange}>
              { countriesList }
            </select> }
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

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, null)(SelectCountry)
