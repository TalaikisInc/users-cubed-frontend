import React, { PureComponent } from 'react'

import countries from '../../utils/countries'

class SelectCountry extends PureComponent {
  state = { country: '' }

  render () {
    const onChange = (e) => {
      e.preventDefault()
      const country = e.target.value
      this.setState({ country })
    }

    return (
      <div className="field">
        <div className="control">
          <div className="select">
            <select name='locale' value={this.state.country} onChange={onChange}>
              { countries.map((el) => (<option value="en">{el}</option>))}
            </select>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectCountry
