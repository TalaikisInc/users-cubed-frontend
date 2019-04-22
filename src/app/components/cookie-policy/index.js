import React, { PureComponent } from 'react'
import cookie from 'react-cookies'
import { Notification, Button } from 'react-bulma-components'
import { Link } from 'react-router-dom'

import { isServer } from '../../../store'
import { GA } from '../../../config'

class CookiePolicy extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      policy: false,
      keep: true
    }
    this._onButtonClick = this._onButtonClick.vind(this)
  }

  _onButtonClick () {
    this.setState({
      policy: true,
      keep: false
    })
    cookie.save('cookie-policy', this.state.policy, { path: '/' })
  }

  componentWillMount () {
    this.setState({
      policy: cookie.load('cookie-policy'),
      keep: true
    })
  }

  componentDidMount () {
    if (!isServer && !window.GA_INITIALIZED && this.state.policy) {
      // window.GA_INITIALIZED = true
      // ReactGA.initialize(GA)
    }
  }

  render () {
    if (!this.state.policy) {
      return (
        <Notification color="danger">
          We value your privacy. Click 'OK' if you accept our <strong><Link to='/privacy-policy'>privacy policy</Link></strong>.
          <Button remove onClick={this._onButtonClick} />
        </Notification>
      )
    } else {
      return null
    }
  }
}

export default CookiePolicy
