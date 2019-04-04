import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Page from '../../components/page'
import { loginUser } from '../../../modules/auth'

const Signin = props => (
  <Page id="signin" title="Signin" description="We need to log in to stuff." path="/signin">
    <button onClick={() => props.loginUser('user@mydomain.com', 'password123')}>
      Click the button...
    </button>
  </Page>
)

const mapDispatchToProps = (dispatch) => {
  bindActionCreators({ loginUser }, dispatch)
}

export default connect(null, mapDispatchToProps)(Signin)
