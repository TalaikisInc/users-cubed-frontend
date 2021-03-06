import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { locales } from '../../../translations'
import { setLanguage, getLanguage } from '../../../modules/auth'

class SelectLanguage extends PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    e.preventDefault()
    const { locale, location } = this.props
    const newLocale = e.target.value
    if (locales.includes(newLocale) && locale !== newLocale) {
      this.props.setLanguage(newLocale)
      const splt = location.pathname.split('/')
      const len = splt[splt.length - 1].length === 2
      const english = newLocale === 'en'
      const pathname = english ? `${location.pathname}`.replace(`/${locale}`, '') : (len ? `${location.pathname}`.replace(locale, newLocale) : `${location.pathname}/${newLocale}`)
      this.props.history.push({ pathname })
    }
  }

  render () {
    const { locale } = this.props

    return (
      <div className="field">
        <div className="control">
          <div className="select">
            <select name='locale' value={locale} onBlur={this.onChange}>
              <option value=""></option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.auth.locale
})

const mapDispatchToProps = (dispatch) => ({
  setLanguage: (state) => dispatch(setLanguage(state)),
  getLanguage: () => dispatch(getLanguage())
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage)
