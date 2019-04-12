import React, { PureComponent } from 'react'

class SelectLanguage extends PureComponent {
  render () {
    const locale = this.props.match && this.props.match.params && this.props.match.params.locale ? this.props.match.params.locale : 'en'
    const onChange = (e) => {
      e.preventDefault()
      const locale = e.target.value
      //  @TODO check if already not locale
      this.props.history.push({ pathname: `${this.props.location.pathname}/${locale}` })
    }

    return (
      <div className="field">
        <div className="control">
          <div className="select">
            <select name='locale' value={locale} onChange={onChange}>
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
