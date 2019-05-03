import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Section, Container } from 'react-bulma-components'

import { getUser, setError } from '../modules/auth'
import Routes from './routes'
import Header from './components/header'
import CubedFooter from './components/footer'
import { COMPANY, STORAGE_ID } from '../config'
import { pageview } from '../utils/ga'
import { isServer } from '../store'

class App extends PureComponent {
  componentWillMount () {
    if (!isServer) {
      const hours = 1
      const now = new Date().getTime()
      const setupTime = localStorage.getItem('setupTime')
      if (setupTime == null) {
        localStorage.setItem('setupTime', now)
      } else {
        const token = localStorage.getItem(`${STORAGE_ID}_token`)
        const expireIn = hours * 60 * 60 * 1000
        const diff = now - setupTime
        if (diff > expireIn && (typeof token === 'undefined' || (token && (token.expiry < now)))) {
          localStorage.clear()
          localStorage.setItem('setupTime', now)
        }
      }
    }
  }

  render () {
    const { isAuthenticated, location } = this.props
    pageview(location.pathname)

    return (
      <Fragment>
        <Header isAuthenticated={isAuthenticated} current={location.pathname} />
        <Section>
          <Container>
            <Routes />
          </Container>
        </Section>
        <CubedFooter company={COMPANY} {...this.props} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  setError: (state) => dispatch(setError(state))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
