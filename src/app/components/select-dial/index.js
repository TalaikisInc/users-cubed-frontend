import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import dialCodes from '../../utils/dialCodes'

class SelectDial extends PureComponent {
  state = { dial: '' }

  render () {
    const onChange = (e) => {
      e.preventDefault()
      const dial = e.target.value
      this.setState({ dial })
    }
    const list = []

    for (let i=0; i<dialCodes.length;i++) {
      list.push(<option value={dialCodes[i].dial}>{dialCodes[i].dial}</option>)
    }
    const { input, label, icon, meta } = this.props
    const { touched, error, warning } = meta
    const classes = touched && error ? 'select is-danger' : 'select'
    const iconClass = `fas fa-${icon}`

    return (
        <div className="control has-icons-left">
          <div className={classes}>
            <select {...input} value={this.state.country} onChange={onChange}>
              { list }
            </select>
          </div>
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
