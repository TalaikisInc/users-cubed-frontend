import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { Section, Container } from 'react-bulma-components'

import { getUser } from '../modules/auth'
import { isServer } from '../store'
import Routes from './routes'
import Header from './components/header'
import CubedFooter from './components/footer'
import { COMPANY } from '../config'

class App extends PureComponent {
  componentWillMount () {
    if (!isServer) {
      // this.props.getUser()
    }
  }

  render () {
    return (
      <Fragment>
        <Header isAuthenticated={this.props.isAuthenticated} current={this.props.location.pathname}/>
        <Section>
          <Container>
            <Routes />
          </Container>
        </Section>
        <CubedFooter company={COMPANY} />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ getUser }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
