import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Page from '../../components/page'
import { signinUser } from '../../../modules/auth'
import SigninForm from '../../components/signin-form'

class Signin extends PureComponent {
  state = {
    loading: false
  }

  submit = (values) => {
    console.log('values')
    console.log(values)
    this.props.signinUser('user@mydomain.com', 'password123')
  }

  render() {
    return (
      <Page title="Signin" description="We need to log in to stuff." path="/signin">
        <SigninForm handleSubmit={this.submit} loading={this.state.loading} />
      </Page>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ signinUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signin)
