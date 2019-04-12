import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { setLocale } from '../../translations'

class SelectLanguage extends PureComponent {
  onChange (e) {
    e.preventDefault()
    setLocale(e.target.value)
    // redirect to locale site
    // app should detect the locale site
  }

  render () {
    return (
      <div className="field">
        <div className="control">
          <div className="select">
            <select name='locale' onChange={this.onChange}>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

SelectLanguage.propTypes = {
  setLocale: PropTypes.func.isRequired
}

export default SelectLanguage
