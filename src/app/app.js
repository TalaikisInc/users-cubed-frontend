import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Section, Container } from 'react-bulma-components'

import { getUser, setError } from '../modules/auth'
import Routes from './routes'
import Header from './components/header'
import CubedFooter from './components/footer'
import { COMPANY } from '../config'
import { pageview } from '../utils/ga'

class App extends PureComponent {
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
  getUser: (state) => dispatch(getUser(state)),
  setError: (state) => dispatch(setError(state))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
