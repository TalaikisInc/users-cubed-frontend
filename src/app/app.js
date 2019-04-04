import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { establishCurrentUser } from '../modules/auth'
import { isServer } from '../store'
import Routes from './routes'
import Header from './components/header'
import Footer from './components/footer'
import { TITLE } from '../config'

class App extends Component {
  componentWillMount () {
    if (!isServer) {
      // this.props.establishCurrentUser()
    }
  }

  render () {
    return (
      <div>
        <Header isAuthenticated={this.props.isAuthenticated} current={this.props.location.pathname}/>
        <div className="pt-20 cell-4 offset-4">
          <div>
            <Routes />
          </div>
        </div>
        <Footer company={TITLE} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ establishCurrentUser }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
