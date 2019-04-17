import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Section, Container } from 'react-bulma-components'

import { getUser, setError } from '../modules/auth'
import { isServer } from '../store'
import Routes from './routes'
import Header from './components/header'
import CubedFooter from './components/footer'
import { COMPANY } from '../config'

class App extends PureComponent {
  componentWillMount () {
    if (!isServer) {
      this.props.getUser()
    }
  }

  render () {
    const { isAuthenticated, location } = this.props

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
