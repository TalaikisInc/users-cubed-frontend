import React, { PureComponent } from 'react'

import { locales } from '../../translations'

class SelectLanguage extends PureComponent {
  state = { locale: 'en' }

  render () {
    const onChange = (e) => {
      e.preventDefault()
      const locale = e.target.value
      if (locales.includes(locale) && this.state.locale !== locale) {
        const a = this.props.location.pathname.split('/')
        const len = a[a.length - 1].length === 2
        const english = locale === 'en'
        const pathname = english ? `${this.props.location.pathname}`.replace(`/${this.state.locale}`, '') : (len ? `${this.props.location.pathname}`.replace(this.state.locale, locale) : `${this.props.location.pathname}/${locale}`)
        this.setState({ locale })
        this.props.history.push({ pathname })
      }
    }

    return (
      <div className="field">
        <div className="control">
          <div className="select">
            <select name='locale' value={this.state.locale} onChange={onChange}>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectLanguage
