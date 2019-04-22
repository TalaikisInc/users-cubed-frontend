import React, { PureComponent } from 'react'
import { Navbar } from 'react-bulma-components'
import { connect } from 'react-redux'

import logo from '../../assets/logo.svg'
import { setBurger } from '../../../modules/auth'

class Logo extends PureComponent {
  constructor (props) {
    super(props)
    this.toggleBurger = this.toggleBurger.bind(this)
  }

  toggleBurger () {
    this.props.burger ? this.props.setBurger(!this.props.burger) : this.props.setBurger(true)
  }

  render () {
    return (
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <img src={logo} alt="BlueBlood Ltd." width="112" height="28" />
        </Navbar.Item>
        <div role="button" className="navbar-burger burger" tabIndex={0} aria-label="menu" aria-expanded="false" onClick={this.toggleBurger} onKeyPress={this.toggleBurger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </Navbar.Brand>
    )
  }
}

const mapStateToProps = (state) => ({
  burger: state.auth.burger
})

const mapDispatchToProps = (dispatch) => ({
  setBurger: (state) => dispatch(setBurger(state))
})

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
